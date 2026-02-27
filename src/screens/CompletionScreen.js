// GDD Adım 7 - Kutlama / Tamamlama Ekranı
// Tasarım: kutlama.png
// - Arka plan: pastel gradyan + konfeti + parıltılar
// - Üst: gökkuşağı banner "Great Job!" + sağ üst ayıcık maskot
// - Ortada: tamamlanan boyamanın renkli hali (altın çerçeveli kart)
// - Kart üstünde: 3 yıldız (kazanılan altın, diğerleri gri)
// - "Rewards" bölümü: kazanılan renk paletleri (renkli daireler)
// - "Collection progress" ilerleme çubuğu
// - Next (yeşil), Replay (mavi), Home (bej) butonları
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { SIZES, SHADOWS } from '../theme/fonts';
import {
  GradientBackground,
  GlossyButton,
  StarRating,
  ProgressBar,
  ConfettiAnimation,
} from '../components/common';
import { useTranslation } from '../i18n/index';
import useAppStore from '../store/useAppStore';
import { CATEGORIES_V2 } from '../data/categoriesData';
import { useSound } from '../hooks/useSound';

const { width: SW } = Dimensions.get('window');

// Ödül renk grupları (3 adet, tamamlama ödülü olarak gösterilir)
const REWARD_GROUPS = [
  ['#FF4757', '#FF9F43', '#FFC312'],
  ['#2ED573', '#45AAF2', '#A55EEA'],
  ['#FF6B9D', '#1DD1A1', '#FDCB6E'],
  ['#5352ED', '#FF6348', '#7BED9F'],
];

// Mini SVG önizleme (boyanan hayvan)
function AnimalPreview({ animal, regionColors }) {
  if (!animal) return null;
  return (
    <View style={styles.previewSvgWrap}>
      <Svg viewBox="0 0 300 300" style={{ width: '100%', height: '100%' }}>
        {animal.regions.map((region) => (
          <Path
            key={region.id}
            d={region.path}
            fill={regionColors?.[region.id] || region.defaultColor}
            stroke="#2D3436"
            strokeWidth={2.5}
            strokeLinejoin="round"
          />
        ))}
      </Svg>
    </View>
  );
}

// "Great Job!" banner
function GreatJobBanner({ text }) {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(-0.05)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 5,
        bounciness: 18,
        delay: 200,
      }),
      Animated.sequence([
        Animated.delay(200),
        Animated.timing(rotateAnim, { toValue: 0.03, duration: 200, useNativeDriver: true }),
        Animated.timing(rotateAnim, { toValue: -0.02, duration: 160, useNativeDriver: true }),
        Animated.timing(rotateAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [-0.1, 0.1],
    outputRange: ['-6deg', '6deg'],
  });

  return (
    <Animated.View style={[styles.bannerWrap, { transform: [{ scale: scaleAnim }, { rotate }] }]}>
      <LinearGradient
        colors={['#FFD84D', '#FF9F43', '#FF6B9D', '#A55EEA', '#45AAF2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.banner}
      >
        <View style={styles.bannerHighlight} />
        <Text style={styles.bannerText}>{text}</Text>
      </LinearGradient>
    </Animated.View>
  );
}

// Ödül paleti bileşeni
function RewardPalette({ colors, delay = 0 }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 12,
      bounciness: 14,
      delay,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.rewardPalette, { transform: [{ scale: scaleAnim }] }]}>
      {colors.map((c, i) => (
        <View key={i} style={[styles.rewardDot, { backgroundColor: c }]} />
      ))}
    </Animated.View>
  );
}

// Ayıcık maskot
function BearMascot() {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, { toValue: -8, duration: 600, useNativeDriver: true }),
        Animated.timing(bounceAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.Text style={[styles.mascot, { transform: [{ translateY: bounceAnim }] }]}>
      🐻
    </Animated.Text>
  );
}

