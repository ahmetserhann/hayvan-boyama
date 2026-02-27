// GDD Section 4.3 - Alt navigasyon barı
// Home (pembe ev) | Gallery (mor palet) | Settings (gri dişli)
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../theme/colors';
import { SIZES } from '../../theme/fonts';
import { useTranslation } from '../../i18n/index';

const TABS = [
  { key: 'home',     icon: '🏠', labelKey: 'home',     color: '#FF6B9D' },
  { key: 'gallery',  icon: '🎨', labelKey: 'gallery',  color: '#A55EEA' },
  { key: 'settings', icon: '⚙️', labelKey: 'settings', color: '#9E9E9E' },
];

export default function NavBar({ activeTab = 'home', onTabPress, style }) {
  const t = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 8) }, style]}>
      <View style={styles.bar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => onTabPress?.(tab.key)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconWrap, isActive && { backgroundColor: tab.color + '22' }]}>
                <Text style={[styles.icon, isActive && { transform: [{ scale: 1.15 }] }]}>
                  {tab.icon}
                </Text>
              </View>
              <Text style={[styles.label, isActive && { color: tab.color, fontFamily: 'Nunito_700Bold' }]}>
                {t(tab.labelKey)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: SIZES.lg,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.navBarBg,
    borderRadius: SIZES.radiusXl,
    paddingVertical: SIZES.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  label: {
    fontSize: SIZES.fontXs,
    fontFamily: 'Nunito_400Regular',
    color: COLORS.lightText,
  },
});
