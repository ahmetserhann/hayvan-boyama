import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SIZES, SHADOWS } from '../theme/fonts';

export default function SoundToggle({ enabled, onToggle }) {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.btn} activeOpacity={0.8}>
      <Text style={styles.icon}>{enabled ? '🔊' : '🔇'}</Text>
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
  icon: {
    fontSize: 22,
  },
});
