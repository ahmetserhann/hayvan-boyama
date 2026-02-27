import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { SIZES, SHADOWS } from '../theme/fonts';
import { useTranslation } from '../i18n/index';

export default function CategoryCard({ category, onPress }) {
  const t = useTranslation();
  const gradient = COLORS.categoryGradients[category.gradientIndex] || COLORS.categoryGradients[0];

  return (
    <TouchableOpacity onPress={() => onPress(category)} activeOpacity={0.85} style={styles.wrapper}>
      <LinearGradient colors={gradient} style={styles.card} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <Text style={styles.emoji}>{category.emoji}</Text>
        <Text style={styles.name}>{t(category.nameKey)}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{category.items.length}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: SIZES.sm,
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.md,
  },
  card: {
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    alignItems: 'center',
    minHeight: 130,
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 40,
    marginBottom: SIZES.xs,
  },
  name: {
    fontSize: SIZES.fontMd,
    fontWeight: '700',
    color: COLORS.darkText,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: SIZES.sm,
    right: SIZES.sm,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: SIZES.radiusFull,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: SIZES.fontXs,
    fontWeight: '700',
    color: COLORS.darkText,
  },
});
