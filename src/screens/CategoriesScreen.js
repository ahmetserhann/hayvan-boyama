import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundGradient from '../components/BackgroundGradient';
import CategoryCard from '../components/CategoryCard';
import SoundToggle from '../components/SoundToggle';
import LanguageToggle from '../components/LanguageToggle';
import { useTranslation } from '../i18n/index';
import { CATEGORIES } from '../data/categories';
import { COLORS } from '../theme/colors';
import { SIZES, SHADOWS } from '../theme/fonts';

export default function CategoriesScreen({ navigation, route, soundEnabled, setSoundEnabled }) {
  const t = useTranslation();
  const name = route?.params?.name || '';

  const handleCategoryPress = (category) => {
    navigation.navigate('Coloring', {
      category,
      itemIndex: 0,
      name,
    });
  };

  return (
    <BackgroundGradient colors={COLORS.categoriesBg}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>{t('categories.title')}</Text>
          </View>
          <SoundToggle enabled={soundEnabled} onToggle={() => setSoundEnabled((v) => !v)} />
          <View style={{ width: SIZES.xs }} />
          <LanguageToggle />
        </View>

        <Text style={styles.subtitle}>{t('categories.subtitle')}</Text>

        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <CategoryCard category={item} onPress={handleCategoryPress} />
          )}
        />
      </SafeAreaView>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingTop: SIZES.sm,
    paddingBottom: SIZES.sm,
  },
  backBtn: {
    width: SIZES.btnHeightSm,
    height: SIZES.btnHeightSm,
    borderRadius: SIZES.radiusFull,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.sm,
  },
  backIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.darkText,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.fontLg,
    fontWeight: '900',
    color: COLORS.darkText,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: SIZES.fontSm,
    color: COLORS.darkText,
    opacity: 0.7,
    marginBottom: SIZES.sm,
  },
  grid: {
    paddingHorizontal: SIZES.sm,
    paddingBottom: SIZES.xl,
  },
});
