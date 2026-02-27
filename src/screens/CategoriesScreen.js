// GDD Adım 5 - Ana Menü / Kategori Seçim Ekranı
// Tasarım: anamenu.png
// - "Hello, [Name]!" başlığı (koyu, büyük)
// - 2 sütun kategori grid kartları
// - Her kart: isim, hayvan görselleri grubu, ilerleme çubuğu, % göstergesi
// - Kilitli kartlar: gri overlay + sarı kilit ikonu
// - Alt navigasyon barı: Home | Gallery | Settings
import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { SIZES, SHADOWS } from '../theme/fonts';
import { GradientBackground, ProgressBar, NavBar } from '../components/common';
import { useTranslation } from '../i18n/index';
import useAppStore from '../store/useAppStore';
import { CATEGORIES_V2 } from '../data/categoriesData';

const { width: SW } = Dimensions.get('window');
const CARD_WIDTH = (SW - 48) / 2;  // 2 sütun, 16px kenar boşlukları

function CategoryCard({ category, onPress, completedAnimals }) {
  const t = useTranslation();

  const total = category.animals.length;
  const completedCount = category.animals.filter((a) => completedAnimals[a.id]).length;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  const progress = total > 0 ? completedCount / total : 0;
  const isLocked = category.locked;

  const handlePress = () => {
    if (!isLocked) onPress(category);
  };

  return (
    <TouchableOpacity
      style={styles.cardWrap}
      onPress={handlePress}
      activeOpacity={isLocked ? 1 : 0.85}
    >
      <View style={styles.card}>
        {/* Kart arka planı (hafif tematik renk) */}
        <View style={[styles.cardBg, { backgroundColor: category.bgColor }]} />

        {/* Hayvan emojileri grubu */}
        <View style={styles.animalGroup}>
          {category.decorEmojis.map((emoji, i) => (
            <Text key={i} style={[styles.animalEmoji, i === 1 && styles.animalEmojiCenter]}>
              {emoji}
            </Text>
          ))}
        </View>

        {/* Kategori adı */}
        <Text style={styles.categoryName}>{t(category.nameKey)}</Text>

        {/* İlerleme çubuğu + yüzde */}
        <View style={styles.progressRow}>
          <ProgressBar
            progress={progress}
            height={6}
            colors={category.gradientColors}
            backgroundColor="rgba(0,0,0,0.08)"
            style={{ flex: 1, marginRight: 6 }}
            animated={false}
          />
          <Text style={styles.percentText}>{percent}%</Text>
        </View>

        {/* Kilitli overlay */}
        {isLocked && (
          <View style={styles.lockedOverlay}>
            <Text style={styles.lockIcon}>🔒</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function CategoriesScreen({ navigation }) {
  const t = useTranslation();
  const userName = useAppStore((s) => s.userName);
  const completedAnimals = useAppStore((s) => s.completedAnimals);

  const displayName = userName || t('name_placeholder');

  const handleCategoryPress = useCallback((category) => {
    navigation.navigate('Coloring', {
      categoryId: category.id,
      animalIndex: 0,
    });
  }, [navigation]);

  const renderItem = useCallback(({ item }) => (
    <CategoryCard
      category={item}
      onPress={handleCategoryPress}
      completedAnimals={completedAnimals}
    />
  ), [handleCategoryPress, completedAnimals]);

  const insets = useSafeAreaInsets();

  return (
    <GradientBackground colors={COLORS.mainBg}>
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>

        {/* "Hello, [Name]!" başlığı */}
        <View style={styles.header}>
          <Text style={styles.helloText}>
            {t('hello_name').replace('{name}', displayName)}
          </Text>
        </View>

        {/* Kategori grid */}
        <FlatList
          data={CATEGORIES_V2}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
        />

        {/* Alt navigasyon */}
        <NavBar
          activeTab="home"
          onTabPress={(tab) => {
            if (tab === 'home') {/* zaten buradayız */}
          }}
          style={{ marginBottom: insets.bottom > 0 ? 0 : 12 }}
        />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Başlık
  header: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  helloText: {
    fontSize: 30,
    fontFamily: 'Fredoka_700Bold',
    color: COLORS.darkText,
    textShadowColor: 'rgba(0,0,0,0.08)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  // Grid
  gridContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  // Kart
  cardWrap: {
    width: CARD_WIDTH,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: SIZES.radiusXl,
    backgroundColor: COLORS.cardBg,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 10,
    minHeight: 150,
    ...SHADOWS.card,
  },
  cardBg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: SIZES.radiusXl,
  },

  // Hayvan emojileri
  animalGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 8,
    gap: 2,
  },
  animalEmoji: {
    fontSize: 30,
  },
  animalEmojiCenter: {
    fontSize: 38,
    marginBottom: -4,
  },

  // Kategori adı
  categoryName: {
    fontSize: 13,
    fontFamily: 'Fredoka_700Bold',
    color: COLORS.darkText,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
  },

  // İlerleme
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentText: {
    fontSize: 10,
    fontFamily: 'Nunito_700Bold',
    color: COLORS.darkText,
    minWidth: 28,
    textAlign: 'right',
  },

  // Kilitli overlay
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.lockedOverlay,
    borderRadius: SIZES.radiusXl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 36,
  },
});
