import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SIZES, SHADOWS } from '../theme/fonts';
import { useLanguage } from '../i18n/index';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <TouchableOpacity
      onPress={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
      style={styles.btn}
      activeOpacity={0.8}
    >
      <Text style={styles.label}>{language === 'tr' ? '🇹🇷' : '🇬🇧'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: SIZES.btnHeightSm,
    height: SIZES.btnHeightSm,
    borderRadius: SIZES.radiusFull,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.sm,
  },
  label: {
    fontSize: 22,
  },
});
