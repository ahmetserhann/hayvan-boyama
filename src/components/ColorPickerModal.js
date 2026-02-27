import React, { useState, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { SIZES, SHADOWS } from '../theme/fonts';

const SLIDER_WIDTH = Dimensions.get('window').width - SIZES.xl * 4;
const SLIDER_HEIGHT = 36;
const SV_SIZE = SLIDER_WIDTH;

// HSV → RGB → Hex
function hsvToHex(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r, g, b;
  if (h < 60)       { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else              { r = c; g = 0; b = x; }
  const toHex = (n) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Saf ton rengi (s=1, v=1)
function hueToHex(h) { return hsvToHex(h, 1, 1); }

// Slider bileşeni
function Slider({ label, value, min, max, gradientColors, onChange }) {
  const sliderRef = useRef(null);
  const [layout, setLayout] = useState({ x: 0, width: SLIDER_WIDTH });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const pos = evt.nativeEvent.pageX - layout.x;
        const ratio = Math.max(0, Math.min(1, pos / layout.width));
        onChange(min + ratio * (max - min));
      },
      onPanResponderMove: (evt) => {
        const pos = evt.nativeEvent.pageX - layout.x;
        const ratio = Math.max(0, Math.min(1, pos / layout.width));
        onChange(min + ratio * (max - min));
      },
    })
  ).current;

  const thumbPos = ((value - min) / (max - min)) * SLIDER_WIDTH;

  return (
    <View style={styles.sliderWrapper}>
      <Text style={styles.sliderLabel}>{label}</Text>
      <View
        ref={sliderRef}
        onLayout={(e) => {
          sliderRef.current?.measure((fx, fy, w, h, px, py) => {
            setLayout({ x: px, width: w });
          });
        }}
        {...panResponder.panHandlers}
        style={styles.sliderTrack}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.thumb, { left: thumbPos - 14 }]} />
      </View>
    </View>
  );
}

// 2D SV seçici (Saturation × Value)
function SVPicker({ hue, saturation, value, onChange }) {
  const viewRef = useRef(null);
  const layoutRef = useRef({ x: 0, y: 0, size: SV_SIZE });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => handleMove(evt.nativeEvent.pageX, evt.nativeEvent.pageY),
      onPanResponderMove: (evt) => handleMove(evt.nativeEvent.pageX, evt.nativeEvent.pageY),
    })
  ).current;

  const handleMove = (px, py) => {
    const { x, y, size } = layoutRef.current;
    const s = Math.max(0, Math.min(1, (px - x) / size));
    const v = Math.max(0, Math.min(1, 1 - (py - y) / size));
    onChange(s, v);
  };

  const pickerH = SV_SIZE * 0.6;

  return (
    <View
      ref={viewRef}
      onLayout={() => {
        viewRef.current?.measure((fx, fy, w, h, px, py) => {
          layoutRef.current = { x: px, y: py, size: w };
        });
      }}
      {...panResponder.panHandlers}
      style={[styles.svPicker, { width: SV_SIZE, height: pickerH }]}
    >
      {/* Base hue */}
      <LinearGradient
        colors={[hueToHex(hue), hueToHex(hue)]}
        style={StyleSheet.absoluteFill}
      />
      {/* White overlay: left=white, right=transparent */}
      <LinearGradient
        colors={['#FFFFFF', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
      {/* Black overlay: top=transparent, bottom=black */}
      <LinearGradient
        colors={['transparent', '#000000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* Thumb */}
      <View
        style={[
          styles.svThumb,
          {
            left: saturation * SV_SIZE - 12,
            top: (1 - value) * pickerH - 12,
            borderColor: value > 0.5 ? '#000' : '#FFF',
          },
        ]}
      />
    </View>
  );
}

export default function ColorPickerModal({ visible, onClose, onColorSelect }) {
  const [hue, setHue] = useState(0);
  const [sat, setSat] = useState(1);
  const [val, setVal] = useState(1);

  const currentColor = hsvToHex(hue, sat, val);

  const hueGradient = [
    '#FF0000', '#FF8000', '#FFFF00', '#00FF00',
    '#00FFFF', '#0000FF', '#8000FF', '#FF00FF', '#FF0000',
  ];

  const satGradient = ['#FFFFFF', hueToHex(hue)];
  const valGradient = ['#000000', hueToHex(hue)];

  const handleConfirm = () => {
    onColorSelect(currentColor);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>🎨 Renk Seç</Text>

          {/* SV 2D picker */}
          <SVPicker
            hue={hue}
            saturation={sat}
            value={val}
            onChange={(s, v) => { setSat(s); setVal(v); }}
          />

          {/* Hue slider */}
          <Slider
            label="Ton"
            value={hue}
            min={0}
            max={359}
            gradientColors={hueGradient}
            onChange={setHue}
          />

          {/* Saturation slider */}
          <Slider
            label="Doygunluk"
            value={sat}
            min={0}
            max={1}
            gradientColors={satGradient}
            onChange={setSat}
          />

          {/* Value/Brightness slider */}
          <Slider
            label="Parlaklık"
            value={val}
            min={0}
            max={1}
            gradientColors={valGradient}
            onChange={setVal}
          />

          {/* Preview + buttons */}
          <View style={styles.bottomRow}>
            <View style={[styles.preview, { backgroundColor: currentColor }]} />
            <Text style={styles.hexLabel}>{currentColor.toUpperCase()}</Text>
            <View style={styles.btnRow}>
              <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirm}
                style={[styles.confirmBtn, { backgroundColor: currentColor }]}
              >
                <Text style={[styles.confirmText, { color: val < 0.4 ? '#FFF' : '#333' }]}>
                  Seç ✓
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: SIZES.radiusXl,
    borderTopRightRadius: SIZES.radiusXl,
    padding: SIZES.lg,
    paddingBottom: SIZES.xxl,
    gap: SIZES.md,
    ...SHADOWS.lg,
  },
  title: {
    fontSize: SIZES.fontLg,
    fontWeight: '900',
    color: COLORS.darkText,
    textAlign: 'center',
  },
  svPicker: {
    borderRadius: SIZES.radiusMd,
    overflow: 'hidden',
    alignSelf: 'center',
    ...SHADOWS.sm,
  },
  svThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  sliderWrapper: {
    gap: SIZES.xs,
  },
  sliderLabel: {
    fontSize: SIZES.fontSm,
    fontWeight: '700',
    color: COLORS.lightText,
  },
  sliderTrack: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    borderRadius: SLIDER_HEIGHT / 2,
    overflow: 'visible',
    justifyContent: 'center',
    alignSelf: 'center',
    ...SHADOWS.sm,
  },
  thumb: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#888',
    top: (SLIDER_HEIGHT - 28) / 2,
    ...SHADOWS.sm,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
    marginTop: SIZES.xs,
  },
  preview: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radiusMd,
    borderWidth: 1,
    borderColor: '#DDD',
    ...SHADOWS.sm,
  },
  hexLabel: {
    flex: 1,
    fontSize: SIZES.fontSm,
    fontWeight: '700',
    color: COLORS.darkText,
    fontFamily: 'monospace',
  },
  btnRow: {
    flexDirection: 'row',
    gap: SIZES.sm,
  },
  cancelBtn: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusLg,
    backgroundColor: '#EEE',
  },
  cancelText: {
    fontSize: SIZES.fontSm,
    fontWeight: '700',
    color: COLORS.lightText,
  },
  confirmBtn: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.sm,
  },
  confirmText: {
    fontSize: SIZES.fontSm,
    fontWeight: '900',
  },
});
