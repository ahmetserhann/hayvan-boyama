// GDD Adım 3 - Splash / Yükleme Ekranı
// Tasarım: yukleme.png
// - Gökkuşağı pastel gradyan arka plan + bulutlar + yıldızlar
// - Ortada pati izi logosu (gökkuşağı renkli, glossy efekt) + kalem ikonu
// - Alt: "LOADING..." (her harf farklı renk) + yuvarlak köşeli yükleme çubuğu
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import { SIZES } from '../theme/fonts';
import { useTranslation } from '../i18n/index';

const { width: SW, height: SH } = Dimensions.get('window');
const BAR_W = Math.min(SW * 0.68, 320);   // progress bar genişliği
const BADGE_W = 50;                         // yüzde balonu genişliği

// "LOADING..." harflerinin renkleri
const LETTER_COLORS = ['#FF6B9D', '#FF9F43', '#FFC312', '#2ED573', '#45AAF2', '#A55EEA', '#FF6B9D', '#FF9F43', '#FF4757', '#FFC312'];

// Bulut konfigürasyonları
const CLOUDS = [
  { id: 1, w: 110, h: 50, top: '8%',  left: '5%',  opacity: 0.85 },
  { id: 2, w: 85,  h: 40, top: '6%',  right: '3%', opacity: 0.70 },
  { id: 3, w: 130, h: 55, top: '18%', left: '20%', opacity: 0.60 },
  { id: 4, w: 75,  h: 35, top: '55%', left: '2%',  opacity: 0.50 },
  { id: 5, w: 95,  h: 45, top: '60%', right: '5%', opacity: 0.55 },
  { id: 6, w: 60,  h: 28, top: '72%', left: '40%', opacity: 0.45 },
];

// Parıltı noktaları
const STARS = [
  { id: 1, top: '14%', left: '8%' },
  { id: 2, top: '22%', left: '85%' },
  { id: 3, top: '35%', left: '5%' },
  { id: 4, top: '42%', left: '92%' },
  { id: 5, top: '65%', left: '15%' },
  { id: 6, top: '78%', left: '80%' },
];

function Cloud({ cloud }) {
  return (
    <View style={[styles.cloudWrap, { top: cloud.top, left: cloud.left, right: cloud.right, opacity: cloud.opacity }]}>
      <View style={[styles.cloudBody, { width: cloud.w, height: cloud.h * 0.55 }]} />
      <View style={[styles.cloudPuff, { width: cloud.w * 0.44, height: cloud.w * 0.44, bottom: cloud.h * 0.32, left: cloud.w * 0.08 }]} />
      <View style={[styles.cloudPuff, { width: cloud.w * 0.54, height: cloud.w * 0.54, bottom: cloud.h * 0.38, left: cloud.w * 0.26 }]} />
      <View style={[styles.cloudPuff, { width: cloud.w * 0.36, height: cloud.w * 0.36, bottom: cloud.h * 0.28, right: cloud.w * 0.07 }]} />
    </View>
  );
}

function SparklesStar({ star }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = () => {
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 700, useNativeDriver: true }),
        Animated.delay(1000 + Math.random() * 1000),
      ]).start(loop);
    };
    const t = setTimeout(loop, Math.random() * 1500);
    return () => clearTimeout(t);
  }, []);
  const op = anim.interpolate({ inputRange: [0, 1], outputRange: [0.15, 1] });
  const sc = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.5, 1.3, 0.5] });
  return (
    <Animated.Text style={[styles.sparkle, { top: star.top, left: star.left, opacity: op, transform: [{ scale: sc }] }]}>
      ✦
    </Animated.Text>
  );
}

