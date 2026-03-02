// WelcomeScreen — İki mod:
// 1) İlk defa: isim gir + hayvan seç + PLAY
// 2) Geri dönen kullanıcı: büyük canlı OYNA butonu
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { SIZES } from '../theme/fonts';
import { GradientBackground, GlossyButton } from '../components/common';
import { useTranslation, useLanguage } from '../i18n/index';
import useAppStore from '../store/useAppStore';

const { width: SW, height: SH } = Dimensions.get('window');

// ─── Sabit veriler ────────────────────────────────────────────────────────────
const TITLE_COLORS_1 = ['#FF6B9D', '#FF9F43', '#FFC312', '#A55EEA', '#45AAF2', '#2ED573'];
const TITLE_COLORS_2 = ['#FF4757', '#FFC312', '#A55EEA', '#45AAF2', '#FF6B9D', '#2ED573', '#FF9F43'];

const FAVORITE_ANIMALS = [
  { id: 'elephant', emoji: '🐘', bg: '#E8D5F5' },
  { id: 'bear',     emoji: '🐻', bg: '#FFE5CC' },
  { id: 'cat',      emoji: '🐱', bg: '#FFD1DC' },
  { id: 'dog',      emoji: '🐶', bg: '#C7ECFF' },
  { id: 'rabbit',   emoji: '🐰', bg: '#D4EFDF' },
  { id: 'lion',     emoji: '🦁', bg: '#FFEAA7' },
  { id: 'fox',      emoji: '🦊', bg: '#FFDAC1' },
  { id: 'panda',    emoji: '🐼', bg: '#E8D5F5' },
];

const CORNER_ANIMALS = [
  { emoji: '🐶', style: { top: 0, left: 10 } },
  { emoji: '🐻', style: { top: 0, right: 10 } },
  { emoji: '🐼', style: { bottom: 0, left: 10 } },
  { emoji: '🦊', style: { bottom: 0, right: 10 } },
];

// ─── Küçük alt ikon butonu ────────────────────────────────────────────────────
function SmallIconBtn({ icon, onPress, active }) {
  return (
    <TouchableOpacity style={styles.iconBtn} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={active ? ['#74C7F8', '#45AAF2'] : ['#F0F0F0', '#E0E0E0']}
        style={styles.iconBtnGrad}
      >
        <View style={styles.iconBtnHighlight} />
        <Text style={styles.iconBtnText}>{icon}</Text>
      </LinearGradient>
      <View style={[styles.iconBtnShadow3d, { backgroundColor: active ? '#2980B9' : '#BDBDBD' }]} />
    </TouchableOpacity>
  );
}

// ─── Gökkuşağı 3D başlık ─────────────────────────────────────────────────────
function Title3D() {
  return (
    <View style={styles.titleWrap}>
      <View style={styles.titleRow}>
        {'ANIMAL'.split('').map((ch, i) => (
          <Text key={i} style={[styles.titleLetter, { color: TITLE_COLORS_1[i % TITLE_COLORS_1.length] }]}>
            {ch}
          </Text>
        ))}
      </View>
      <View style={styles.titleRow}>
        {'COLORING'.split('').map((ch, i) => (
          <Text key={i} style={[styles.titleLetter, { color: TITLE_COLORS_2[i % TITLE_COLORS_2.length] }]}>
            {ch}
          </Text>
        ))}
      </View>
    </View>
  );
}

// ─── Hayvan kartı (yeni kullanıcı) ───────────────────────────────────────────
function AnimalCard({ animal, selected, onPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 0.88, useNativeDriver: true, speed: 50 }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 12 }),
    ]).start();
    onPress(animal);
  };
  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <View style={[styles.animalCard, { backgroundColor: animal.bg }, selected && styles.animalCardSelected]}>
          <Text style={styles.animalEmoji}>{animal.emoji}</Text>
          {selected && (
            <View style={styles.selectedBadge}>
              <Text style={styles.selectedCheck}>✓</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Dönen kullanıcı: çekici avatar kartı ────────────────────────────────────
function AvatarCard({ animal, name }) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -10, duration: 900, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.avatarCard, { transform: [{ translateY: floatAnim }] }]}>
      <LinearGradient
        colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.75)']}
        style={styles.avatarInner}
      >
        <Text style={styles.avatarEmoji}>{animal?.emoji || '🐾'}</Text>
        <Text style={styles.avatarName}>{name}</Text>
      </LinearGradient>
    </Animated.View>
  );
}

