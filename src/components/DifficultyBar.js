import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SIZES, SHADOWS } from '../theme/fonts';
import { useTranslation } from '../i18n/index';

const LEVELS = ['easy', 'medium', 'hard'];

export default function DifficultyBar({ selected, onSelect }) {
  const t = useTranslation();

  return (
    <View style={styles.container}>
      {LEVELS.map((level) => (
        <TouchableOpacity
          key={level}
          onPress={() => onSelect(level)}
          style={[styles.btn, selected === level && styles.selected]}
          activeOpacity={0.8}
        >
          <Text style={[styles.label, selected === level && styles.selectedLabel]}>
            {t(`coloring.difficulty.${level}`)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.xs,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
  },
  btn: {
    flex: 1,
    height: 36,
    borderRadius: SIZES.radiusFull,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.sm,
  },
  selected: {
    backgroundColor: COLORS.pastelPink,
  },
  label: {
    fontSize: SIZES.fontXs,
    fontWeight: '600',
    color: COLORS.lightText,
  },
  selectedLabel: {
    color: COLORS.darkText,
  },
});
