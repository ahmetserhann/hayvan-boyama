// GDD - Yıldız puanlama bileşeni (altın/gri, pop-in animasyonlu)
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../../theme/colors';

function Star({ filled, size = 36, delay = 0, animate = false }) {
  const scaleAnim = useRef(new Animated.Value(animate ? 0 : 1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animate) return;
    Animated.sequence([
      Animated.delay(delay),
      Animated.spring(scaleAnim, {
        toValue: 1.3,
        useNativeDriver: true,
        speed: 20,
        bounciness: 15,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 8,
      }),
    ]).start();

    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animate]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '15deg'],
  });

  return (
    <Animated.Text
      style={{
        fontSize: size,
        transform: [{ scale: scaleAnim }, { rotate }],
      }}
    >
      {filled ? '⭐' : '☆'}
    </Animated.Text>
  );
}

export default function StarRating({ stars = 0, maxStars = 3, size = 36, animate = false, style }) {
  return (
    <View style={[styles.row, style]}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <Star
          key={i}
          filled={i < stars}
          size={size}
          delay={i * 300}
          animate={animate && i < stars}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
});