// ─── Dönen kullanıcı: büyük nabız atan OYNA butonu ───────────────────────────
function PulsePlayButton({ onPress }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim  = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.07, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1.00, duration: 700, useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.5, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.pulseWrap}>
      {/* Dış hale */}
      <Animated.View style={[styles.glowRing, { opacity: glowAnim }]} />
      {/* İkinci hale */}
      <Animated.View style={[styles.glowRing2, { opacity: glowAnim, transform: [{ scale: pulseAnim }] }]} />
      {/* Buton */}
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.playBtn}>
          {/* Alt 3D kenar */}
          <View style={styles.playBtn3d} />
          <LinearGradient
            colors={['#FF6B6B', '#FF4757', '#CC1A2E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.playBtnGrad}
          >
            {/* Glossy highlight */}
            <View style={styles.playBtnHighlight} />
            <Text style={styles.playBtnEmoji}>🎮</Text>
            <Text style={styles.playBtnLabel}>OYNA</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// ─── Ana bileşen ─────────────────────────────────────────────────────────────
export default function WelcomeScreen({ navigation }) {
  const t = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { saveUserName, setSelectedAnimal, setSoundEnabled, soundEnabled } = useAppStore();

  const existingName   = useAppStore.getState().userName;
  const existingAnimal = useAppStore.getState().selectedAnimal;
  const isReturningUser = !!existingName;

  const [name, setName]                   = useState(existingName || '');
  const [selectedAnimalId, setSelectedAnimalId] = useState(existingAnimal?.id || null);

  const goToMain = () => navigation.navigate('MainTabs');

  const handlePlayNew = async () => {
    if (!name.trim()) return;
    await saveUserName(name.trim());
    goToMain();
  };

  const handleAnimalSelect = (animal) => {
    setSelectedAnimalId(animal.id);
    setSelectedAnimal(animal);
  };

  // ── Dönen kullanıcı görünümü ────────────────────────────────────────────
  if (isReturningUser) {
    return (
      <GradientBackground colors={['#B8E4FF', '#D4CCFF', '#F5B8D4']}>
        {/* Köşe dekorasyonlar */}
        {CORNER_ANIMALS.map((c, i) => (
          <View key={i} style={[styles.cornerAnimal, c.style]}>
            <Text style={styles.cornerEmoji}>{c.emoji}</Text>
          </View>
        ))}

        <View style={styles.returningContainer}>
          {/* Başlık */}
          <Title3D />

          {/* Karşılama yazısı */}
          <Text style={styles.welcomeBackText}>
            {t('welcome_back') || 'Tekrar hoş geldin!'} ✨
          </Text>

          {/* Avatar kartı — seçili hayvan + isim, yüzer animasyon */}
          <AvatarCard animal={existingAnimal} name={existingName} />

          {/* Büyük nabız atan OYNA butonu */}
          <PulsePlayButton onPress={goToMain} />

          {/* Alt ikonlar */}
          <View style={styles.bottomIcons}>
            <SmallIconBtn
              icon="🔊"
              onPress={() => setSoundEnabled(!soundEnabled)}
              active={soundEnabled}
            />
            <SmallIconBtn
              icon={language === 'tr' ? '🇹🇷' : '🇺🇸'}
              onPress={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              active={false}
            />
          </View>
        </View>
      </GradientBackground>
    );
  }

  // ── Yeni kullanıcı görünümü (mevcut form) ──────────────────────────────
  return (
    <GradientBackground colors={['#B8E4FF', '#D4CCFF', '#F5B8D4']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {CORNER_ANIMALS.map((c, i) => (
          <View key={i} style={[styles.cornerAnimal, c.style]}>
            <Text style={styles.cornerEmoji}>{c.emoji}</Text>
          </View>
        ))}

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Title3D />

          {/* İsim girişi */}
          <View style={styles.nameInputWrap}>
            <Text style={styles.inputIcon}>🐱</Text>
            <TextInput
              style={styles.nameInput}
              placeholder={t('name_placeholder')}
              placeholderTextColor={COLORS.lightText}
              value={name}
              onChangeText={setName}
              maxLength={20}
              returnKeyType="done"
            />
          </View>

          {/* Hayvan seçimi */}
          <Text style={styles.pickLabel}>{t('pick_animal')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.animalScroll}
            style={{ marginBottom: 20 }}
          >
            {FAVORITE_ANIMALS.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                selected={selectedAnimalId === animal.id}
                onPress={handleAnimalSelect}
              />
            ))}
          </ScrollView>

          {/* PLAY butonu */}
          <View style={styles.playBtnWrap}>
            <GlossyButton
              label={t('play')}
              onPress={handlePlayNew}
              variant="primary"
              size="large"
              width={SW * 0.70}
              disabled={!name.trim()}
            />
          </View>

          {/* Alt ikonlar */}
          <View style={styles.bottomIcons}>
            <SmallIconBtn
              icon="🔊"
              onPress={() => setSoundEnabled(!soundEnabled)}
              active={soundEnabled}
            />
            <SmallIconBtn
              icon={language === 'tr' ? '🇹🇷' : '🇺🇸'}
              onPress={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              active={false}
            />
            <SmallIconBtn icon="⚙️" onPress={() => {}} active={false} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

// ─── Stiller ─────────────────────────────────────────────────────────────────
const PLAY_BTN_SIZE = Math.min(SW * 0.52, 220);

const styles = StyleSheet.create({

  // ── Köşe hayvanlar
  cornerAnimal: { position: 'absolute', zIndex: 10, padding: 8 },
  cornerEmoji:  { fontSize: 32 },


  // ── 3D Başlık
  titleWrap:   { alignItems: 'center', marginBottom: 20 },
  titleRow:    { flexDirection: 'row' },
  titleLetter: {
    fontSize: 38,
    fontFamily: 'Fredoka_700Bold',
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 2,
  },

  // ── Dönen kullanıcı layout
  returningContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 20,
    paddingTop: 48,
    paddingBottom: 36,
  },
  welcomeBackText: {
    fontSize: 20,
    fontFamily: 'Nunito_700Bold',
    color: COLORS.darkText,
    textAlign: 'center',
  },

  // ── Avatar kartı (dönen kullanıcı)
  avatarCard: {
    borderRadius: 28,
    shadowColor: '#A55EEA',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  avatarInner: {
    alignItems: 'center',
    paddingHorizontal: 36,
    paddingVertical: 20,
    borderRadius: 28,
    gap: 6,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  avatarEmoji: { fontSize: 64 },
  avatarName: {
    fontSize: 22,
    fontFamily: 'Fredoka_700Bold',
    color: COLORS.darkText,
  },

  // ── Büyük OYNA butonu
  pulseWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing: {
    position: 'absolute',
    width: PLAY_BTN_SIZE + 40,
    height: PLAY_BTN_SIZE + 40,
    borderRadius: (PLAY_BTN_SIZE + 40) / 2,
    backgroundColor: 'rgba(255, 71, 87, 0.18)',
  },
  glowRing2: {
    position: 'absolute',
    width: PLAY_BTN_SIZE + 16,
    height: PLAY_BTN_SIZE + 16,
    borderRadius: (PLAY_BTN_SIZE + 16) / 2,
    backgroundColor: 'rgba(255, 71, 87, 0.25)',
  },
  playBtn: {
    position: 'relative',
  },
  playBtn3d: {
    position: 'absolute',
    bottom: -8,
    left: 0,
    right: 0,
    height: PLAY_BTN_SIZE,
    borderRadius: PLAY_BTN_SIZE / 2,
    backgroundColor: '#8B0000',
    zIndex: -1,
  },
  playBtnGrad: {
    width: PLAY_BTN_SIZE,
    height: PLAY_BTN_SIZE,
    borderRadius: PLAY_BTN_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.35)',
    overflow: 'hidden',
    gap: 4,
  },
  playBtnHighlight: {
    position: 'absolute',
    top: 0,
    left: '12%',
    right: '12%',
    height: '38%',
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderRadius: 100,
  },
  playBtnEmoji: { fontSize: PLAY_BTN_SIZE * 0.22 },
  playBtnLabel: {
    fontSize: PLAY_BTN_SIZE * 0.18,
    fontFamily: 'Fredoka_700Bold',
    color: '#fff',
    letterSpacing: 3,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  // ── Yeni kullanıcı form layout
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  nameInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: SIZES.radiusFull,
    paddingHorizontal: 20,
    height: 56,
    width: SW * 0.82,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  inputIcon:  { fontSize: 24, marginRight: 10 },
  nameInput: {
    flex: 1,
    fontSize: SIZES.fontLg,
    fontFamily: 'Nunito_700Bold',
    color: COLORS.darkText,
  },
  pickLabel: {
    fontSize: SIZES.fontMd,
    fontFamily: 'Nunito_700Bold',
    color: COLORS.darkText,
    marginBottom: 12,
    textAlign: 'center',
  },
  animalScroll: { paddingHorizontal: 4, gap: 10 },
  animalCard: {
    width: 78,
    height: 78,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  animalCardSelected: {
    borderWidth: 3,
    borderColor: COLORS.ctaAccent,
    shadowColor: COLORS.ctaAccent,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  animalEmoji:   { fontSize: 40 },
  selectedBadge: {
    position: 'absolute',
    top: -6, right: -6,
    width: 22, height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.ctaAccent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheck: {
    fontSize: 13,
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
  },
  playBtnWrap: { marginTop: 8, marginBottom: 24 },

  // ── Alt ikonlar (her iki mod)
  bottomIcons: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  iconBtn: { alignItems: 'center' },
  iconBtnGrad: {
    width: 52, height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 6,
    marginBottom: 4,
  },
  iconBtnHighlight: {
    position: 'absolute',
    top: 0, left: 4, right: 4,
    height: '42%',
    backgroundColor: 'rgba(255,255,255,0.30)',
    borderRadius: 12,
  },
  iconBtnText: { fontSize: 22 },
  iconBtnShadow3d: {
    position: 'absolute',
    bottom: 0, width: 52, height: 52,
    borderRadius: 16, zIndex: -1, top: 4,
  },
});
