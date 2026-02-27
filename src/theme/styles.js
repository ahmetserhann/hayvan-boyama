// GDD Section 5.3-5.5 - Ortak Stiller
import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { SIZES, SHADOWS } from './fonts';

export const commonStyles = StyleSheet.create({
  // Tam ekran kapsayıcı
  flex1: {
    flex: 1,
  },

  // Ortalama kapsayıcı
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // GDD Section 5.4 - Kart stili
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.radiusXl,
    ...SHADOWS.card,
  },

  // GDD Section 5.3 - Glossy Büyük CTA Buton (Next, Collect, Play)
  btnLarge: {
    height: SIZES.btnHeightLg,
    borderRadius: SIZES.radiusFull,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.glossy,
  },

  // GDD Section 5.3 - Glossy Orta Buton (Replay, Continue)
  btnMedium: {
    height: SIZES.btnHeightMd,
    borderRadius: SIZES.radiusFull,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },

  // GDD Section 5.3 - Küçük Buton (Home)
  btnSmall: {
    height: SIZES.btnHeightSm,
    borderRadius: SIZES.radiusFull,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },

  // GDD Section 5.3 - Araç Butonu (Pen, Eraser, Bucket, vb.)
  toolBtn: {
    width: SIZES.toolBtnSize,
    height: SIZES.toolBtnSize,
    borderRadius: SIZES.radiusMd,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.glossy,
  },

  // GDD Section 5.3 - İkon Butonu (ses, ayar, dil)
  iconBtn: {
    width: SIZES.iconBtnSize,
    height: SIZES.iconBtnSize,
    borderRadius: SIZES.radiusMd,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },

  // Buton iç yazı (glossy üst highlight şeridi için)
  btnGlossyInner: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: '45%',
    borderTopLeftRadius: SIZES.radiusFull,
    borderTopRightRadius: SIZES.radiusFull,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },

  // Alt navigasyon barı (GDD Section 4.3)
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.navBarBg,
    borderRadius: SIZES.radiusXl,
    paddingVertical: SIZES.md,
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
    ...SHADOWS.md,
  },

  // İlerleme çubuğu kapsayıcı
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: SIZES.radiusFull,
    overflow: 'hidden',
  },

  // İlerleme dolgusu
  progressBarFill: {
    height: '100%',
    borderRadius: SIZES.radiusFull,
  },

  // Yıldız satırı
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SIZES.sm,
  },

  // Metin stilleri
  titleText: {
    fontSize: SIZES.fontXxl,
    fontFamily: 'Fredoka_700Bold',
    color: COLORS.darkText,
  },

  subtitleText: {
    fontSize: SIZES.fontLg,
    fontFamily: 'Fredoka_600SemiBold',
    color: COLORS.darkText,
  },

  bodyText: {
    fontSize: SIZES.fontMd,
    fontFamily: 'Nunito_400Regular',
    color: COLORS.darkText,
  },

  boldText: {
    fontSize: SIZES.fontMd,
    fontFamily: 'Nunito_700Bold',
    color: COLORS.darkText,
  },

  btnText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: SIZES.fontLg,
    color: COLORS.white,
    letterSpacing: 0.5,
  },

  btnTextLg: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: SIZES.fontXl,
    color: COLORS.white,
    letterSpacing: 1,
  },
});
