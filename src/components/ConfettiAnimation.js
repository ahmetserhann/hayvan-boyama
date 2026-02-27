import React, { useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, View, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');
const PALETTE = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6BA8', '#C7CEEA', '#FFB347'];
const PARTICLE_COUNT = 25;

function Particle({ index }) {
  const x = Math.random() * width;
  const color = PALETTE[index % PALETTE.length];
  const size = 8 + Math.random() * 8;
  const delay = Math.random() * 1000;
  const duration = 2000 + Math.random() * 1500;

  const translateY = useRef(new Animated.Value(-20)).current;
  const translateX = useRef(new Animated.Value(x)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(translateY, { toValue: height + 20, duration, useNativeDriver: true }),
        ]),
        Animated.loop(
          Animated.sequence([
            Animated.timing(translateX, { toValue: x + 30, duration: duration / 2, useNativeDriver: true }),
            Animated.timing(translateX, { toValue: x - 20, duration: duration / 2, useNativeDriver: true }),
          ])
        ),
        Animated.loop(
          Animated.timing(rotate, { toValue: 1, duration: 800, useNativeDriver: true })
        ),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  const rotateStr = rotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size / 4,
          transform: [{ translateX }, { translateY }, { rotate: rotateStr }],
        },
      ]}
    />
  );
}

export default function ConfettiAnimation() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <Particle key={i} index={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
