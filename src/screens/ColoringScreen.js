// GDD Adım 6 - Boyama Ekranı (Ana Oyun)
// Tasarım: boyamaekrani.png
// - Üst bar: geri (mor), hayvan adı badge (pembe), ses (altın)
// - İlerleme: "4/12 REGIONS DONE" (yeşil badge)
// - SVG tuval: boş çizgiler, tıklama ile renk dolumu, sparkle efekti
// - Renk paleti: 2 satır yuvarlak, seçili büyük + altın çerçeve, mix colors
// - Araç çubuğu: Pen(yeşil), Eraser(pembe), Bucket(mavi), Glow(altın), Undo(mor), Clear(gri)
import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { SIZES, SHADOWS } from '../theme/fonts';
import { GradientBackground, GlossyButton } from '../components/common';
import { useTranslation } from '../i18n/index';
import useAppStore from '../store/useAppStore';
import { CATEGORIES_V2 } from '../data/categoriesData';
import { useSound } from '../hooks/useSound';

const { width: SW, height: SH } = Dimensions.get('window');

// Boyama araçları (GDD Section 4.4)
const TOOLS = [
  { id: 'pen',    labelKey: 'pen',         variant: 'toolPen',    icon: '✏️' },
  { id: 'eraser', labelKey: 'eraser',      variant: 'toolEraser', icon: '🧼' },
  { id: 'bucket', labelKey: 'bucket_fill', variant: 'toolBucket', icon: '🪣' },
  { id: 'glow',   labelKey: 'glow',        variant: 'toolGlow',   icon: '✨' },
  { id: 'undo',   labelKey: 'undo',        variant: 'toolUndo',   icon: '↩️' },
  { id: 'clear',  labelKey: 'clear',       variant: 'toolClear',  icon: '🗑️' },
];

// Araç renk eşleştirmesi (GDD)
const TOOL_COLORS = {
  pen:    { gradient: ['#5BF09A', '#2ED573'], shadow: '#1AAD57' },
  eraser: { gradient: ['#FF8BB5', '#FF6B9D'], shadow: '#CC4A7A' },
  bucket: { gradient: ['#74C7F8', '#45AAF2'], shadow: '#2980B9' },
  glow:   { gradient: ['#FFD84D', '#FFC312'], shadow: '#B8950F' },
  undo:   { gradient: ['#C47DF5', '#A55EEA'], shadow: '#7D3CBF' },
  clear:  { gradient: ['#BDBDBD', '#9E9E9E'], shadow: '#616161' },
};

// Sparkle bileşeni (boyanan bölge üzerinde)
function SparkleEffect({ x, y, visible }) {
  const anim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, x, y]);

  if (!visible) return null;

  return (
    <Animated.Text
      style={{
        position: 'absolute',
        left: x - 12,
        top: y - 12,
        fontSize: 24,
        opacity: anim,
        transform: [{ scale: anim }],
        pointerEvents: 'none',
      }}
    >
      ✨
    </Animated.Text>
  );
}

// Renk paleti dairesi
function ColorDot({ color, selected, onPress }) {
  const size = selected ? SIZES.paletteCircleSelected : SIZES.paletteCircle;
  return (
    <TouchableOpacity onPress={() => onPress(color)} activeOpacity={0.8}>
      <View style={[
        styles.colorDot,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          borderWidth: selected ? 3 : 1.5,
          borderColor: selected ? COLORS.ctaAccent : 'rgba(255,255,255,0.6)',
        },
      ]} />
    </TouchableOpacity>
  );
}

