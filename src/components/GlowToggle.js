import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SIZES, SHADOWS } from '../theme/fonts';

export default function GlowToggle({ enabled, onToggle }) {
  return (
    <TouchableOpacity onPress={onToggle} style={[styles.btn, enabled && styles.active]} activeOpacity={0.8}>
      <Text style={styles.icon}>✨</Text>
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
  active: {
    backgroundColor: '#FFD93D',
  },
  icon: {
    fontSize: 22,
  },
});
