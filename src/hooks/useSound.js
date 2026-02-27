import { useRef, useCallback } from 'react';
import { Audio } from 'expo-av';
import { Vibration } from 'react-native';

// Ses URI'leri - ağ erişimi yoksa sessizce devam eder
const SOUND_URIS = {
  click:    'https://actions.google.com/sounds/v1/ui/ui_tap_01.ogg',
  pop:      'https://actions.google.com/sounds/v1/cartoon/pop.ogg',
  complete: 'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg',
  star:     'https://actions.google.com/sounds/v1/cartoon/woodpecker.ogg',
};

export function useSound(soundEnabled) {
  const modeSetRef = useRef(false);

  // Audio oturumunu ilk kullanımda kur
  const setupAudio = useCallback(async () => {
    if (modeSetRef.current) return;
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });
      modeSetRef.current = true;
    } catch (_) {}
  }, []);

  // Genel ses çalma (hata olursa sessizce geçer)
  const playUri = useCallback(async (uri, volume = 0.7) => {
    try {
      await setupAudio();
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true, volume },
      );
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) sound.unloadAsync();
      });
    } catch (_) {}
  }, [setupAudio]);

  // Buton tıklama sesi
  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    Vibration.vibrate(8);
    playUri(SOUND_URIS.click, 0.5);
  }, [soundEnabled, playUri]);

  // Renk dolum sesi (bölge boyandığında)
  const playPop = useCallback(() => {
    if (!soundEnabled) return;
    Vibration.vibrate(12);
    playUri(SOUND_URIS.pop, 0.65);
  }, [soundEnabled, playUri]);

  // Tamamlama sesi (tüm bölgeler boyandığında)
  const playComplete = useCallback(() => {
    if (!soundEnabled) return;
    Vibration.vibrate([0, 60, 80, 60, 120, 200]);
    playUri(SOUND_URIS.complete, 0.85);
  }, [soundEnabled, playUri]);

  // Yıldız açılma sesi
  const playStar = useCallback(() => {
    if (!soundEnabled) return;
    Vibration.vibrate(20);
    playUri(SOUND_URIS.star, 0.5);
  }, [soundEnabled, playUri]);

  return { playClick, playPop, playComplete, playStar };
}
