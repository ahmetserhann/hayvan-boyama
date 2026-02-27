import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { SIZES } from '../theme/fonts';

function AnimatedStar({ filled, delay }) {
  const scale = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.delay(delay),
        Animated.spring(scale, { toValue: filled ? 1 : 0.7, useNativeDriver: true, friction: 5 }),
      ]),
      filled
        ? Animated.sequence([
            Animated.delay(delay),
            Animated.sequence([
              Animated.timing(rotate, { toValue: -0.3, duration: 120, useNativeDriver: true }),
              Animated.timing(rotate, { toValue: 0.3, duration: 120, useNativeDriver: true }),
              Animated.timing(rotate, { toValue: 0, duration: 120, useNativeDriver: true }),
            ]),
          ])
        : Animated.delay(0),
    ]).start();
  }, []);

  const rotateStr = rotate.interpolate({ inputRange: [-1, 1], outputRange: ['-1rad', '1rad'] });

  return (
    <Animated.View style={{ transform: [{ scale }, { rotate: rotateStr }] }}>
      <Text style={[styles.star, filled ? styles.filled : styles.empty]}>⭐</Text>
    </Animated.View>
  );
}

export default function StarRating({ stars }) {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map((i) => (
        <AnimatedStar key={i} filled={i <= stars} delay={(i - 1) * 250} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.sm,
    marginVertical: SIZES.md,
  },
  star: { fontSize: 48 },
  filled: { opacity: 1 },
  empty: { opacity: 0.3 },
});