// Pati izi logosu - SVG benzeri View kompozisyonu
function PawLogo() {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Bounce
    Animated.loop(
      Animated.sequence([
        Animated.spring(bounceAnim, { toValue: -12, useNativeDriver: true, speed: 3, bounciness: 10 }),
        Animated.spring(bounceAnim, { toValue: 0, useNativeDriver: true, speed: 3, bounciness: 10 }),
        Animated.delay(1200),
      ])
    ).start();

    // Glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.8] });

  return (
    <Animated.View style={[styles.pawContainer, { transform: [{ translateY: bounceAnim }] }]}>
      {/* Dış parıltı halkası */}
      <Animated.View style={[styles.glowRing, { opacity: glowOpacity }]} />

      {/* Pati ana gövdesi */}
      <LinearGradient
        colors={['#FF6B9D', '#FF9F43', '#FFC312', '#2ED573', '#45AAF2', '#A55EEA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.pawBody}
      >
        {/* Glossy highlight */}
        <View style={styles.pawHighlight} />

        {/* Pençe parmakları */}
        <View style={styles.pawToes}>
          <LinearGradient colors={['#FF9F43', '#FFC312']} style={[styles.toe, styles.toeLeft]} />
          <LinearGradient colors={['#A55EEA', '#FF6B9D']} style={[styles.toe, styles.toeCenter]} />
          <LinearGradient colors={['#45AAF2', '#2ED573']} style={[styles.toe, styles.toeRight]} />
        </View>

        {/* Küçük yan parmaklar */}
        <View style={styles.pawSideToes}>
          <LinearGradient colors={['#FF6B9D', '#FF9F43']} style={[styles.toe, styles.toeSideLeft]} />
          <LinearGradient colors={['#2ED573', '#45AAF2']} style={[styles.toe, styles.toeSideRight]} />
        </View>

        {/* Kalem ikonu (ortada) */}
        <View style={styles.pencilWrap}>
          <Text style={styles.pencilEmoji}>✏️</Text>
        </View>

        {/* Parıltı noktaları üstünde */}
        <View style={[styles.sparkDot, { top: '15%', left: '20%', backgroundColor: '#FFFFFF' }]} />
        <View style={[styles.sparkDot, { top: '20%', right: '18%', backgroundColor: '#FFF176' }]} />
        <View style={[styles.sparkDot, { bottom: '25%', left: '15%', backgroundColor: '#FFFFFF' }]} />
      </LinearGradient>
    </Animated.View>
  );
}

// Yükleme çubuğu — gökkuşağı gradyan + uçta yüzde balonu
function LoadingBar() {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    const listenerId = progressAnim.addListener(({ value }) => {
      setDisplayPercent(Math.round(value * 100));
    });

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2200,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start();

    return () => progressAnim.removeListener(listenerId);
  }, []);

  // Dolum genişliği (piksel)
  const fillWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, BAR_W],
  });

  // Balonun soldan konumu: dolum ucunda ortada durur, başta 0'dan küçük olmasın
  const badgeLeft = progressAnim.interpolate({
    inputRange: [0, BADGE_W / BAR_W, 1],
    outputRange: [0, 0, BAR_W - BADGE_W],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.barWrapper}>
      {/* Yüzde balonu — dolum ucunda kayar */}
      <Animated.View style={[styles.percentBadge, { left: badgeLeft }]}>
        <Text style={styles.percentBadgeText}>{displayPercent}%</Text>
        {/* Aşağıya bakan ok */}
        <View style={styles.percentBadgeArrow} />
      </Animated.View>

      {/* Balon için boşluk */}
      <View style={{ height: 26 }} />

      {/* Bar dış kabı */}
      <View style={styles.loadingBarOuter}>
        {/* Gökkuşağı dolum — Animated.View width'i artıkça daha fazla gradyan açığa çıkar */}
        <Animated.View style={{ width: fillWidth, height: '100%', overflow: 'hidden', borderRadius: 20 }}>
          <LinearGradient
            colors={['#FF6B9D', '#FF9F43', '#FFC312', '#2ED573', '#45AAF2', '#A55EEA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: BAR_W, height: '100%' }}
          />
          {/* Üst glossy parlaklık şeridi */}
          <View style={styles.barFillHighlight} />
        </Animated.View>
      </View>
    </View>
  );
}

export default function SplashScreen({ navigation }) {
  const t = useTranslation();
  const loadingText = t('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      // Her zaman Welcome'a git — WelcomeScreen kendi içinde yeni/dönen kullanıcıyı ayırt eder
      navigation.replace('Welcome');
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Gökkuşağı arka plan */}
      <LinearGradient
        colors={['#FFB3D9', '#FFACE4', '#FFC8E8', '#C8E4FF', '#C4D4FF', '#D4C8FF', '#C8F0E0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Bulutlar */}
      {CLOUDS.map((c) => <Cloud key={c.id} cloud={c} />)}

      {/* Yıldız parıltıları */}
      {STARS.map((s) => <SparklesStar key={s.id} star={s} />)}

      {/* İçerik */}
      <View style={styles.centerContent}>
        {/* Pati logosu */}
        <PawLogo />

        {/* LOADING... yazısı - her harf farklı renk */}
        <View style={styles.loadingTextRow}>
          {loadingText.split('').map((ch, i) => (
            <Text key={i} style={[styles.loadingLetter, { color: LETTER_COLORS[i % LETTER_COLORS.length] }]}>
              {ch}
            </Text>
          ))}
        </View>

        {/* Yükleme çubuğu */}
        <LoadingBar />
      </View>
    </View>
  );
}

const PAW_SIZE = Math.min(SW * 0.55, 230);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Bulut stilleri
  cloudWrap: { position: 'absolute' },
  cloudBody: { position: 'absolute', bottom: 0, backgroundColor: '#FFF', borderRadius: 30 },
  cloudPuff: { position: 'absolute', backgroundColor: '#FFF', borderRadius: 100 },

  // Parıltı
  sparkle: {
    position: 'absolute',
    fontSize: 18,
    color: '#FFC312',
  },

  // İçerik merkezi
  centerContent: {
    alignItems: 'center',
    gap: 24,
  },

  // Pati logosu
  pawContainer: {
    width: PAW_SIZE,
    height: PAW_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing: {
    position: 'absolute',
    width: PAW_SIZE + 30,
    height: PAW_SIZE + 30,
    borderRadius: (PAW_SIZE + 30) / 2,
    backgroundColor: 'rgba(255, 200, 100, 0.35)',
  },
  pawBody: {
    width: PAW_SIZE * 0.80,
    height: PAW_SIZE * 0.80,
    borderRadius: PAW_SIZE * 0.42,
    borderBottomLeftRadius: PAW_SIZE * 0.30,
    borderBottomRightRadius: PAW_SIZE * 0.30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: PAW_SIZE * 0.08,
    overflow: 'hidden',
    shadowColor: '#A55EEA',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  pawHighlight: {
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: '40%',
    backgroundColor: 'rgba(255,255,255,0.32)',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  pawToes: {
    position: 'absolute',
    top: -PAW_SIZE * 0.14,
    flexDirection: 'row',
    gap: PAW_SIZE * 0.04,
    alignItems: 'flex-end',
  },
  pawSideToes: {
    position: 'absolute',
    top: PAW_SIZE * 0.04,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  toe: {
    borderRadius: 100,
  },
  toeLeft: { width: PAW_SIZE * 0.18, height: PAW_SIZE * 0.22 },
  toeCenter: { width: PAW_SIZE * 0.21, height: PAW_SIZE * 0.26 },
  toeRight: { width: PAW_SIZE * 0.18, height: PAW_SIZE * 0.22 },
  toeSideLeft: { width: PAW_SIZE * 0.14, height: PAW_SIZE * 0.18 },
  toeSideRight: { width: PAW_SIZE * 0.14, height: PAW_SIZE * 0.18 },
  pencilWrap: {
    marginBottom: PAW_SIZE * 0.04,
  },
  pencilEmoji: {
    fontSize: PAW_SIZE * 0.28,
  },
  sparkDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  // LOADING... yazısı
  loadingTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingLetter: {
    fontSize: 22,
    fontFamily: 'Fredoka_700Bold',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  // Yükleme çubuğu
  barWrapper: {
    alignItems: 'flex-start',
    width: BAR_W,
  },
  loadingBarOuter: {
    width: BAR_W,
    height: 18,
    backgroundColor: 'rgba(200,200,200,0.38)',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.85)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  barFillHighlight: {
    position: 'absolute',
    top: 0,
    left: 4,
    right: 4,
    height: '45%',
    backgroundColor: 'rgba(255,255,255,0.40)',
    borderRadius: 12,
  },

  // Yüzde balonu
  percentBadge: {
    position: 'absolute',
    top: 0,
    width: BADGE_W,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 10,
    paddingVertical: 3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  percentBadgeText: {
    fontSize: 11,
    fontFamily: 'Fredoka_700Bold',
    color: '#555',
  },
  percentBadgeArrow: {
    position: 'absolute',
    bottom: -5,
    left: '50%',
    marginLeft: -5,
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'rgba(255,255,255,0.95)',
  },
});
