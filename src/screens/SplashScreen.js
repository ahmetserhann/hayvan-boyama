// GDD Adım 3 - Yükleme/Splash Ekranı (geçici placeholder - Adım 3'te tasarıma uygun yapılacak)
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={COLORS.mainBg} style={styles.container}>
      <Text style={styles.title}>🐾</Text>
      <Text style={styles.loading}>LOADING...</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 80, marginBottom: 20 },
  loading: { fontSize: 20, color: COLORS.darkText, fontFamily: 'Fredoka_700Bold' },
});
