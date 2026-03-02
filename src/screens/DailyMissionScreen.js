// DailyMissionScreen — Günlük Görev Popup
// transparentModal olarak açılır → altta HomeScreen görünür
// Al → ödül alınır + goBack()
// Sonra → sadece goBack() (aynı gün tekrar açılabilir)

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from '../i18n/index';
import useAppStore from '../store/useAppStore';

const { width: SW, height: SH } = Dimensions.get('window');
const POPUP_W = SW - 48;
const CELL_SIZE = (POPUP_W - 48 - 24) / 4; // 4 sütun, gap 8

// ─── Tarih yardımcıları ────────────────────────────────────────────────────
function toDateStr(date = new Date()) {
  return date.toISOString().split('T')[0];
}

function getWeekDays() {
  const today = new Date();
  const dow = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dow + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return toDateStr(d);
  });
}

function getDayNumber() {
  const dow = new Date().getDay();
  return dow === 0 ? 7 : dow;
}

function getDayStatus(dateStr, todayStr, claimedDates) {
  if (dateStr > todayStr) return 'locked';
  if (claimedDates.includes(dateStr)) return 'claimed';
  if (dateStr === todayStr) return 'today';
  return 'missed';
}

// ─── Gün hücresi ──────────────────────────────────────────────────────────
function DayCell({ index, status }) {
  const isToday   = status === 'today';
  const isClaimed = status === 'claimed';
  const isLocked  = status === 'locked';
  const isMissed  = status === 'missed';
  const isDim     = isLocked || isMissed;

  return (
    <View style={[
      styles.dayCell,
      isToday   && styles.dayCellToday,
      isClaimed && styles.dayCellClaimed,
    ]}>
      <Text style={[styles.dayCellLabel, isDim && styles.dimText]}>
        Gün {index + 1}
      </Text>
      <Text style={[styles.dayCellEmoji, isDim && { opacity: 0.3 }]}>🎨</Text>
      <Text style={[
        styles.dayCellStatus,
        isClaimed && { color: '#00B894' },
        isToday   && { color: '#E17055' },
        isDim     && { color: '#B2BEC3' },
      ]}>
        {isClaimed ? 'Alındı'
         : isToday   ? 'Bugün!'
         : isMissed  ? 'Kaçırıldı'
         :              'Kilitli'}
      </Text>

      {isClaimed && (
        <View style={styles.claimedOverlay}>
          <View style={styles.claimedCircle}>
            <Text style={styles.claimedCheck}>✓</Text>
          </View>
        </View>
      )}
      {isLocked && (
        <View style={styles.lockOverlay}>
          <Text style={styles.lockEmoji}>🔒</Text>
        </View>
      )}
    </View>
  );
}