// Araç butonu
function ToolButton({ tool, active, onPress, t }) {
  const tc = TOOL_COLORS[tool.id];
  return (
    <TouchableOpacity
      style={styles.toolBtnWrap}
      onPress={() => onPress(tool.id)}
      activeOpacity={0.85}
    >
      {/* Alt 3D kenar */}
      <View style={[styles.toolBtn3d, { backgroundColor: tc.shadow }]} />
      <LinearGradient
        colors={active ? tc.gradient : ['#E0E0E0', '#BDBDBD']}
        style={[styles.toolBtn, active && styles.toolBtnActive]}
      >
        <View style={styles.toolBtnHighlight} />
        <Text style={styles.toolIcon}>{tool.icon}</Text>
      </LinearGradient>
      <Text style={[styles.toolLabel, active && { color: COLORS.darkText }]}>
        {t(tool.labelKey)}
      </Text>
    </TouchableOpacity>
  );
}

export default function ColoringScreen({ navigation, route }) {
  const t = useTranslation();
  const insets = useSafeAreaInsets();
  const soundEnabled = useAppStore((s) => s.soundEnabled);
  const setSoundEnabled = useAppStore((s) => s.setSoundEnabled);
  const completeAnimal = useAppStore((s) => s.completeAnimal);
  const { playPop, playClick } = useSound(soundEnabled);

  // Route params
  const categoryId = route?.params?.categoryId || 'sea_world';
  const animalIndex = route?.params?.animalIndex || 0;

  // Kategori ve hayvan bul
  const category = CATEGORIES_V2.find((c) => c.id === categoryId) || CATEGORIES_V2[0];
  const animal = category.animals[animalIndex] || category.animals[0];

  // State
  const [regionColors, setRegionColors] = useState({});  // { regionId: color }
  const [selectedColor, setSelectedColor] = useState(COLORS.colorPalette[0]);
  const [activeTool, setActiveTool] = useState('bucket');
  const [history, setHistory] = useState([]);             // boyama geçmişi (undo için)
  const [sparkle, setSparkle] = useState(null);           // { x, y }
  const [glowMode, setGlowMode] = useState(false);
  const completedRef = useRef(false);

  const coloredCount = Object.keys(regionColors).length;
  const totalRegions = animal.regions.length;
  const progress = totalRegions > 0 ? coloredCount / totalRegions : 0;

  // Bölgeye dokunma
  const handleRegionPress = useCallback((regionId) => {
    if (activeTool === 'undo' || activeTool === 'clear') return;

    const newColor = activeTool === 'eraser'
      ? null
      : (activeTool === 'glow' ? selectedColor + 'CC' : selectedColor);

    // Yeni renk haritasını senkron hesapla (stale state sorununu önler)
    const updatedColors = { ...regionColors };
    if (newColor === null) {
      delete updatedColors[regionId];
    } else {
      updatedColors[regionId] = newColor;
    }

    setHistory((prev) => [...prev, { ...regionColors }]);
    setRegionColors(updatedColors);

    // Sparkle + ses efekti
    if (activeTool !== 'eraser') {
      const px = SW / 2;
      const py = SH * 0.35;
      setSparkle({ x: px, y: py, id: Date.now() });
      setTimeout(() => setSparkle(null), 600);
      playPop();
    }

    // Tamamlandı mı?
    const newCount = Object.keys(updatedColors).length;
    if (newCount === totalRegions) {
      setTimeout(() => handleComplete(updatedColors), 350);
    }
  }, [activeTool, selectedColor, regionColors, totalRegions, playPop]);

  // Araç basımı
  const handleToolPress = useCallback((toolId) => {
    playClick();
    if (toolId === 'undo') {
      if (history.length > 0) {
        setRegionColors(history[history.length - 1]);
        setHistory((prev) => prev.slice(0, -1));
      }
      return;
    }
    if (toolId === 'clear') {
      Alert.alert(
        t('clear'),
        t('clear') + '?',
        [
          { text: t('later'), style: 'cancel' },
          { text: t('clear'), onPress: () => { setRegionColors({}); setHistory([]); }, style: 'destructive' },
        ]
      );
      return;
    }
    if (toolId === 'glow') {
      setGlowMode((g) => !g);
    }
    setActiveTool(toolId);
  }, [history, t, playClick]);

  // Tamamlama (çift çağrıya karşı ref koruması)
  const handleComplete = useCallback((colors) => {
    if (completedRef.current) return;
    completedRef.current = true;
    const count = Object.keys(colors).length;
    const stars = count >= totalRegions ? 3 : count >= Math.ceil(totalRegions * 0.7) ? 2 : 1;
    completeAnimal(animal.id, stars, colors);
    navigation.navigate('Completion', {
      animalId: animal.id,
      categoryId,
      animalIndex,
      stars,
      regionColors: colors,
    });
  }, [totalRegions, animal, categoryId, animalIndex, completeAnimal]);

  const handleBack = () => navigation.goBack();

  // Renk paleti (2 satırda göster)
  const palette = COLORS.colorPalette;
  const halfLen = Math.ceil(palette.length / 2);
  const row1 = palette.slice(0, halfLen);
  const row2 = palette.slice(halfLen);

  return (
    <GradientBackground colors={COLORS.coloringBg}>
      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>

        {/* ÜST BAR */}
        <View style={styles.topBar}>
          {/* Geri butonu (mor) */}
          <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.85}>
            <View style={[styles.squareBtn3d, { backgroundColor: '#7D3CBF' }]} />
            <LinearGradient colors={['#C47DF5', '#A55EEA']} style={styles.squareBtn}>
              <View style={styles.squareBtnHighlight} />
              <Text style={styles.squareBtnIcon}>←</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Hayvan adı badge (pembe) */}
          <LinearGradient colors={['#FF8BB5', '#FF6B9D']} style={styles.titleBadge}>
            <Text style={styles.titleText}>
              {t(`animals.${animal.id}`)?.toUpperCase() || animal.id.toUpperCase()}
            </Text>
          </LinearGradient>

          {/* Ses butonu (altın) */}
          <TouchableOpacity
            style={styles.soundBtn}
            onPress={() => setSoundEnabled(!soundEnabled)}
            activeOpacity={0.85}
          >
            <View style={[styles.squareBtn3d, { backgroundColor: '#B8950F' }]} />
            <LinearGradient colors={['#FFD84D', '#FFC312']} style={styles.squareBtn}>
              <View style={styles.squareBtnHighlight} />
              <Text style={styles.squareBtnIcon}>{soundEnabled ? '🔊' : '🔇'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* İLERLEME BADGE */}
        <View style={styles.progressBadge}>
          <LinearGradient colors={['#5BF09A', '#2ED573']} style={styles.progressBadgeInner}>
            <Text style={styles.progressText}>
              {t('regions_done', { x: coloredCount, y: totalRegions })}
            </Text>
            <View style={styles.progressBarSmall}>
              <View style={[styles.progressBarFill, { width: `${Math.round(progress * 100)}%` }]} />
            </View>
          </LinearGradient>
        </View>

        {/* SVG TUVAL */}
        <View style={styles.canvasWrap}>
          <Svg
            viewBox="0 0 300 300"
            style={styles.svg}
          >
            {animal.regions.map((region) => {
              const fillColor = regionColors[region.id];
              const isGlowing = glowMode && fillColor;
              return (
                <Path
                  key={region.id}
                  d={region.path}
                  fill={fillColor || '#FAFAFA'}
                  stroke="#2D3436"
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  opacity={isGlowing ? 0.85 : 1}
                  onPress={() => handleRegionPress(region.id)}
                />
              );
            })}
          </Svg>

          {/* Sparkle efekti */}
          {sparkle && (
            <SparkleEffect x={sparkle.x} y={sparkle.y} visible={true} key={sparkle.id} />
          )}
        </View>

        {/* RENK PALETİ */}
        <View style={styles.paletteSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.paletteRow}
          >
            {row1.map((color) => (
              <ColorDot
                key={color}
                color={color}
                selected={selectedColor === color}
                onPress={setSelectedColor}
              />
            ))}
          </ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.paletteRow}
          >
            {row2.map((color) => (
              <ColorDot
                key={color}
                color={color}
                selected={selectedColor === color}
                onPress={setSelectedColor}
              />
            ))}
          </ScrollView>
        </View>

        {/* ARAÇ ÇUBUĞU */}
        <View style={styles.toolBar}>
          {TOOLS.map((tool) => (
            <ToolButton
              key={tool.id}
              tool={tool}
              active={activeTool === tool.id || (tool.id === 'glow' && glowMode)}
              onPress={handleToolPress}
              t={t}
            />
          ))}
        </View>

        {/* Tamamla butonu (tüm bölgeler boyandığında göster) */}
        {coloredCount > 0 && coloredCount === totalRegions && (
          <View style={styles.completeWrap}>
            <GlossyButton
              label={t('next')}
              onPress={() => handleComplete(regionColors)}
              variant="success"
              size="medium"
              width={200}
            />
          </View>
        )}
      </View>
    </GradientBackground>
  );
}

