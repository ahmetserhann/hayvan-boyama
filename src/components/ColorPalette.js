import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Animated, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { SIZES, SHADOWS } from '../theme/fonts';
import ColorPickerModal from './ColorPickerModal';

function PaletteColor({ color, selected, onPress }) {
  const scale = useRef(new Animated.Value(selected ? 1.25 : 1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: selected ? 1.25 : 1,
      useNativeDriver: true,
      friction: 6,
      tension: 80,
    }).start();
  }, [selected]);

  const isWhite = color === '#FFFFFF';

  return (
    <TouchableOpacity onPress={() => onPress(color)} activeOpacity={0.8}>
      <Animated.View style={[styles.colorBtn, selected && styles.selectedRing, { transform: [{ scale }] }]}>
        <View style={[styles.colorCircle, { backgroundColor: color }, isWhite && styles.whiteBorder]} />
      </Animated.View>
    </TouchableOpacity>
  );
}

function AddColorButton({ onPress, customColor }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.addBtn}>
      <LinearGradient
        colors={['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9B59B6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.addGradient}
      >
        <Text style={styles.addIcon}>+</Text>
      </LinearGradient>
      {customColor && (
        <View style={[styles.customDot, { backgroundColor: customColor }]} />
      )}
    </TouchableOpacity>
  );
}

export default function ColorPalette({ selectedColor, onColorSelect }) {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [customColors, setCustomColors] = useState([]);

  const handleCustomColor = (color) => {
    setCustomColors((prev) => {
      const filtered = prev.filter((c) => c !== color);
      return [color, ...filtered].slice(0, 8); // max 8 özel renk
    });
    onColorSelect(color);
  };

  const allColors = [...customColors, ...COLORS.palette];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Renk uzayı butonu */}
        <AddColorButton
          onPress={() => setPickerVisible(true)}
          customColor={customColors[0]}
        />

        {/* Tüm renkler */}
        {allColors.map((color, index) => (
          <PaletteColor
            key={`${color}-${index}`}
            color={color}
            selected={selectedColor === color}
            onPress={onColorSelect}
          />
        ))}
      </ScrollView>

      <ColorPickerModal
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        onColorSelect={handleCustomColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderTopLeftRadius: SIZES.radiusLg,
    borderTopRightRadius: SIZES.radiusLg,
    paddingVertical: SIZES.sm,
    ...SHADOWS.md,
  },
  scroll: {
    paddingHorizontal: SIZES.md,
    alignItems: 'center',
    gap: SIZES.sm,
  },
  colorBtn: {
    padding: 4,
    borderRadius: SIZES.radiusFull,
  },
  selectedRing: {
    borderWidth: 3,
    borderColor: COLORS.darkText,
  },
  colorCircle: {
    width: SIZES.paletteCircle,
    height: SIZES.paletteCircle,
    borderRadius: SIZES.radiusFull,
    ...SHADOWS.sm,
  },
  whiteBorder: {
    borderWidth: 1,
    borderColor: '#DDD',
  },
  addBtn: {
    width: SIZES.paletteCircle + 8,
    height: SIZES.paletteCircle + 8,
    borderRadius: SIZES.radiusFull,
    ...SHADOWS.sm,
    position: 'relative',
  },
  addGradient: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.radiusFull,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFF',
    lineHeight: 30,
  },
  customDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFF',
  },
});
