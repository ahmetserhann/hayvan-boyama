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
  dailyStreak: 0,         // Günlük görev serisi
  lastDailyClaimDate: null,
  claimedDates: [],       // ['YYYY-MM-DD', ...] — tüm zamanlar claim edilen günler

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

  // Günlük ödülü claim et
  claimDailyReward: () => {
    const today = new Date().toISOString().split('T')[0];
    const current = get().claimedDates;
    if (current.includes(today)) return; // Bugün zaten alındı

    // Streak hesapla
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const prevStreak = get().dailyStreak;
    const newStreak = current.includes(yesterdayStr) ? prevStreak + 1 : 1;

    const updated = [...current, today];
    set({ claimedDates: updated, lastDailyClaimDate: today, dailyStreak: newStreak });
    AsyncStorage.setItem('claimedDates', JSON.stringify(updated)).catch(() => {});
    AsyncStorage.setItem('dailyStreak', String(newStreak)).catch(() => {});

    // Ödül: 25 coin + streak bonusu
    const bonus = newStreak >= 7 ? 50 : 0;
    get().addCoins(25 + bonus);
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
        claimedRaw,
        streakRaw,
      ] = await Promise.all([
        AsyncStorage.getItem('completedAnimals'),
        AsyncStorage.getItem('soundEnabled'),
        AsyncStorage.getItem('language'),
        AsyncStorage.getItem('userName'),
        AsyncStorage.getItem('coins'),
        AsyncStorage.getItem('claimedDates'),
        AsyncStorage.getItem('dailyStreak'),
      ]);

      const updates = {};
      if (completedRaw) updates.completedAnimals = JSON.parse(completedRaw);
      if (soundRaw !== null) updates.soundEnabled = JSON.parse(soundRaw);
      if (langRaw) updates.language = langRaw;
      if (nameRaw) updates.userName = nameRaw;
      if (coinsRaw) updates.coins = parseInt(coinsRaw, 10) || 0;
      if (claimedRaw) updates.claimedDates = JSON.parse(claimedRaw);
      if (streakRaw) updates.dailyStreak = parseInt(streakRaw, 10) || 0;

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