const TOOL_BTN_SIZE = 52;
const CANVAS_SIZE = Math.min(SW - 32, SH * 0.38);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },

  // Üst bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backBtn: {
    position: 'relative',
    width: SIZES.toolBtnSize,
    height: SIZES.toolBtnSize,
  },
  soundBtn: {
    position: 'relative',
    width: SIZES.toolBtnSize,
    height: SIZES.toolBtnSize,
  },
  squareBtn: {
    width: SIZES.toolBtnSize,
    height: SIZES.toolBtnSize,
    borderRadius: SIZES.radiusMd,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...SHADOWS.glossy,
  },
  squareBtn3d: {
    position: 'absolute',
    bottom: -4,
    left: 0,
    right: 0,
    height: SIZES.toolBtnSize,
    borderRadius: SIZES.radiusMd,
  },
  squareBtnHighlight: {
    position: 'absolute',
    top: 0,
    left: 4,
    right: 4,
    height: '40%',
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderRadius: SIZES.radiusMd,
  },
  squareBtnIcon: {
    fontSize: 22,
    color: '#FFF',
  },
  titleBadge: {
    flex: 1,
    marginHorizontal: 8,
    height: 40,
    borderRadius: SIZES.radiusFull,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'Fredoka_700Bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },

  // İlerleme badge
  progressBadge: {
    alignSelf: 'center',
    marginBottom: 8,
    borderRadius: SIZES.radiusFull,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  progressBadgeInner: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
    alignItems: 'center',
    gap: 4,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  progressBarSmall: {
    width: 160,
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },

  // SVG Tuval
  canvasWrap: {
    alignSelf: 'center',
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: SIZES.radiusXl,
    overflow: 'hidden',
    ...SHADOWS.lg,
    marginBottom: 8,
  },
  svg: {
    width: '100%',
    height: '100%',
  },

  // Renk paleti
  paletteSection: {
    marginBottom: 6,
    gap: 4,
  },
  paletteRow: {
    paddingHorizontal: 4,
    gap: 6,
    alignItems: 'center',
  },
  colorDot: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  // Araç çubuğu
  toolBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  toolBtnWrap: {
    alignItems: 'center',
    gap: 2,
  },
  toolBtn: {
    width: TOOL_BTN_SIZE,
    height: TOOL_BTN_SIZE,
    borderRadius: SIZES.radiusMd,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...SHADOWS.glossy,
  },
  toolBtnActive: {
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  toolBtn3d: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    height: TOOL_BTN_SIZE,
    borderRadius: SIZES.radiusMd,
    top: 4,
    zIndex: -1,
  },
  toolBtnHighlight: {
    position: 'absolute',
    top: 0,
    left: 4,
    right: 4,
    height: '40%',
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderRadius: SIZES.radiusMd,
  },
  toolIcon: {
    fontSize: 20,
  },
  toolLabel: {
    fontSize: 9,
    fontFamily: 'Nunito_600SemiBold',
    color: COLORS.lightText,
    textAlign: 'center',
  },

  // Tamamla butonu
  completeWrap: {
    alignItems: 'center',
    marginTop: 4,
  },
});
