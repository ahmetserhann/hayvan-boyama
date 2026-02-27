import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundGradient from '../components/BackgroundGradient';
import ColorPalette from '../components/ColorPalette';
import GlowToggle from '../components/GlowToggle';
import DifficultyBar from '../components/DifficultyBar';
import { useTranslation } from '../i18n/index';
import { useSound } from '../hooks/useSound';
import { COLORS } from '../theme/colors';
import { SIZES, SHADOWS } from '../theme/fonts';

const { width } = Dimensions.get('window');
const SVG_SIZE = width - SIZES.xl * 2;

function AnimalSvg({ animal, filledColors, difficulty, glowEnabled, onRegionPress }) {
  const activeIds = animal.difficulty?.[difficulty] || animal.regions.map((r) => r.id);

  return (
    <Svg width={SVG_SIZE} height={SVG_SIZE} viewBox="0 0 200 200">
      {animal.regions.map((region) => {
        const isActive = activeIds.includes(region.id);
        const fillColor = filledColors[region.id] || region.defaultColor;
        const glowProps = glowEnabled && filledColors[region.id]
          ? { filter: 'url(#glow)' }
          : {};

        if (!isActive) return null;

        return (
          <Path
            key={region.id}
            d={region.path}
            fill={fillColor}
            stroke="#888"
            strokeWidth="1.5"
            strokeLinejoin="round"
            onPress={() => onRegionPress(region.id)}
            {...glowProps}
          />
        );
      })}
      {/* Outline on top */}
      {animal.outline && (
        <Path
          d={animal.outline}
          fill="none"
          stroke={COLORS.darkText}
          strokeWidth="2.5"
          strokeLinejoin="round"
          pointerEvents="none"
        />
      )}
    </Svg>
  );
}

function calculateStars(animal, filledColors, difficulty) {
  const activeIds = animal.difficulty?.[difficulty] || animal.regions.map((r) => r.id);
  const filled = activeIds.filter((id) => filledColors[id]).length;
  const ratio = filled / activeIds.length;
  if (ratio >= 1) return 3;
  if (ratio >= 0.7) return 2;
  return 1;
}

export default function ColoringScreen({ navigation, route, soundEnabled }) {
  const t = useTranslation();
  const { playPop, playComplete } = useSound(soundEnabled);
  const { category, itemIndex = 0, name } = route.params;
  const animal = category.items[itemIndex];

  const [selectedColor, setSelectedColor] = useState(COLORS.palette[0]);
  const [filledColors, setFilledColors] = useState({});
  const [history, setHistory] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [glowEnabled, setGlowEnabled] = useState(false);

  const handleRegionPress = useCallback(
    (regionId) => {
      setHistory((h) => [...h, { regionId, prevColor: filledColors[regionId] }]);
      setFilledColors((prev) => ({ ...prev, [regionId]: selectedColor }));
      playPop();
    },
    [filledColors, selectedColor, playPop]
  );

  const handleUndo = () => {
    if (!history.length) return;
    const last = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setFilledColors((prev) => {
      const next = { ...prev };
      if (last.prevColor) {
        next[last.regionId] = last.prevColor;
      } else {
        delete next[last.regionId];
      }
      return next;
    });
  };

  const handleComplete = async () => {
    await playComplete();
    const stars = calculateStars(animal, filledColors, difficulty);
    navigation.navigate('Completion', {
      category,
      itemIndex,
      name,
      stars,
      filledColors,
    });
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    setFilledColors({});
    setHistory([]);
  };

  return (
    <BackgroundGradient colors={COLORS.coloringBg}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Text style={styles.iconBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.animalName}>{t(animal.nameKey)}</Text>
          <GlowToggle enabled={glowEnabled} onToggle={() => setGlowEnabled((v) => !v)} />
          <View style={{ width: SIZES.xs }} />
          <TouchableOpacity onPress={handleUndo} style={styles.iconBtn}>
            <Text style={styles.iconBtnText}>↩</Text>
          </TouchableOpacity>
        </View>

        {/* Difficulty */}
        <DifficultyBar selected={difficulty} onSelect={handleDifficultyChange} />

        {/* SVG Canvas */}
        <View style={styles.canvasContainer}>
          <View style={styles.canvas}>
            <AnimalSvg
              animal={animal}
              filledColors={filledColors}
              difficulty={difficulty}
              glowEnabled={glowEnabled}
              onRegionPress={handleRegionPress}
            />
          </View>
          {/* Cursor indicator */}
          <View style={[styles.cursorDot, { backgroundColor: selectedColor, borderColor: selectedColor === '#FFFFFF' ? '#CCC' : selectedColor }]} />
        </View>

        {/* Complete button */}
        <TouchableOpacity onPress={handleComplete} style={styles.completeBtnWrapper} activeOpacity={0.85}>
          <LinearGradient colors={COLORS.nextButton} style={styles.completeBtn}>
            <Text style={styles.completeBtnText}>{t('coloring.complete')}</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Color palette */}
        <ColorPalette selectedColor={selectedColor} onColorSelect={setSelectedColor} />
      </SafeAreaView>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingTop: SIZES.sm,
    paddingBottom: SIZES.sm,
    gap: SIZES.xs,
  },
  iconBtn: {
    width: SIZES.btnHeightSm,
    height: SIZES.btnHeightSm,
    borderRadius: SIZES.radiusFull,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.sm,
  },
  iconBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.darkText,
  },
  animalName: {
    flex: 1,
    textAlign: 'center',
    fontSize: SIZES.fontLg,
    fontWeight: '900',
    color: COLORS.darkText,
  },
  canvasContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  canvas: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: SIZES.radiusXl,
    padding: SIZES.md,
    ...SHADOWS.md,
  },
  cursorDot: {
    position: 'absolute',
    bottom: SIZES.sm,
    right: SIZES.lg,
    width: 28,
    height: 28,
    borderRadius: SIZES.radiusFull,
    borderWidth: 2,
    ...SHADOWS.sm,
  },
  completeBtnWrapper: {
    marginHorizontal: SIZES.xl,
    marginVertical: SIZES.sm,
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.md,
  },
  completeBtn: {
    height: SIZES.btnHeight,
    borderRadius: SIZES.radiusLg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeBtnText: {
    fontSize: SIZES.fontMd,
    fontWeight: '900',
    color: COLORS.white,
  },
});
