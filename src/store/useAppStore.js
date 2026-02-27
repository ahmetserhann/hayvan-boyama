import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// GDD - Uygulama global state yönetimi (Zustand)
const useAppStore = create((set, get) => ({
  // Kullanıcı bilgileri
  userName: '',
  selectedAnimal: null,   // Hoş geldin ekranında seçilen favori hayvan emoji

  // Ayarlar
  soundEnabled: true,
  language: 'tr',         // 'tr' | 'en'
  glowEnabled: true,

  // İlerleme
  completedAnimals: {},   // { animalId: { stars: 3, coloredAt: timestamp, colors: {} } }
  categoryProgress: {},   // { categoryId: { completed: 5, total: 12 } }
  coins: 0,               // Altın para (Faz 1.5)
  dailyStreak: 0,         // Günlük görev serisi (Faz 1.5)
  lastDailyClaimDate: null,

  // Güncel boyama oturumu
  currentAnimal: null,
  currentCategory: null,

  // Sticker koleksiyonu (Faz 2)
  unlockedStickers: [],

  // --- ACTIONS ---

  setUserName: (name) => set({ userName: name }),
  setSelectedAnimal: (animal) => set({ selectedAnimal: animal }),
  setSoundEnabled: (val) => {
    set({ soundEnabled: val });
    AsyncStorage.setItem('soundEnabled', JSON.stringify(val)).catch(() => {});
  },
  setLanguage: (lang) => {
    set({ language: lang });
    AsyncStorage.setItem('language', lang).catch(() => {});
  },
  setGlowEnabled: (val) => set({ glowEnabled: val }),

  setCurrentAnimal: (animal) => set({ currentAnimal: animal }),
  setCurrentCategory: (category) => set({ currentCategory: category }),

  // Hayvan tamamlandığında çağrılır
  completeAnimal: (animalId, stars, colors) => {
    const prev = get().completedAnimals;
    const prevEntry = prev[animalId];

    // En yüksek yıldız sayısını koru
    const bestStars = prevEntry ? Math.max(prevEntry.stars, stars) : stars;

    const updated = {
      ...prev,
      [animalId]: {
        stars: bestStars,
        coloredAt: Date.now(),
        colors: colors || {},
      },
    };
    set({ completedAnimals: updated });
    AsyncStorage.setItem('completedAnimals', JSON.stringify(updated)).catch(() => {});

    // Coin ekle (yıldıza göre)
    const coinReward = stars * 50;
    get().addCoins(coinReward);
  },

  addCoins: (amount) => {
    const newCoins = get().coins + amount;
    set({ coins: newCoins });
    AsyncStorage.setItem('coins', String(newCoins)).catch(() => {});
  },

  // Kategori ilerleme hesaplama
  getCategoryProgress: (categoryId, animals) => {
    const completed = get().completedAnimals;
    const completedCount = animals.filter((a) => completed[a.id]).length;
    return { completed: completedCount, total: animals.length };
  },

  isAnimalCompleted: (animalId) => {
    return !!get().completedAnimals[animalId];
  },

  getAnimalStars: (animalId) => {
    return get().completedAnimals[animalId]?.stars || 0;
  },

  // AsyncStorage'dan yükle
  loadState: async () => {
    try {
      const [
        completedRaw,
        soundRaw,
        langRaw,
        nameRaw,
        coinsRaw,
      ] = await Promise.all([
        AsyncStorage.getItem('completedAnimals'),
        AsyncStorage.getItem('soundEnabled'),
        AsyncStorage.getItem('language'),
        AsyncStorage.getItem('userName'),
        AsyncStorage.getItem('coins'),
      ]);

      const updates = {};
      if (completedRaw) updates.completedAnimals = JSON.parse(completedRaw);
      if (soundRaw !== null) updates.soundEnabled = JSON.parse(soundRaw);
      if (langRaw) updates.language = langRaw;
      if (nameRaw) updates.userName = nameRaw;
      if (coinsRaw) updates.coins = parseInt(coinsRaw, 10) || 0;

      set(updates);
    } catch (e) {
      // Hata sessizce geçilir
    }
  },

  saveUserName: async (name) => {
    set({ userName: name });
    await AsyncStorage.setItem('userName', name).catch(() => {});
  },
}));

export default useAppStore;
