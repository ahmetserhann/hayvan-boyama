// GDD Section 5.3 - Glossy/Parlak 3D efektli buton
// Üst highlight şeridi + alt koyu kenar + basınç animasyonu
import React, { useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../theme/colors';
import { SIZES, SHADOWS } from '../../theme/fonts';

// Buton varyantları ve renkleri
const VARIANTS = {
  primary: {
    // Kırmızı - PLAY butonu
    colors: ['#FF6B7A', '#FF4757'],
    bottomColor: '#CC1A2E',
    textColor: '#FFFFFF',
  },
  success: {
    // Yeşil - Next, Collect, Claim
    colors: ['#5BF09A', '#2ED573'],
    bottomColor: '#1AAD57',
    textColor: '#FFFFFF',
  },
  secondary: {
    // Mavi - Replay, Later, Continue
    colors: ['#74C7F8', '#45AAF2'],
    bottomColor: '#2980B9',
    textColor: '#FFFFFF',
  },
  back: {
    // Mor - Geri ok
    colors: ['#C47DF5', '#A55EEA'],
    bottomColor: '#7D3CBF',
    textColor: '#FFFFFF',
  },
  gold: {
    // Altın - Ses butonu
    colors: ['#FFD84D', '#FFC312'],
    bottomColor: '#B8950F',
    textColor: '#FFFFFF',
  },
  pink: {
    // Pembe - Badge, popup
    colors: ['#FF8BB5', '#FF6B9D'],
    bottomColor: '#CC4A7A',
    textColor: '#FFFFFF',
  },
  gray: {
    // Gri - Clear, Home
    colors: ['#BDBDBD', '#9E9E9E'],
    bottomColor: '#616161',
    textColor: '#FFFFFF',
  },
  // Araç butonları
  toolPen: {
    colors: ['#5BF09A', '#2ED573'],
    bottomColor: '#1AAD57',
    textColor: '#FFFFFF',
  },
  toolEraser: {
    colors: ['#FF8BB5', '#FF6B9D'],
    bottomColor: '#CC4A7A',
    textColor: '#FFFFFF',
  },
  toolBucket: {
    colors: ['#74C7F8', '#45AAF2'],
    bottomColor: '#2980B9',
    textColor: '#FFFFFF',
  },
  toolGlow: {
    colors: ['#FFD84D', '#FFC312'],
    bottomColor: '#B8950F',
    textColor: '#FFFFFF',
  },
  toolUndo: {
    colors: ['#C47DF5', '#A55EEA'],
    bottomColor: '#7D3CBF',
    textColor: '#FFFFFF',
  },
  toolClear: {
    colors: ['#BDBDBD', '#9E9E9E'],
    bottomColor: '#616161',
    textColor: '#FFFFFF',
  },
};

export default function GlossyButton({
  label,
  onPress,
  variant = 'primary',
  size = 'large',     // 'large' | 'medium' | 'small' | 'tool' | 'icon'
  icon,               // React element (ikon bileşeni)
  iconOnly = false,   // Sadece ikon, yazı yok
  width,
  disabled = false,
  loading = false,
  style,
  textStyle,
  colors: customColors,
  bottomColor: customBottomColor,
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const v = VARIANTS[variant] || VARIANTS.primary;
  const gradColors = customColors || v.colors;
  const botColor = customBottomColor || v.bottomColor;
  const txtColor = v.textColor;

  // Boyut hesaplama
  const sizeStyles = {
    large: { height: SIZES.btnHeightLg, borderRadius: SIZES.radiusFull, paddingHorizontal: 40, minWidth: 200 },
    medium: { height: SIZES.btnHeightMd, borderRadius: SIZES.radiusFull, paddingHorizontal: 32, minWidth: 160 },
    small: { height: SIZES.btnHeightSm, borderRadius: SIZES.radiusFull, paddingHorizontal: 24, minWidth: 100 },
    tool: { width: SIZES.toolBtnSize, height: SIZES.toolBtnSize, borderRadius: SIZES.radiusMd },
    icon: { width: SIZES.iconBtnSize, height: SIZES.iconBtnSize, borderRadius: SIZES.radiusMd },
  };
  const sizeStyle = sizeStyles[size] || sizeStyles.large;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.93,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  const fontSize = size === 'large' ? SIZES.fontXl : size === 'medium' ? SIZES.fontLg : SIZES.fontMd;

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      {/* Alt koyu kenar (3D derinlik efekti) */}
      <View
        style={[
          styles.shadow3d,
          sizeStyle,
          { backgroundColor: botColor, width: width || sizeStyle.width || sizeStyle.minWidth },
        ]}
      />

      <TouchableOpacity
        onPress={disabled || loading ? null : onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={1}
        style={{ marginBottom: 4 }}
      >
        <LinearGradient
          colors={disabled ? ['#BDBDBD', '#9E9E9E'] : gradColors}
          style={[
            styles.btn,
            sizeStyle,
            width ? { width } : {},
            { opacity: disabled ? 0.7 : 1 },
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          {/* Üst highlight (glossy şerit) */}
          <View style={[styles.highlight, { borderRadius: sizeStyle.borderRadius }]} />

          {/* İçerik */}
          <View style={styles.innerContent}>
            {loading ? (
              <ActivityIndicator color={txtColor} size="small" />
            ) : (
              <>
                {icon && <View style={iconOnly ? null : styles.iconWrap}>{icon}</View>}
                {!iconOnly && label ? (
                  <Text style={[styles.label, { color: txtColor, fontSize }, textStyle]}>
                    {label}
                  </Text>
                ) : null}
              </>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...SHADOWS.glossy,
  },
  shadow3d: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    borderRadius: SIZES.radiusFull,
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: '42%',
    backgroundColor: 'rgba(255,255,255,0.30)',
    borderTopLeftRadius: SIZES.radiusFull,
    borderTopRightRadius: SIZES.radiusFull,
  },
  innerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  iconWrap: {
    marginRight: 4,
  },
  label: {
    fontFamily: 'Fredoka_700Bold',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
});