// ─── Ana popup ekranı ─────────────────────────────────────────────────────
export default function DailyMissionScreen({ navigation }) {
  const t = useTranslation();
  const insets = useSafeAreaInsets();

  const claimedDates     = useAppStore((s) => s.claimedDates);
  const claimDailyReward = useAppStore((s) => s.claimDailyReward);
  const dailyStreak      = useAppStore((s) => s.dailyStreak);

  const todayStr   = toDateStr();
  const weekDays   = getWeekDays();
  const dayNumber  = getDayNumber();
  const alreadyClaimed = claimedDates.includes(todayStr);
  const weekClaimed    = weekDays.filter(d => claimedDates.includes(d)).length;
  const weekProgress   = weekClaimed / 7;

  // ── Animasyonlar ─────────────────────────────────────────────────────────
  const popupScale   = useRef(new Animated.Value(0.82)).current;
  const popupOpacity = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const bearY        = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Popup giriş
    Animated.parallel([
      Animated.spring(popupScale, { toValue: 1, friction: 6, tension: 60, useNativeDriver: true }),
      Animated.timing(popupOpacity,    { toValue: 1, duration: 220, useNativeDriver: true }),
      Animated.timing(backdropOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();

    // Ayı zıplama
    Animated.loop(
      Animated.sequence([
        Animated.timing(bearY, { toValue: -10, duration: 450, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(bearY, { toValue: 0,   duration: 380, easing: Easing.in(Easing.quad),  useNativeDriver: true }),
        Animated.delay(1000),
      ])
    ).start();
  }, []);

  const dismiss = () => navigation.goBack();

  const handleClaim = () => {
    if (!alreadyClaimed) claimDailyReward();
    dismiss();
  };

  // 7 hücre + 1 boş → 4+3+1=8 düzeni (son satır hizalaması)
  const cells = weekDays.map((dateStr, i) => ({ dateStr, status: getDayStatus(dateStr, todayStr, claimedDates), index: i }));

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" />

      {/* Karartma */}
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />

      {/* Popup */}
      <Animated.View style={[
        styles.popupWrap,
        { transform: [{ scale: popupScale }], opacity: popupOpacity },
      ]}>
        <LinearGradient colors={['#FFF8E7', '#FFE9A0']} style={styles.popup}>

          {/* ── Başlık şeridi ─────────────────────────────────────────── */}
          <View style={styles.ribbonWrap}>
            <LinearGradient
              colors={['#FF6B9D', '#FF4757']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.ribbon}
            >
              <Text style={styles.ribbonText}>
                🌟  {t('daily_title') || 'Günlük Görev'}  🌟
              </Text>
            </LinearGradient>
          </View>

          {/* ── Gün X rozeti ──────────────────────────────────────────── */}
          <View style={styles.dayBadgeRow}>
            <LinearGradient
              colors={['#FDCB6E', '#E17055']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.dayBadge}
            >
              <Text style={styles.dayBadgeText}>
                {t('day_x')?.replace('{x}', dayNumber) || `Gün ${dayNumber}`}
              </Text>
            </LinearGradient>
            {dailyStreak > 1 && (
              <View style={styles.streakPill}>
                <Text style={styles.streakText}>🔥 {dailyStreak} seri</Text>
              </View>
            )}
          </View>

          {/* ── 7 günlük grid ─────────────────────────────────────────── */}
          <View style={styles.grid}>
            {cells.map((c) => (
              <DayCell key={c.dateStr} index={c.index} status={c.status} />
            ))}
            {/* Boş hücre — son satır hizalaması */}
            <View style={[styles.dayCell, { opacity: 0 }]} />
          </View>

          {/* ── Haftalık ilerleme ─────────────────────────────────────── */}
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>
              {t('weekly_completion') || 'Haftalık İlerleme'}
            </Text>
            <View style={styles.progressTrack}>
              <LinearGradient
                colors={['#FF6B9D', '#FF4757']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${Math.round(weekProgress * 100)}%` }]}
              />
            </View>
            <Text style={styles.progressCount}>{weekClaimed}/7</Text>
          </View>

          {/* ── Butonlar ──────────────────────────────────────────────── */}
          <View style={styles.btnRow}>
            {/* Claim */}
            <TouchableOpacity
              style={[styles.claimBtn, alreadyClaimed && { opacity: 0.6 }]}
              onPress={handleClaim}
              activeOpacity={0.85}
            >
              <View style={styles.claimShadow} />
              <LinearGradient
                colors={alreadyClaimed ? ['#B2BEC3', '#95A5A6'] : ['#2ED573', '#1E9F53']}
                style={styles.claimGrad}
              >
                <View style={styles.btnHighlight} />
                <Text style={styles.claimText}>
                  {alreadyClaimed ? (t('claimed') || 'Alındı') : (t('claim') || 'Al')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Later */}
            <TouchableOpacity style={styles.laterBtn} onPress={dismiss} activeOpacity={0.85}>
              <View style={styles.laterShadow} />
              <LinearGradient colors={['#45AAF2', '#2980B9']} style={styles.laterGrad}>
                <View style={styles.btnHighlight} />
                <Text style={styles.laterText}>{t('later') || 'Sonra'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </LinearGradient>

        {/* Ayı maskotu */}
        <Animated.View style={[styles.bear, { transform: [{ translateY: bearY }] }]}>
          <Text style={styles.bearEmoji}>🐻</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

// ─── Stiller ──────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },

  // ── Popup kart ───────────────────────────────────────────────────────────
  popupWrap: {
    width: POPUP_W,
    position: 'relative',
  },
  popup: {
    borderRadius: 28,
    padding: 16,
    borderWidth: 2.5,
    borderColor: 'rgba(253,203,110,0.7)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 20,
  },

  // Şerit
  ribbonWrap: {
    alignItems: 'center',
    marginBottom: 12,
    marginTop: -4,
  },
  ribbon: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: '#FF4757',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  ribbonText: {
    fontSize: 17,
    fontFamily: 'Fredoka_700Bold',
    color: '#fff',
    letterSpacing: 0.5,
  },

  // Gün rozeti
  dayBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  dayBadge: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  dayBadgeText: {
    fontSize: 13,
    fontFamily: 'Fredoka_700Bold',
    color: '#fff',
    letterSpacing: 0.8,
  },
  streakPill: {
    backgroundColor: 'rgba(255,107,53,0.12)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,107,53,0.3)',
  },
  streakText: {
    fontSize: 12,
    fontFamily: 'Nunito_700Bold',
    color: '#E17055',
  },

  // Hücre grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 6,
    marginBottom: 12,
  },
  dayCell: {
    width: CELL_SIZE,
    minHeight: CELL_SIZE + 6,
    backgroundColor: '#E8D4A8',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 2,
    gap: 1,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dayCellToday: {
    borderColor: '#FFC312',
    backgroundColor: '#FFF3CD',
    shadowColor: '#FFC312',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 4,
  },
  dayCellClaimed: {
    backgroundColor: '#D5F5E3',
    borderColor: '#00B894',
  },
  dayCellLabel: {
    fontSize: 9,
    fontFamily: 'Nunito_700Bold',
    color: '#7D5A1C',
  },
  dayCellEmoji: {
    fontSize: 20,
  },
  dayCellStatus: {
    fontSize: 8,
    fontFamily: 'Nunito_700Bold',
    color: '#7D5A1C',
    textAlign: 'center',
    lineHeight: 10,
  },
  dimText: { color: '#B2BEC3' },

  claimedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,184,148,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00B894',
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimedCheck: {
    fontSize: 13,
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(45,52,54,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  lockEmoji: { fontSize: 16 },

  // Haftalık bar
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  progressLabel: {
    fontSize: 10,
    fontFamily: 'Nunito_700Bold',
    color: '#7D5A1C',
    flexShrink: 0,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.10)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    minWidth: 6,
  },
  progressCount: {
    fontSize: 10,
    fontFamily: 'Nunito_700Bold',
    color: '#7D5A1C',
    minWidth: 20,
    textAlign: 'right',
  },

  // Butonlar
  btnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  claimBtn: {
    flex: 2,
    height: 52,
    position: 'relative',
  },
  claimShadow: {
    position: 'absolute',
    bottom: -4, left: 0, right: 0, height: 52,
    borderRadius: 26,
    backgroundColor: '#1A7A3C',
  },
  claimGrad: {
    flex: 1,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  claimText: {
    fontSize: 20,
    fontFamily: 'Fredoka_700Bold',
    color: '#fff',
    letterSpacing: 1,
  },
  laterBtn: {
    flex: 1,
    height: 52,
    position: 'relative',
  },
  laterShadow: {
    position: 'absolute',
    bottom: -4, left: 0, right: 0, height: 52,
    borderRadius: 26,
    backgroundColor: '#1A6A9A',
  },
  laterGrad: {
    flex: 1,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  laterText: {
    fontSize: 18,
    fontFamily: 'Fredoka_700Bold',
    color: '#fff',
  },
  btnHighlight: {
    position: 'absolute',
    top: 4, left: 12, right: 12,
    height: '36%',
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderRadius: 16,
  },

  // Ayı maskotu
  bear: {
    position: 'absolute',
    right: -20,
    bottom: 52,
  },
  bearEmoji: {
    fontSize: 52,
  },
});
