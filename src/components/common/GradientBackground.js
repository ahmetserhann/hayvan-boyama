// GDD Section 5.5 - Her ekranda kullanılan arka plan
// Dikey gradyan + beyaz bulutlar + parıltı noktaları
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../theme/colors';

const { width: SW, height: SH } = Dimensions.get('window');

// Bulut konfigürasyonları (boyut, konum, opaklık, hız)
const CLOUDS = [
  { id: 1, width: 120, height: 55, top: SH * 0.08, startX: -140, endX: SW + 20, duration: 22000, opacity: 0.75, delay: 0 },
  { id: 2, width: 90,  height: 42, top: SH * 0.18, startX: SW + 100, endX: -110, duration: 28000, opacity: 0.55, delay: 4000 },
  { id: 3, width: 150, height: 65, top: SH * 0.28, startX: -170, endX: SW + 30, duration: 35000, opacity: 0.45, delay: 8000 },
  { id: 4, width: 80,  height: 38, top: SH * 0.42, startX: SW + 90, endX: -100, duration: 20000, opacity: 0.65, delay: 2000 },
  { id: 5, width: 110, height: 50, top: SH * 0.55, startX: -130, endX: SW + 20, duration: 30000, opacity: 0.50, delay: 12000 },
  { id: 6, width: 70,  height: 32, top: SH * 0.70, startX: SW + 80, endX: -90,  duration: 25000, opacity: 0.40, delay: 6000 },
];

// Parıltı noktaları konfigürasyonu
const SPARKLES = [
  { id: 1, size: 6, top: '12%', left: '15%', delay: 0 },
  { id: 2, size: 4, top: '25%', left: '82%', delay: 800 },
  { id: 3, size: 8, top: '38%', left: '8%',  delay: 1600 },
  { id: 4, size: 5, top: '55%', left: '90%', delay: 400 },
  { id: 5, size: 6, top: '68%', left: '30%', delay: 1200 },
  { id: 6, size: 4, top: '80%', left: '70%', delay: 2000 },
  { id: 7, size: 7, top: '18%', left: '55%', delay: 600 },
];

function AnimatedCloud({ cloud }) {
  const anim = useRef(new Animated.Value(cloud.startX)).current;

  useEffect(() => {
    const animate = () => {
      anim.setValue(cloud.startX);
      Animated.timing(anim, {
        toValue: cloud.endX,
        duration: cloud.duration,
        useNativeDriver: true,
        delay: cloud.delay,
      }).start(() => animate());
    };
    animate();
  }, []);

  return (
    <Animated.View
      style={[
        styles.cloud,
        {
          width: cloud.width,
          height: cloud.height,
          top: cloud.top,
          opacity: cloud.opacity,
          transform: [{ translateX: anim }],
        },
      ]}
    >
      {/* Ana bulut gövdesi */}
      <View style={[styles.cloudBody, { width: cloud.width, height: cloud.height * 0.6, bottom: 0 }]} />
      {/* Sol tümsek */}
      <View style={[styles.cloudPuff, {
        width: cloud.width * 0.45,
        height: cloud.width * 0.45,
        bottom: cloud.height * 0.35,
        left: cloud.width * 0.1,
      }]} />
      {/* Orta tümsek (büyük) */}
      <View style={[styles.cloudPuff, {
        width: cloud.width * 0.55,
        height: cloud.width * 0.55,
        bottom: cloud.height * 0.4,
        left: cloud.width * 0.28,
      }]} />
      {/* Sağ tümsek */}
      <View style={[styles.cloudPuff, {
        width: cloud.width * 0.38,
        height: cloud.width * 0.38,
        bottom: cloud.height * 0.3,
        right: cloud.width * 0.08,
      }]} />
    </Animated.View>
  );
}

function AnimatedSparkle({ sparkle }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 800, useNativeDriver: true, delay: sparkle.delay }),
        Animated.timing(anim, { toValue: 0, duration: 800, useNativeDriver: true }),
        Animated.delay(1500),
      ]).start(() => animate());
    };
    animate();
  }, []);

  const scale = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.3, 1.2, 0.3] });
  const opacity = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.2, 1, 0.2] });

  return (
    <Animated.View
      style={[
        styles.sparkle,
        {
          width: sparkle.size,
          height: sparkle.size,
          top: sparkle.top,
          left: sparkle.left,
          opacity,
          transform: [{ scale }],
        },
      ]}
    />
  );
}

export default function GradientBackground({ children, colors, style }) {
  const gradientColors = colors || COLORS.mainBg;

  return (
    <LinearGradient colors={gradientColors} style={[styles.container, style]}>
      {/* Bulutlar */}
      {CLOUDS.map((cloud) => (
        <AnimatedCloud key={cloud.id} cloud={cloud} />
      ))}

      {/* Parıltı noktaları */}
      {SPARKLES.map((sparkle) => (
        <AnimatedSparkle key={sparkle.id} sparkle={sparkle} />
      ))}

      {/* İçerik */}
      <View style={styles.content}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  // Bulut parçaları
  cloud: {
    position: 'absolute',
  },
  cloudBody: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
  },
  cloudPuff: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
  },
  // Parıltı noktası (yıldız şekli yerine yuvarlak)
  sparkle: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
  },
});
