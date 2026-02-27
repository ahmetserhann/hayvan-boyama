import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStorage() {
  const save = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  };

  const load = async (key, defaultValue = null) => {
    try {
      const raw = await AsyncStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : defaultValue;
    } catch (e) {
      console.warn('Storage load error:', e);
      return defaultValue;
    }
  };

  const remove = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.warn('Storage remove error:', e);
    }
  };

  return { save, load, remove };
}
