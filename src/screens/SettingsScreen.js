// SettingsScreen - Ayarlar
// Tab ekranı — NavBar tab navigator tarafından sağlanır
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/common';
import { useTranslation, useLanguage } from '../i18n/index';
import useAppStore from '../store/useAppStore';
import { COLORS } from '../theme/colors';
import { SIZES } from '../theme/fonts';

function SettingRow({ icon, label, children }) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingIcon}>{icon}</Text>
      <Text style={styles.settingLabel}>{label}</Text>
      <View style={styles.settingControl}>{children}</View>
    </View>
  );
}

export default function SettingsScreen() {
  const t = useTranslation();
  const insets = useSafeAreaInsets();
  const { language, setLanguage } = useLanguage();
  const soundEnabled = useAppStore((s) => s.soundEnabled);
  const setSoundEnabled = useAppStore((s) => s.setSoundEnabled);

  return (
    <GradientBackground colors={COLORS.mainBg}>
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>

        <Text style={styles.title}>{t('settings') || 'Ayarlar'}</Text>

        <View style={styles.card}>
          <SettingRow icon="🔊" label={t('sound') || 'Ses'}>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#E0E0E0', true: '#2ED573' }}
              thumbColor="#fff"
            />
          </SettingRow>

          <View style={styles.divider} />

          <SettingRow icon="🌍" label={t('language') || 'Dil'}>
            <TouchableOpacity
              style={styles.langBtn}
              onPress={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              activeOpacity={0.8}
            >
              <Text style={styles.langBtnText}>
                {language === 'tr' ? '🇹🇷 Türkçe' : '🇺🇸 English'}
              </Text>
            </TouchableOpacity>
          </SettingRow>
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
    marginBottom: 24,
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: SIZES.radiusXl,
    paddingVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14,
  },
  settingIcon: {
    fontSize: 24,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    color: COLORS.darkText,
  },
  settingControl: {
    alignItems: 'flex-end',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginHorizontal: 20,
  },
  langBtn: {
    backgroundColor: COLORS.ctaPrimary + '22',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: COLORS.ctaPrimary + '44',
  },
  langBtnText: {
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
    color: COLORS.ctaPrimary,
  },
});
