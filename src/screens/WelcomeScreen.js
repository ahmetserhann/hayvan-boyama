// GDD Adım 4 - Hoş Geldin / Giriş Ekranı
// Tasarım: hosgeldin.png
// - Arka plan: mavi→pembe gradyan + bulutlar + yıldızlar
// - "ANIMAL COLORING" başlığı: 3D efektli, her harf farklı pastel renk
// - Köşelerde dekoratif hayvan yüzleri
// - İsim giriş alanı (kedi ikonlu)
// - "Pick your favorite animal" + yatay kaydırmalı hayvan kartları
// - Büyük kırmızı PLAY butonu
// - Alt: ses, dil, ayarlar ikonları
import React, { useState, useRef } from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { SIZES } from '../theme/fonts';
import { GradientBackground, GlossyButton } from '../components/common';
import { useTranslation, useLanguage } from '../i18n/index';
import useAppStore from '../store/useAppStore';

const { width: SW } = Dimensions.get('window');

// "ANIMAL COLORING" başlığı her harf farklı renk
const TITLE_COLORS_1 = ['#FF6B9D', '#FF9F43', '#FFC312', '#A55EEA', '#45AAF2', '#2ED573'];
const TITLE_COLORS_2 = ['#FF4757', '#FFC312', '#A55EEA', '#45AAF2', '#FF6B9D', '#2ED573', '#FF9F43'];

// Favori hayvan seçenekleri
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

// Köşe dekorasyon hayvanları
const CORNER_ANIMALS = [
  { emoji: '🐶', style: { top: 0, left: 10 } },
  { emoji: '🐻', style: { top: 0, right: 10 } },
  { emoji: '🐼', style: { bottom: 0, left: 10 } },
  { emoji: '🦊', style: { bottom: 0, right: 10 } },
];

function Title3D() {
  const line1 = 'ANIMAL';
  const line2 = 'COLORING';
  return (
    <View style={styles.titleWrap}>
      {/* ANIMAL */}
      <View style={styles.titleRow}>
        {line1.split('').map((ch, i) => (
          <Text key={i} style={[styles.titleLetter, { color: TITLE_COLORS_1[i % TITLE_COLORS_1.length] }]}>
            {ch}
          </Text>
        ))}
      </View>
      {/* COLORING */}
      <View style={styles.titleRow}>
        {line2.split('').map((ch, i) => (
          <Text key={i} style={[styles.titleLetter, { color: TITLE_COLORS_2[i % TITLE_COLORS_2.length] }]}>
            {ch}
          </Text>
        ))}
      </View>
    </View>
  );
}

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
        <View style={[
          styles.animalCard,
          { backgroundColor: animal.bg },
          selected && styles.animalCardSelected,
        ]}>
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

function SmallIconBtn({ icon, label, onPress, active }) {
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

export default function WelcomeScreen({ navigation }) {
  const t = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { saveUserName, setSelectedAnimal, setSoundEnabled, soundEnabled } = useAppStore();

  const [name, setName] = useState(useAppStore.getState().userName || '');
  const [selectedAnimalId, setSelectedAnimalId] = useState(
    useAppStore.getState().selectedAnimal?.id || null
  );

  const handlePlay = async () => {
    if (!name.trim()) return;
    await saveUserName(name.trim());
    navigation.navigate('Categories');
  };

  const handleAnimalSelect = (animal) => {
    setSelectedAnimalId(animal.id);
    setSelectedAnimal(animal);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr');
  };

  const canPlay = name.trim().length > 0;

  return (
    <GradientBackground colors={['#B8E4FF', '#D4CCFF', '#F5B8D4']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Köşe hayvanlar */}
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
          {/* Başlık */}
          <Title3D />

          {/* İsim giriş alanı */}
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
              onPress={handlePlay}
              variant="primary"
              size="large"
              width={SW * 0.70}
              disabled={!canPlay}
            />
          </View>

          {/* Alt ikonlar: Ses, Dil, Ayarlar */}
          <View style={styles.bottomIcons}>
            <SmallIconBtn
              icon="🔊"
              label={t('sound')}
              onPress={() => setSoundEnabled(!soundEnabled)}
              active={soundEnabled}
            />
            <SmallIconBtn
              icon={language === 'tr' ? '🇹🇷' : '🇺🇸'}
              label={language.toUpperCase()}
              onPress={toggleLanguage}
              active={false}
            />
            <SmallIconBtn
              icon="⚙️"
              label={t('settings')}
              onPress={() => {}}
              active={false}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },

  // Köşe hayvanlar
  cornerAnimal: {
    position: 'absolute',
    zIndex: 10,
    padding: 8,
  },
  cornerEmoji: {
    fontSize: 32,
  },

  // 3D Başlık
  titleWrap: {
    alignItems: 'center',
    marginBottom: 28,
  },
  titleRow: {
    flexDirection: 'row',
  },
  titleLetter: {
    fontSize: 38,
    fontFamily: 'Fredoka_700Bold',
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 2,
    // Dış çizgi efekti (outline) için gölge
  },

  // İsim girişi
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
  inputIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  nameInput: {
    flex: 1,
    fontSize: SIZES.fontLg,
    fontFamily: 'Nunito_700Bold',
    color: COLORS.darkText,
  },

  // "Pick your favorite animal" yazısı
  pickLabel: {
    fontSize: SIZES.fontMd,
    fontFamily: 'Nunito_700Bold',
    color: COLORS.darkText,
    marginBottom: 12,
    textAlign: 'center',
  },

  // Hayvan kartları
  animalScroll: {
    paddingHorizontal: 4,
    gap: 10,
  },
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
  animalEmoji: {
    fontSize: 40,
  },
  selectedBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 22,
    height: 22,
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

  // PLAY butonu
  playBtnWrap: {
    marginTop: 8,
    marginBottom: 24,
  },

  // Alt ikon butonları
  bottomIcons: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  iconBtn: {
    alignItems: 'center',
  },
  iconBtnGrad: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 4,
  },
  iconBtnHighlight: {
    position: 'absolute',
    top: 0,
    left: 4,
    right: 4,
    height: '42%',
    backgroundColor: 'rgba(255,255,255,0.30)',
    borderRadius: 12,
  },
  iconBtnText: {
    fontSize: 22,
  },
  iconBtnShadow3d: {
    position: 'absolute',
    bottom: 0,
    width: 52,
    height: 52,
    borderRadius: 16,
    zIndex: -1,
    top: 4,
  },
});
