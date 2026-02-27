import { useRef, useCallback } from 'react';
import { Audio } from 'expo-av';

export function useSound(soundEnabled) {
  const bgMusicRef = useRef(null);

  const playPop = useCallback(async () => {
    if (!soundEnabled) return;
    try {
      const { sound } = await Audio.Sound.createAsync(
        // Placeholder: use a bundled asset when available
        { uri: 'https://actions.google.com/sounds/v1/cartoon/pop.ogg' },
        { shouldPlay: true, volume: 0.6 }
      );
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) sound.unloadAsync();
      });
    } catch (_) {}
  }, [soundEnabled]);

  const playComplete = useCallback(async () => {
    if (!soundEnabled) return;
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg' },
        { shouldPlay: true, volume: 0.8 }
      );
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) sound.unloadAsync();
      });
    } catch (_) {}
  }, [soundEnabled]);

  const stopBgMusic = useCallback(async () => {
    if (bgMusicRef.current) {
      await bgMusicRef.current.stopAsync();
      await bgMusicRef.current.unloadAsync();
      bgMusicRef.current = null;
    }
  }, []);

  return { playPop, playComplete, stopBgMusic };
}
