// GDD Section 5.2 - Tipografi
export const FONTS = {
  // Font ailesi isimleri (expo-font ile yüklenir)
  title: 'Fredoka_700Bold',         // Ana başlıklar (ANIMAL COLORING, kategori adları)
  titleSemi: 'Fredoka_600SemiBold', // Alt başlıklar
  body: 'Nunito_700Bold',           // Buton yazıları
  bodyMedium: 'Nunito_600SemiBold', // Orta ağırlık
  bodyRegular: 'Nunito_400Regular', // Normal metin
  bodyLight: 'Nunito_300Light',     // Açıklama metinleri
};

// GDD Section 5.2 - Font Boyutları
export const SIZES = {
  // Font boyutları
  fontXs: 11,
  fontSm: 13,
  fontMd: 16,
  fontLg: 20,
  fontXl: 26,
  fontXxl: 36,
  fontTitle: 48,

  // Border radius (GDD Section 5.3)
  radiusSm: 12,
  radiusMd: 16,
  radiusLg: 20,
  radiusXl: 24,
  radiusFull: 100,

  // Spacing
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,

  // Buton boyutları (GDD Section 5.3)
  btnHeightLg: 60,        // Büyük CTA butonu (Next, Collect, Claim)
  btnHeightMd: 52,        // Orta buton (Replay, Continue)
  btnHeightSm: 44,        // Küçük buton (Home)
  btnWidthLg: 280,        // Büyük buton genişliği
  toolBtnSize: 56,        // Araç butonu kare boyutu (Pen, Eraser, vb.)
  iconBtnSize: 44,        // Küçük ikon buton (ses, ayarlar)

  // Dokunma alanı minimumu
  minTouchTarget: 48,

  // Renk paleti dairesi
  paletteCircle: 40,
  paletteCircleSelected: 48,
};

// GDD Section 5.4 - Gölge Stilleri
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  glossy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
};
