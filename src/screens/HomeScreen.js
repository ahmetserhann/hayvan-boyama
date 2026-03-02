// HomeScreen - Ana Menü / Kategori Seçim Ekranı
// - "Hello, [Name]!" başlığı
// - 2 sütun kategori grid kartları
// - Her kart: isim, hayvan görselleri, ilerleme çubuğu, % göstergesi
// - Kilitli kartlar: gri overlay + kilit ikonu
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
import { GradientBackground, ProgressBar } from '../components/common';
import { useTranslation } from '../i18n/index';
import useAppStore from '../store/useAppStore';
import { CATEGORIES_V2 } from '../data/categoriesData';

const { width: SW } = Dimensions.get('window');
const CARD_WIDTH = (SW - 48) / 2;

function CategoryCard({ category, onPress, completedAnimals }) {
  const t = useTranslation();

  const total = category.animals.length;
  const completedCount = category.animals.filter((a) => completedAnimals[a.id]).length;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  const progress = total > 0 ? completedCount / total : 0;
  const isLocked = category.locked;

  return (
    <TouchableOpacity
      style={styles.cardWrap}
      onPress={() => !isLocked && onPress(category)}
      activeOpacity={isLocked ? 1 : 0.85}
    >
      <View style={styles.card}>
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

        {/* İlerleme çubuğu */}
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

export default function HomeScreen({ navigation }) {
  const t = useTranslation();
  const userName       = useAppStore((s) => s.userName);
  const selectedAnimal = useAppStore((s) => s.selectedAnimal);
  const completedAnimals = useAppStore((s) => s.completedAnimals);
  const insets = useSafeAreaInsets();

  const displayName   = userName || t('name_placeholder');
  const avatarEmoji   = selectedAnimal?.emoji || '🐾';

  const handleCategoryPress = useCallback((category) => {
    navigation.navigate('Category', { categoryId: category.id });
  }, [navigation]);

  const renderItem = useCallback(({ item }) => (
    <CategoryCard
      category={item}
      onPress={handleCategoryPress}
      completedAnimals={completedAnimals}
    />
  ), [handleCategoryPress, completedAnimals]);

  return (
    <GradientBackground colors={COLORS.mainBg}>
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>

        {/* Üst bar: geri butonu + profil chip */}
        <View style={styles.headerRow}>

          {/* Yuvarlak geri butonu → WelcomeScreen */}
          <TouchableOpacity
            style={styles.circleBack}
            onPress={() => navigation.navigate('Welcome')}
            activeOpacity={0.85}
          >
            <View style={styles.circleBack3d} />
            <LinearGradient
              colors={['#C47DF5', '#A55EEA']}
              style={styles.circleBackGrad}
            >
              <View style={styles.circleBackHighlight} />
              <Text style={styles.circleBackArrow}>←</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Profil chip */}
          <TouchableOpacity
            style={styles.profileChip}
            onPress={() => navigation.navigate('Welcome')}
            activeOpacity={0.85}
          >
            <LinearGradient colors={['#FFE5CC', '#E8D5F5']} style={styles.avatarCircle}>
              <Text style={styles.avatarEmoji}>{avatarEmoji}</Text>
            </LinearGradient>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{displayName}</Text>
              <Text style={styles.profileSub}>{t('my_profile') || 'Profilim'}</Text>
            </View>
            <View style={styles.editDot}>
              <Text style={styles.editIcon}>✏️</Text>
            </View>
          </TouchableOpacity>

        </View>

        {/* Kategori grid */}
        <FlatList
          data={[...CATEGORIES_V2].sort((a, b) => (a.locked ? 1 : 0) - (b.locked ? 1 : 0))}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
        />

      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Üst bar: geri + profil yan yana
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 18,
    gap: 10,
  },

  // Yuvarlak geri butonu
  circleBack: {
    position: 'relative',
    width: 48,
    height: 48,
  },
  circleBack3d: {
    position: 'absolute',
    bottom: -4,
    left: 0,
    right: 0,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7D3CBF',
    zIndex: 0,
  },
  circleBackGrad: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 4,
    zIndex: 1,
  },
  circleBackHighlight: {
    position: 'absolute',
    top: 2,
    left: 6,
    right: 6,
    height: '40%',
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderRadius: 20,
  },
  circleBackArrow: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Fredoka_700Bold',
    marginTop: -1,
  },

  // Profil chip (flex: 1 ile geri butonu yanında uzanır)
  profileChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 10,
    shadowColor: '#A55EEA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.85)',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  avatarEmoji: {
    fontSize: 26,
  },
  profileInfo: {
    flex: 1,
    gap: 1,
  },
  profileName: {
    fontSize: 17,
    fontFamily: 'Fredoka_700Bold',
    color: COLORS.darkText,
  },
  profileSub: {
    fontSize: 11,
    fontFamily: 'Nunito_400Regular',
    color: COLORS.lightText,
  },
  editDot: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,71,87,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,71,87,0.20)',
  },
  editIcon: {
    fontSize: 15,
  },
  gridContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
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
  categoryName: {
    fontSize: 13,
    fontFamily: 'Fredoka_700Bold',
    color: COLORS.darkText,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
  },
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
