// GalleryScreen - Koleksiyon / Galeri (Placeholder)
// Tab ekranı — NavBar tab navigator tarafından sağlanır
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/common';
import { useTranslation } from '../i18n/index';
import { COLORS } from '../theme/colors';

export default function GalleryScreen() {
  const t = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <GradientBackground colors={COLORS.mainBg}>
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>

        <Text style={styles.title}>{t('gallery') || 'Galeri'}</Text>

        <View style={styles.placeholder}>
          <Text style={styles.placeholderEmoji}>🎨</Text>
          <Text style={styles.placeholderTitle}>{t('gallery') || 'Koleksiyonum'}</Text>
          <Text style={styles.placeholderDesc}>
            {t('gallery_coming_soon') || 'Tamamladığın hayvanlar burada görünecek!'}
          </Text>
        </View>

      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Fredoka_700Bold',
    color: COLORS.darkText,
    textAlign: 'center',
    marginBottom: 8,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 40,
    paddingBottom: 80,
  },
  placeholderEmoji: {
    fontSize: 72,
  },
  placeholderTitle: {
    fontSize: 22,
    fontFamily: 'Fredoka_700Bold',
    color: COLORS.darkText,
  },
  placeholderDesc: {
    fontSize: 15,
    fontFamily: 'Nunito_400Regular',
    color: COLORS.lightText,
    textAlign: 'center',
    lineHeight: 24,
  },
});
