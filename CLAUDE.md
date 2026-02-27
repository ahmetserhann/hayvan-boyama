# Hayvan Boyama - Proje Rehberi

Çocuklara yönelik hayvan boyama oyunu. React Native + Expo ile yapılmış.

## Hızlı Başlangıç

```bash
npm start        # Expo Dev Server (QR kodu ile telefonda aç)
npm run android  # Android emülatör
npm run web      # Web tarayıcı
```

## Proje Yapısı

```
src/
├── screens/         # Ekranlar (Splash, Welcome, Categories, Coloring, Completion)
├── components/
│   └── common/      # GradientBackground, GlossyButton, StarRating, ProgressBar, NavBar, ConfettiAnimation
├── data/
│   ├── categoriesData.js    # 6 kategori (CATEGORIES_V2)
│   └── animals/             # seaWorld, farmAnimals, forestFriends, jungleExplorers, dinoAdventure, birdsInsects
├── hooks/
│   ├── useSound.js          # expo-av + Vibration (playClick, playPop, playComplete, playStar)
│   └── useStorage.js
├── store/useAppStore.js     # Zustand (userName, soundEnabled, language, completedAnimals, coins)
├── i18n/                    # tr.js, en.js, index.js (LanguageProvider)
├── navigation/AppNavigator.js
└── theme/                   # colors.js, fonts.js, styles.js
```

## Ekran Akışı

`Splash (2.6s) → Welcome → Categories → Coloring → Completion → (Next/Replay/Home)`

## GDD v2.0 Tamamlanan Adımlar

| Adım | Konu | Durum |
|------|------|-------|
| 1 | Proje yapısı + Zustand store + i18n + tema | ✅ |
| 2 | Ortak bileşenler (GlossyButton, GradientBackground, vb.) | ✅ |
| 3 | Splash ekranı (yukleme.png) | ✅ |
| 4 | Hoş Geldin ekranı (hosgeldin.png) | ✅ |
| 5 | Kategoriler ekranı (anamenu.png) | ✅ |
| 6 | Boyama ekranı (boyamaekrani.png) | ✅ |
| 7 | Kutlama ekranı (kutlama.png) | ✅ |
| 8 | Ses sistemi (expo-av + Vibration) | ✅ |
| 9 | Dil desteği ince ayarı | ✅ |
| 10 | Test ve hata düzeltme | ✅ |

## Önemli Kurallar

- `react-native-gesture-handler` importu App.js'de **ilk satırda** olmalı
- Tüm butonlar **glossy/3D efektli** (GlossyButton bileşeni kullanılmalı)
- Arka planlar her zaman **GradientBackground** + bulut + parıltı
- SVG hayvanlar **boş başlamalı** (fill: #FAFAFA, stroke: #2D3436)
- Dil: Zustand store → LanguageProvider → `useTranslation()` hook
- Ses: `useSound(soundEnabled)` hook ile kullanılır

## Renk Paleti (Özet)

| Kullanım | Renk |
|----------|------|
| PLAY butonu | `#FF4757` (kırmızı) |
| Next/Success | `#2ED573` (yeşil) |
| Replay | `#45AAF2` (mavi) |
| Geri/Undo | `#A55EEA` (mor) |
| Yıldız/Coin | `#FFC312` (altın) |
| Arka plan | `#B8E4FF → #E8D5F5 → #FFE5CC` |

## SVG Hayvan Formatı

```javascript
{
  id: 'fish',
  nameKey: 'animals.fish',
  emoji: '🐠',
  difficulty: 3,
  regions: [
    { id: 'body', path: '...', defaultColor: '#FF9F43', label: 'gövde' },
    // ...
  ]
}
```

## Kategoriler

| ID | Ad | Kilitli |
|----|----|---------|
| `sea_world` | Deniz Dünyası | Hayır |
| `farm_animals` | Çiftlik Hayvanları | Hayır |
| `forest_friends` | Orman Dostları | Hayır |
| `jungle_explorers` | Orman Keşifçileri | Evet |
| `dino_adventure` | Dino Serüveni | Evet |
| `birds_insects` | Kuşlar ve Böcekler | Evet |

## Zustand Store (useAppStore)

```javascript
// Okuma
const userName = useAppStore((s) => s.userName);
const soundEnabled = useAppStore((s) => s.soundEnabled);
const language = useAppStore((s) => s.language);
const completedAnimals = useAppStore((s) => s.completedAnimals);

// Eylemler
saveUserName(name), setSoundEnabled(bool), setLanguage('tr'|'en'),
completeAnimal(id, stars, colors), addCoins(amount)
```

## Navigasyon Parametreleri

```javascript
// Coloring ekranına giderken
navigation.navigate('Coloring', { categoryId: 'sea_world', animalIndex: 0 });

// Completion ekranına giderken
navigation.navigate('Completion', { animalId, categoryId, animalIndex, stars, regionColors });
```

## Bağımlılıklar (Önemli)

- `react-native-svg` - SVG hayvan çizimi
- `expo-av` - Ses sistemi
- `expo-linear-gradient` - Glossy butonlar ve arka planlar
- `@expo-google-fonts/fredoka` + `@expo-google-fonts/nunito` - Fontlar
- `react-native-reanimated ~4.1.1` - Animasyonlar
- `zustand ^5.0.11` - Global state
- `@react-navigation/stack ^7` - Navigasyon

## Sık Kullanılan Dosyalar

- Renk eklemek için: `src/theme/colors.js`
- Çeviri eklemek için: `src/i18n/tr.js` ve `src/i18n/en.js`
- Yeni hayvan eklemek için: `src/data/animals/` altında ilgili dosya
- Yeni kategori eklemek için: `src/data/categoriesData.js`
