// CategoryScreen - Kategori İçi Hayvanlar
// - Üst bar: geri butonu, kategori adı + emoji
// - Zorluk filtresi: Tümü | Kolay | Orta | Zor
// - Hayvan kartları grid (2 sütun)
// - Her kart: emoji, ad, zorluk yıldızları, tamamlandı rozeti
// - Karta tıklayınca ColoringScreen'e git
import React, { useState, useCallback } from 'react';
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
import { GradientBackground } from '../components/common';
import { useTranslation } from '../i18n/index';
import useAppStore from '../store/useAppStore';
import { CATEGORIES_V2 } from '../data/categoriesData';

const { width: SW } = Dimensions.get('window');
const CARD_WIDTH = (SW - 48) / 2;

// Bölge sayısına göre zorluk seviyesi
function getDifficulty(animal) {
  const count = animal.regions?.length || 0;
  if (count <= 5) return 'easy';
  if (count <= 9) return 'medium';
  return 'hard';
}

const DIFFICULTY_CONFIG = {
  easy:   { label: 'easy',   stars: 1, color: '#2ED573' },
  medium: { label: 'medium', stars: 2, color: '#FFC312' },
  hard:   { label: 'hard',   stars: 3, color: '#FF4757' },
};

function DifficultyStars({ level }) {
  const cfg = DIFFICULTY_CONFIG[level] || DIFFICULTY_CONFIG.easy;
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3].map((i) => (
        <Text key={i} style={{ fontSize: 10, opacity: i <= cfg.stars ? 1 : 0.25 }}>⭐</Text>
      ))}
    </View>
  );
}

function AnimalCard({ animal, index, categoryId, onPress, completedAnimals }) {
  const t = useTranslation();
  const isCompleted = !!completedAnimals[animal.id];
  const stars = completedAnimals[animal.id]?.stars || 0;
  const difficulty = getDifficulty(animal);

  return (
    <TouchableOpacity
      style={styles.cardWrap}
      onPress={() => onPress(index)}
      activeOpacity={0.85}
    >
      <View style={[styles.card, isCompleted && styles.cardCompleted]}>
        {/* Tamamlandı rozeti */}
        {isCompleted && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeText}>✓</Text>
          </View>
        )}

        {/* Hayvan emojisi */}
        <Text style={styles.animalEmoji}>{animal.emoji || '🐾'}</Text>

        {/* Hayvan adı */}
        <Text style={styles.animalName} numberOfLines={1}>
          {t(animal.nameKey) || animal.nameKey}
        </Text>

        {/* Zorluk yıldızları */}
        <DifficultyStars level={difficulty} />

        {/* Kazanılan yıldızlar (tamamlandıysa) */}
        {isCompleted && stars > 0 && (
          <View style={styles.earnedStarsRow}>
            {[1, 2, 3].map((i) => (
              <Text key={i} style={{ fontSize: 11, opacity: i <= stars ? 1 : 0.2 }}>★</Text>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function CategoryScreen({ navigation, route }) {
  const t = useTranslation();
  const insets = useSafeAreaInsets();
  const completedAnimals = useAppStore((s) => s.completedAnimals);

  const { categoryId } = route.params || {};
  const category = CATEGORIES_V2.find((c) => c.id === categoryId) || CATEGORIES_V2[0];

  const [activeFilter, setActiveFilter] = useState('all');

  const FILTERS = [
    { key: 'all',    label: t('all') || 'Tümü' },
    { key: 'easy',   label: t('easy') || 'Kolay' },
    { key: 'medium', label: t('medium') || 'Orta' },
    { key: 'hard',   label: t('hard') || 'Zor' },
  ];

  const filteredAnimals = activeFilter === 'all'
    ? category.animals
    : category.animals.filter((a) => getDifficulty(a) === activeFilter);

  const handleAnimalPress = useCallback((animalIndex) => {
    navigation.navigate('Coloring', { categoryId: category.id, animalIndex });
  }, [navigation, category]);

  const renderItem = useCallback(({ item, index }) => (
    <AnimalCard
      animal={item}
      index={category.animals.indexOf(item)}
      categoryId={category.id}
      onPress={handleAnimalPress}
      completedAnimals={completedAnimals}
    />
  ), [handleAnimalPress, completedAnimals, category]);

  return (
    <GradientBackground colors={COLORS.mainBg}>
      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>

        {/* Üst bar */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#C47DF5', '#A55EEA']}
              style={styles.backBtnGrad}
            >
              <View style={styles.backBtnHighlight} />
              <Text style={styles.backBtnText}>←</Text>
            </LinearGradient>
            <View style={styles.backBtn3d} />
          </TouchableOpacity>

          <View style={styles.titleWrap}>
            <Text style={styles.categoryIcon}>{category.icon || category.emoji}</Text>
            <Text style={styles.categoryTitle}>{t(category.nameKey)}</Text>
          </View>

          {/* Sağ taraf boşluk (back butonuyla hizalama için) */}
          <View style={{ width: 52 }} />
        </View>

        {/* Zorluk filtresi */}
        <View style={styles.filterRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.key}
              style={[styles.filterBtn, activeFilter === f.key && styles.filterBtnActive]}
              onPress={() => setActiveFilter(f.key)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.filterLabel,
                activeFilter === f.key && styles.filterLabelActive,
              ]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Hayvan grid */}
        <FlatList
          data={filteredAnimals}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>🐾</Text>
              <Text style={styles.emptyLabel}>
                {t('no_animals') || 'Bu zorlukta hayvan yok'}
              </Text>
            </View>
          }
        />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Üst bar
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  backBtn: {
    position: 'relative',
  },
  backBtnGrad: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 4,
  },
  backBtnHighlight: {
    position: 'absolute',
    top: 0,
    left: 4,
    right: 4,
    height: '40%',
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderRadius: 10,
  },
  backBtnText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Fredoka_700Bold',
  },
  backBtn3d: {
    position: 'absolute',
    bottom: -4,
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#7D3CBF',
    zIndex: -1,
  },
  titleWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  categoryIcon: {
    fontSize: 26,
  },
  categoryTitle: {
    fontSize: 22,
    fontFamily: 'Fredoka_700Bold',
    color: COLORS.darkText,
  },

  // Filtre
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 14,
    gap: 8,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  filterBtnActive: {
    backgroundColor: COLORS.ctaPrimary,
    borderColor: COLORS.ctaPrimary,
  },
  filterLabel: {
    fontSize: 12,
    fontFamily: 'Nunito_700Bold',
    color: COLORS.lightText,
  },
  filterLabelActive: {
    color: '#fff',
  },

  // Grid
  gridContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  // Hayvan kartı
  cardWrap: {
    width: CARD_WIDTH,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: SIZES.radiusXl,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    minHeight: 130,
    ...SHADOWS.card,
  },
  cardCompleted: {
    borderWidth: 2,
    borderColor: '#2ED573',
  },
  completedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#2ED573',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedBadgeText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
  },
  animalEmoji: {
    fontSize: 42,
    marginBottom: 6,
  },
  animalName: {
    fontSize: 12,
    fontFamily: 'Fredoka_700Bold',
    color: COLORS.darkText,
    textAlign: 'center',
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 1,
  },
  earnedStarsRow: {
    flexDirection: 'row',
    gap: 1,
    marginTop: 3,
  },

  // Boş durum
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 48,
  },
  emptyLabel: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: COLORS.lightText,
  },
});
