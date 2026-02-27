import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from '@expo-google-fonts/fredoka';
import {
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import { View, ActivityIndicator } from 'react-native';

import { LanguageProvider } from './src/i18n/index';
import AppNavigator from './src/navigation/AppNavigator';
import useAppStore from './src/store/useAppStore';
import { COLORS } from './src/theme/colors';

export default function App() {
  const loadState = useAppStore((s) => s.loadState);
  const language = useAppStore((s) => s.language);
  const [storeReady, setStoreReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  useEffect(() => {
    loadState().then(() => setStoreReady(true));
  }, []);

  if (!fontsLoaded || !storeReady) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bgTop, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.ctaPrimary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <LanguageProvider language={language} onSetLanguage={useAppStore.getState().setLanguage}>
        <StatusBar style="dark" translucent />
        <AppNavigator />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
