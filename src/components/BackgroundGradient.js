import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Ellipse } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

function Cloud({ x, y, size = 1 }) {
  const offset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(offset, { toValue: 18 * size, duration: 4000, useNativeDriver: true }),
        Animated.timing(offset, { toValue: 0, duration: 4000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, { left: x, top: y, transform: [{ translateX: offset }] }]}
      pointerEvents="none"
    >
      <Svg width={80 * size} height={40 * size} viewBox="0 0 80 40">
        <Ellipse cx="30" cy="25" rx="28" ry="18" fill="rgba(255,255,255,0.45)" />
        <Ellipse cx="55" cy="28" rx="22" ry="15" fill="rgba(255,255,255,0.45)" />
        <Ellipse cx="40" cy="18" rx="20" ry="16" fill="rgba(255,255,255,0.45)" />
      </Svg>
    </Animated.View>
  );
}

export default function BackgroundGradient({ colors, children, style }) {
  return (
    <LinearGradient colors={colors || ['#FFD1DC', '#B5EAD7', '#C7CEEA']} style={[styles.container, style]}>
      <Cloud x={-10} y={30} size={1.2} />
      <Cloud x={width - 100} y={60} size={0.9} />
      <Cloud x={width * 0.3} y={height * 0.15} size={0.7} />
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
