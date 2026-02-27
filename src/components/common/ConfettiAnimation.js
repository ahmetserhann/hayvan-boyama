// GDD Section 5.6 - Konfeti animasyonu (kutlama ekranı için)
// Renkli parçacıklar yukarıdan yağar (React Native Animated ile)
import React, { useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { COLORS } from '../../theme/colors';

const { width: SW, height: SH } = Dimensions.get('window');

const SHAPES = ['●', '■', '▲', '◆', '★'];
const PIECE_COUNT = 30;

function ConfettiPiece({ piece }) {
  const translateY = useRef(new Animated.Value(-60)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const drift = (Math.random() - 0.5) * 100;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SH + 80,
        duration: piece.duration,
        delay: piece.delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: drift,
        duration: piece.duration,
        delay: piece.delay,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: piece.rotations,
        duration: piece.duration,
        delay: piece.delay,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(piece.delay + piece.duration * 0.75),
        Animated.timing(opacity, {
          toValue: 0,
          duration: piece.duration * 0.25,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${360 * piece.rotations}deg`],
  });

  return (
    <Animated.Text
      style={{
        position: 'absolute',
        left: piece.x,
        top: 0,
        fontSize: piece.size,
        color: piece.color,
        opacity,
        transform: [{ translateY }, { translateX }, { rotate: spin }],
      }}
    >
      {piece.shape}
    </Animated.Text>
  );
}

export default function ConfettiAnimation({ active = true }) {
  const pieces = useMemo(() =>
    Array.from({ length: PIECE_COUNT }).map((_, i) => ({
      id: i,
      x: Math.random() * SW,
      size: 10 + Math.random() * 14,
      color: COLORS.confetti[Math.floor(Math.random() * COLORS.confetti.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      duration: 1800 + Math.random() * 1500,
      delay: Math.random() * 800,
      rotations: 2 + Math.floor(Math.random() * 4),
    })), []
  );

  if (!active) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {pieces.map((p) => (
        <ConfettiPiece key={p.id} piece={p} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: 999,
  },
});