export default function CompletionScreen({ navigation, route }) {
  const t = useTranslation();
  const insets = useSafeAreaInsets();

  const { animalId, categoryId, animalIndex = 0, stars = 3, regionColors = {} } = route?.params || {};

  // Hayvan ve kategori bul
  const category = CATEGORIES_V2.find((c) => c.id === categoryId) || CATEGORIES_V2[0];
  const animal = category.animals.find((a) => a.id === animalId) || category.animals[animalIndex];

  // Koleksiyon ilerlemesi
  const completedAnimals = useAppStore((s) => s.completedAnimals);
  const soundEnabled = useAppStore((s) => s.soundEnabled);
  const { playComplete } = useSound(soundEnabled);

  useEffect(() => {
    playComplete();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const completedInCat = category.animals.filter((a) => completedAnimals[a.id]).length;
  const catProgress = category.animals.length > 0 ? completedInCat / category.animals.length : 0;

  // Ödüller (yıldız sayısına göre)
  const rewardCount = Math.max(1, stars);
  const rewards = REWARD_GROUPS.slice(0, rewardCount);

  // Sonraki hayvan var mı?
  const nextIndex = animalIndex + 1;
  const hasNext = nextIndex < category.animals.length;

  const handleNext = () => {
    if (hasNext) {
      navigation.replace('Coloring', { categoryId, animalIndex: nextIndex });
    } else {
      navigation.navigate('Categories');
    }
  };

  const handleReplay = () => {
    navigation.replace('Coloring', { categoryId, animalIndex });
  };

  const handleHome = () => navigation.navigate('Categories');

  return (
    <GradientBackground colors={COLORS.mainBg}>
      <ConfettiAnimation active={true} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Ayıcık maskot (sağ üst) */}
        <BearMascot />

        {/* "Great Job!" banner */}
        <GreatJobBanner text={t('great_job')} />

        {/* Yıldızlar (kartın üstünde) */}
        <View style={styles.starsAboveCard}>
          <StarRating stars={stars} maxStars={3} size={42} animate={true} />
        </View>

        {/* Ana kart */}
        <View style={styles.mainCard}>
          {/* Altın çerçeveli hayvan önizleme */}
          <LinearGradient
            colors={['#FFD700', '#FFA500', '#FFD700']}
            style={styles.goldFrame}
          >
            <View style={styles.previewBg}>
              <AnimalPreview animal={animal} regionColors={regionColors} />
            </View>
          </LinearGradient>

          {/* Yıldız satırı (kart içinde) */}
          <View style={styles.starsInCard}>
            <StarRating stars={stars} maxStars={3} size={28} />
          </View>

          {/* Rewards bölümü */}
          <Text style={styles.rewardsLabel}>{t('rewards')}</Text>
          <View style={styles.rewardsRow}>
            {rewards.map((group, i) => (
              <RewardPalette key={i} colors={group} delay={i * 150} />
            ))}
          </View>

          {/* Collection progress */}
          <Text style={styles.collectionLabel}>{t('collection_progress')}</Text>
          <ProgressBar
            progress={catProgress}
            height={10}
            colors={category.gradientColors}
            style={{ marginBottom: 4 }}
          />
        </View>

        {/* Butonlar */}
        <View style={styles.buttonsWrap}>
          <GlossyButton
            label={t('next')}
            onPress={handleNext}
            variant="success"
            size="large"
            width={SW * 0.72}
          />
          <GlossyButton
            label={t('replay')}
            onPress={handleReplay}
            variant="secondary"
            size="medium"
            width={SW * 0.60}
          />
          <TouchableOpacity onPress={handleHome} style={styles.homeBtn} activeOpacity={0.8}>
            <Text style={styles.homeBtnText}>{t('home')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const CARD_WIDTH = SW * 0.85;

const styles = StyleSheet.create({
  scroll: {
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 14,
  },

  // Ayıcık maskot
  mascot: {
    position: 'absolute',
    right: 4,
    top: 0,
    fontSize: 52,
    zIndex: 10,
  },

  // Banner
  bannerWrap: {
    marginTop: 8,
    alignSelf: 'center',
    zIndex: 5,
  },
  banner: {
    paddingHorizontal: 40,
    paddingVertical: 13,
    borderRadius: SIZES.radiusFull,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.lg,
    minWidth: 220,
  },
  bannerHighlight: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: '42%',
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderTopLeftRadius: SIZES.radiusFull,
    borderTopRightRadius: SIZES.radiusFull,
  },
  bannerText: {
    fontSize: 28,
    fontFamily: 'Fredoka_700Bold',
    color: '#FFFFFF',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.18)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  // Yıldızlar (kartın üstünde)
  starsAboveCard: {
    alignSelf: 'center',
    marginBottom: -18,
    zIndex: 10,
  },

  // Ana kart
  mainCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF8EE',
    borderRadius: 28,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 16,
    alignItems: 'center',
    ...SHADOWS.lg,
    borderWidth: 2,
    borderColor: 'rgba(255,200,100,0.35)',
  },

  // Altın çerçeve
  goldFrame: {
    width: CARD_WIDTH * 0.70,
    height: CARD_WIDTH * 0.70,
    borderRadius: 20,
    padding: 4,
    marginBottom: 10,
    ...SHADOWS.md,
  },
  previewBg: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    overflow: 'hidden',
  },
  previewSvgWrap: {
    flex: 1,
  },

  // Yıldızlar kart içinde
  starsInCard: {
    marginBottom: 14,
  },

  // Rewards
  rewardsLabel: {
    fontSize: 15,
    fontFamily: 'Fredoka_600SemiBold',
    color: COLORS.darkText,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  rewardsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
    alignSelf: 'flex-start',
  },
  rewardPalette: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: 40,
    padding: 7,
    gap: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.9)',
    ...SHADOWS.sm,
  },
  rewardDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
  },

  // Collection progress
  collectionLabel: {
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    color: COLORS.lightText,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },

  // Butonlar
  buttonsWrap: {
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },

  // Home butonu
  homeBtn: {
    paddingHorizontal: 32,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: SIZES.radiusFull,
    borderWidth: 1.5,
    borderColor: 'rgba(200,180,150,0.5)',
    ...SHADOWS.sm,
  },
  homeBtnText: {
    fontSize: SIZES.fontMd,
    fontFamily: 'Nunito_600SemiBold',
    color: COLORS.darkText,
  },
});
