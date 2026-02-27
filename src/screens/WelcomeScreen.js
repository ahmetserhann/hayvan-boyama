import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundGradient from '../components/BackgroundGradient';
import SoundToggle from '../components/SoundToggle';
import LanguageToggle from '../components/LanguageToggle';
import { useTranslation } from '../i18n/index';
import { COLORS } from '../theme/colors';
import { SIZES, SHADOWS } from '../theme/fonts';

const EMOJIS = ['🐱', '🐶', '🐭', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷'];

export default function WelcomeScreen({ navigation, soundEnabled, setSoundEnabled }) {
  const t = useTranslation();
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const emojiScrollOffset = useRef(new Animated.Value(0)).current;
  const selectedEmojiScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(emojiScrollOffset, {
          toValue: -Dimensions.get('window').width * 0.5,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(emojiScrollOffset, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    // Pulse effect
    selectedEmojiScale.setValue(1);
    Animated.sequence([
      Animated.timing(selectedEmojiScale, { toValue: 1.3, duration: 200, useNativeDriver: true }),
      Animated.timing(selectedEmojiScale, { toValue: 0.9, duration: 200, useNativeDriver: true }),
      Animated.timing(selectedEmojiScale, { toValue: 1.2, duration: 200, useNativeDriver: true }),
      Animated.timing(selectedEmojiScale, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const handlePlay = () => {
    const childName = name.trim() || 'Arkadaş';
    const emoji = selectedEmoji || '🐱'; // Default emoji if none selected
    navigation.navigate('Demo', { name: childName, emoji });
  };

  return (
    <BackgroundGradient colors={COLORS.welcomeBg}>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}
        >
          <View style={styles.container}>
            {/* Top controls */}
            <View style={styles.topRow}>
              <View style={styles.flex} />
              <SoundToggle enabled={soundEnabled} onToggle={() => setSoundEnabled((v) => !v)} />
              <View style={styles.gap} />
              <LanguageToggle />
            </View>

            {/* Title - centered in middle */}
            <View style={styles.centerSection}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{t('welcome.title')}</Text>
                <Text style={styles.subtitle}>{t('welcome.subtitle')}</Text>
              </View>
            </View>

            {/* Bottom content */}
            <View style={styles.bottomSection}>
              {/* Name input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={t('welcome.namePlaceholder')}
                  placeholderTextColor={COLORS.lightText}
                  value={name}
                  onChangeText={setName}
                  maxLength={20}
                />
              </View>

              {/* Emoji selector - animated slider */}
              <View style={styles.emojiContainer}>
                <Animated.View style={[{ transform: [{ translateX: emojiScrollOffset }] }]}>
                  <FlatList
                    data={EMOJIS}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    contentContainerStyle={styles.emojiList}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handleEmojiSelect(item)}
                        style={[styles.emojiBtn, selectedEmoji === item && styles.emojiBtnSelected]}
                        activeOpacity={0.8}
                      >
                        {selectedEmoji === item ? (
                          <Animated.Text style={[styles.emoji, { transform: [{ scale: selectedEmojiScale }] }]}>
                            {item}
                          </Animated.Text>
                        ) : (
                          <Text style={styles.emoji}>{item}</Text>
                        )}
                      </TouchableOpacity>
                    )}
                  />
                </Animated.View>
              </View>

              {/* Play button */}
              <TouchableOpacity onPress={handlePlay} activeOpacity={0.85} style={styles.playBtnWrapper}>
                <LinearGradient
                  colors={COLORS.playButton}
                  style={styles.playBtn}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.playBtnText}>{t('welcome.playButton')}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  container: { flex: 1, justifyContent: 'space-between' },
  gap: { width: SIZES.xs },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingTop: SIZES.sm,
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  bottomSection: {
    paddingBottom: SIZES.lg,
  },
  title: {
    fontSize: SIZES.fontXxl,
    fontWeight: '900',
    color: COLORS.darkText,
    textAlign: 'center',
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: SIZES.fontMd,
    color: COLORS.darkText,
    marginTop: SIZES.xs,
    textAlign: 'center',
    opacity: 0.7,
  },
  inputContainer: {
    marginHorizontal: SIZES.xl,
    marginBottom: SIZES.md,
    ...SHADOWS.sm,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: SIZES.radiusLg,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    fontSize: SIZES.fontLg,
    color: COLORS.darkText,
    textAlign: 'center',
    fontWeight: '600',
  },
  emojiList: {
    paddingHorizontal: SIZES.md,
    marginTop: SIZES.sm,
    gap: SIZES.sm,
    justifyContent: 'center',
  },
  emojiContainer: {
    overflow: 'hidden',
    marginTop: SIZES.sm,
  },
  emojiBtn: {
    width: 58,
    height: 58,
    borderRadius: SIZES.radiusFull,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.sm,
  },
  emojiBtnSelected: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderWidth: 3,
    borderColor: COLORS.pastelPink,
    transform: [{ scale: 1.15 }],
  },
  emoji: {
    fontSize: 30,
  },
  playBtnWrapper: {
    marginHorizontal: SIZES.xl,
    marginTop: SIZES.md,
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.lg,
  },
  playBtn: {
    height: SIZES.btnHeight,
    borderRadius: SIZES.radiusLg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtnText: {
    fontSize: SIZES.fontLg,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 1,
  },
});
