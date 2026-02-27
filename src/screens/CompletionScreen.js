import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundGradient from '../components/BackgroundGradient';
import StarRating from '../components/StarRating';
import ConfettiAnimation from '../components/ConfettiAnimation';
import { useTranslation } from '../i18n/index';
import { COLORS } from '../theme/colors';
import { SIZES, SHADOWS } from '../theme/fonts';

export default function CompletionScreen({ navigation, route }) {
  const t = useTranslation();
  const { category, itemIndex = 0, name, stars = 3 } = route.params;

  const starMessage = stars === 3 ? t('completion.stars3') : stars === 2 ? t('completion.stars2') : t('completion.stars1');
  const nextIndex = itemIndex + 1 < category.items.length ? itemIndex + 1 : 0;
  const nextLabel = t(`completion.nextItem.${category.id}`) || t('completion.next');

  const handleRetry = () => {
    navigation.navigate('Coloring', {
      category,
      itemIndex,
      name,
    });
  };

  const handleNext = () => {
    navigation.navigate('Coloring', {
      category,
      itemIndex: nextIndex,
      name,
    });
  };

  const handleCategories = () => {
    navigation.navigate('Categories', { name });
  };

  return (
    <BackgroundGradient colors={COLORS.completionBg}>
      <ConfettiAnimation />
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          {/* Trophy */}
          <Text style={styles.trophy}>🏆</Text>

          {/* Title */}
          <Text style={styles.title}>
            {t('completion.title')}{name ? `, ${name}` : ''}!
          </Text>
          <Text style={styles.subtitle}>{t('completion.subtitle')}</Text>

          {/* Stars */}
          <StarRating stars={stars} />
          <Text style={styles.starMsg}>{starMessage}</Text>

          {/* Buttons */}
          <View style={styles.btnGroup}>
            <TouchableOpacity onPress={handleRetry} style={styles.btnWrapper} activeOpacity={0.85}>
              <LinearGradient colors={COLORS.retryButton} style={styles.btn}>
                <Text style={styles.btnText}>{t('completion.retry')}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNext} style={styles.btnWrapper} activeOpacity={0.85}>
              <LinearGradient colors={COLORS.nextButton} style={styles.btn}>
                <Text style={styles.btnText}>{nextLabel}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCategories} style={styles.btnWrapper} activeOpacity={0.85}>
              <LinearGradient colors={COLORS.playButton} style={styles.btn}>
                <Text style={styles.btnText}>{t('completion.categories')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.xl,
  },
  trophy: {
    fontSize: 80,
    marginBottom: SIZES.md,
  },
  title: {
    fontSize: SIZES.fontXl,
    fontWeight: '900',
    color: COLORS.darkText,
    textAlign: 'center',
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: SIZES.fontMd,
    color: COLORS.darkText,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: SIZES.sm,
  },
  starMsg: {
    fontSize: SIZES.fontLg,
    fontWeight: '700',
    color: COLORS.darkText,
    textAlign: 'center',
    marginBottom: SIZES.xl,
  },
  btnGroup: {
    width: '100%',
    gap: SIZES.md,
  },
  btnWrapper: {
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.md,
  },
  btn: {
    height: SIZES.btnHeight,
    borderRadius: SIZES.radiusLg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: SIZES.fontMd,
    fontWeight: '900',
    color: COLORS.white,
  },
});
