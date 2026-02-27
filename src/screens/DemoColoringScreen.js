import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Svg, { Path, Text as SvgText, G } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundGradient from '../components/BackgroundGradient';
import ColorPalette from '../components/ColorPalette';
import { useTranslation } from '../i18n/index';
import { COLORS } from '../theme/colors';
import { SIZES, SHADOWS } from '../theme/fonts';

// Simple block letters for name display
const LETTER_REGIONS = [
  { id: 1, color: '#FFFFFF', label: 'harf 1' },
  { id: 2, color: '#FFFFFF', label: 'harf 2' },
  { id: 3, color: '#FFFFFF', label: 'harf 3' },
];

// Emoji → simple colored SVG circle representation for demo
function EmojiSvg({ emoji }) {
  return (
    <Svg width={120} height={120} viewBox="0 0 100 100">
      <Path d="M10,50 Q10,10 50,10 Q90,10 90,50 Q90,90 50,90 Q10,90 10,50 Z" fill="#FFFDE7" stroke="#FDD835" strokeWidth="2" />
      <SvgText x="50" y="62" textAnchor="middle" fontSize="42">{emoji}</SvgText>
    </Svg>
  );
}

function NameLetters({ name, filledColors, onLetterPress }) {
  const letters = name.slice(0, 6).split('');
  const letterW = 26;
  const totalW = letters.length * (letterW + 4);

  return (
    <Svg width={totalW} height={60} viewBox={`0 0 ${totalW} 60`}>
      {letters.map((char, i) => {
        const x = i * (letterW + 4);
        const color = filledColors[i] || '#FFFFFF';
        return (
          <G key={i} onPress={() => onLetterPress(i)}>
            <Path
              d={`M${x + 2},2 L${x + letterW - 2},2 L${x + letterW - 2},58 L${x + 2},58 Z`}
              fill={color}
              stroke="#888"
              strokeWidth="1.5"
            />
            <SvgText
              x={x + letterW / 2}
              y={38}
              textAnchor="middle"
              fontSize="22"
              fontWeight="bold"
              fill="#444"
            >
              {char.toUpperCase()}
            </SvgText>
          </G>
        );
      })}
    </Svg>
  );
}

export default function DemoColoringScreen({ navigation, route }) {
  const t = useTranslation();
  const { name, emoji } = route.params;
  const [selectedColor, setSelectedColor] = useState(COLORS.palette[0]);
  const [letterColors, setLetterColors] = useState({});

  const handleLetterPress = (index) => {
    setLetterColors((prev) => ({ ...prev, [index]: selectedColor }));
  };

  const handleContinue = () => {
    navigation.navigate('Categories', { name });
  };

  return (
    <BackgroundGradient colors={COLORS.welcomeBg}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Header */}
          <Text style={styles.hello}>
            {t('demo.title')} {name}! {emoji}
          </Text>
          <Text style={styles.tapHint}>{t('demo.tapToColor')}</Text>

          {/* Name letters to color */}
          <View style={styles.card}>
            <NameLetters
              name={name}
              filledColors={letterColors}
              onLetterPress={handleLetterPress}
            />
          </View>

          {/* Selected emoji */}
          <View style={styles.emojiCard}>
            <EmojiSvg emoji={emoji} />
          </View>

          <Text style={styles.subtitle}>{t('demo.subtitle')}</Text>

          {/* Continue button */}
          <TouchableOpacity onPress={handleContinue} activeOpacity={0.85} style={styles.btnWrapper}>
            <LinearGradient colors={COLORS.nextButton} style={styles.btn}>
              <Text style={styles.btnText}>{t('demo.continueButton')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>

        <ColorPalette selectedColor={selectedColor} onColorSelect={setSelectedColor} />
      </SafeAreaView>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: {
    alignItems: 'center',
    paddingTop: SIZES.xl,
    paddingHorizontal: SIZES.lg,
  },
  hello: {
    fontSize: SIZES.fontXl,
    fontWeight: '900',
    color: COLORS.darkText,
    textAlign: 'center',
    marginBottom: SIZES.sm,
  },
  tapHint: {
    fontSize: SIZES.fontMd,
    color: COLORS.darkText,
    opacity: 0.7,
    marginBottom: SIZES.lg,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    marginBottom: SIZES.lg,
    ...SHADOWS.md,
  },
  emojiCard: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: SIZES.radiusXl,
    padding: SIZES.lg,
    marginBottom: SIZES.lg,
    ...SHADOWS.md,
  },
  subtitle: {
    fontSize: SIZES.fontMd,
    color: COLORS.darkText,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: SIZES.xl,
  },
  btnWrapper: {
    width: '80%',
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.lg,
    marginBottom: SIZES.xl,
  },
  btn: {
    height: SIZES.btnHeight,
    borderRadius: SIZES.radiusLg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: SIZES.fontLg,
    fontWeight: '900',
    color: COLORS.white,
  },
});
