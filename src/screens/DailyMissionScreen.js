// DailyMissionScreen — Günlük Görev
// gunluk-gorev.png tasarımına birebir uygun
// Akış: Welcome → DailyMission → MainTabs

import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientBackground } from '../components/common';
import { useTranslation } from '../i18n/index';
import useAppStore from '../store/useAppStore';
import { COLORS } from '../theme/colors';

const { width: SW } = Dimensions.get('window');
const CARD_W = SW - 40;
const CELL_SIZE = (CARD_W - 48) / 4; // 4 sütun

// ─── Tarih yardımcıları ────────────────────────────────────────────────────
function toDateStr(date = new Date()) {
  return date.toISOString().split('T')[0];
}

function getWeekDays() {
  const today = new Date();
  const dow = today.getDay(); // 0=Pazar
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
  return dow === 0 ? 7 : dow; // 1=Pzt … 7=Paz
}

function getDayStatus(dateStr, todayStr, claimedDates) {
  if (dateStr > todayStr) return 'locked';
  if (claimedDates.includes(dateStr)) return 'claimed';
  if (dateStr === todayStr) return 'today';
  return 'missed';
}

// ─── Gün hücresi ──────────────────────────────────────────────────────────
function DayCell({ index, status }) {
  const dayLabel = `Gün ${index + 1}`;
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
      <Text style={[styles.dayCellLabel, isDim && styles.dimText]}>{dayLabel}</Text>
      <Text style={[styles.dayCellEmoji, isDim && { opacity: 0.35 }]}>🎨</Text>
      <Text style={[
        styles.dayCellStatus,
        isClaimed && { color: '#00B894' },
        isToday   && { color: '#E17055' },
        isDim     && { color: '#B2BEC3' },
      ]}>
        {isClaimed ? 'Alındı'   :
         isToday   ? 'Yeni Fırça!' :
         isMissed  ? 'Kaçırıldı' :
                     'Kilitli'}
      </Text>

      {/* Alındı overlay */}
      {isClaimed && (
        <View style={styles.claimedOverlay}>
          <View style={styles.claimedCircle}>
            <Text style={styles.claimedCheck}>✓</Text>
          </View>
        </View>
      )}

      {/* Kilitli overlay */}
      {isLocked && (
        <View style={styles.lockOverlay}>
          <Text style={styles.lockIcon}>🔒</Text>
        </View>
      )}
    </View>
  );
}

// ─── Ana ekran ────────────────────────────────────────────────────────────
export default function DailyMissionScreen({ navigation }) {
  const t = useTranslation();
  const insets = useSafeAreaInsets();

  const claimedDates    = useAppStore((s) => s.claimedDates);
  const claimDailyReward = useAppStore((s) => s.claimDailyReward);
  const dailyStreak     = useAppStore((s) => s.dailyStreak);

  const todayStr  = toDateStr();
  const weekDays  = getWeekDays();
  const dayNumber = getDayNumber();

  const alreadyClaimed = claimedDates.includes(todayStr);
  const weekClaimed    = weekDays.filter(d => claimedDates.includes(d)).length;
  const weekProgress   = weekClaimed / 7;

  // ── Animasyonlar ─────────────────────────────────────────────────────────
  const cardAnim  = useRef(new Animated.Value(60)).current;  // slide up
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const bearBounce  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Kart giriş animasyonu
    Animated.parallel([
      Animated.spring(cardAnim, {
        toValue: 0, friction: 7, tension: 50, useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1, duration: 300, useNativeDriver: true,
      }),
    ]).start();

    // Ayı zıplama
    Animated.loop(
      Animated.sequence([
        Animated.timing(bearBounce, { toValue: -12, duration: 500, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(bearBounce, { toValue: 0,   duration: 400, easing: Easing.in(Easing.quad),  useNativeDriver: true }),
        Animated.delay(800),
      ])
    ).start();
  }, []);

  const handleClaim = () => {
    if (!alreadyClaimed) {
      claimDailyReward();
    }
    navigation.replace('MainTabs');
  };

  const handleLater = () => {
    navigation.replace('MainTabs');
  };

  // 7 hücre → 4+3 yerleşimi: satır 2'ye 1 boş ekle
  const cells = weekDays.map((dateStr, i) => ({
    dateStr,
    status: getDayStatus(dateStr, todayStr, claimedDates),
    index: i,
  }));
  // 8. boş hücre (son satır hizalaması)
  const paddedCells = [...cells, null];

  return (
    <GradientBackground colors={COLORS.mainBg}>
      <View style={[styles.container, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16 }]}>

        {/* Başlık şeridi */}
        <View style={styles.ribbonWrap}>
          <LinearGradient
            colors={['#FF6B9D', '#FF4757']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.ribbon}
          >
            {/* Şerit uçları */}
            <View style={[styles.ribbonTail, styles.ribbonTailLeft]} />
            <View style={[styles.ribbonTail, styles.ribbonTailRight]} />
            <Text style={styles.ribbonText}>
              🌟  {t('daily_title') || 'Günlük Görev'}  🌟
            </Text>
          </LinearGradient>
          {/* Süsleme yıldızları */}
          <Text style={styles.starLeft}>✨</Text>
          <Text style={styles.starRight}>✨</Text>
        </View>

        {/* Kart + Ayı */}
        <Animated.View style={[
          styles.cardWrap,
          { transform: [{ translateY: cardAnim }], opacity: cardOpacity },
        ]}>
          <LinearGradient
            colors={['#FFF8E7', '#FFEFC4']}
            style={styles.card}
          >
            {/* Gün X rozeti */}
            <View style={styles.dayBadge}>
              <LinearGradient
                colors={['#FDCB6E', '#E17055']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.dayBadgeGrad}
              >
                <Text style={styles.dayBadgeText}>
                  {t('day_x')?.replace('{x}', dayNumber) || `Gün ${dayNumber}`}
                </Text>
              </LinearGradient>
            </View>

            {/* 7 günlük grid */}
            <View style={styles.gridWrap}>
              {paddedCells.map((cell, i) =>
                cell ? (
                  <DayCell key={cell.dateStr} index={cell.index} status={cell.status} />
                ) : (
                  <View key="spacer" style={[styles.dayCell, { opacity: 0 }]} />
                )
              )}
            </View>

            {/* Haftalık ilerleme */}
            <View style={styles.progressSection}>
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
          </LinearGradient>

          {/* Ayı maskotu */}
          <Animated.View style={[styles.bearWrap, { transform: [{ translateY: bearBounce }] }]}>
            <Text style={styles.bearEmoji}>🐻</Text>
          </Animated.View>
        </Animated.View>

        {/* Streak bilgisi */}
        {dailyStreak > 1 && (
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥 {dailyStreak} günlük seri!</Text>
          </View>
        )}

        {/* Butonlar */}
        <View style={styles.btnRow}>
          {/* Claim butonu */}
          <TouchableOpacity
            style={[styles.claimBtn, alreadyClaimed && styles.claimBtnDone]}
            onPress={handleClaim}
            activeOpacity={0.85}
          >
            <View style={styles.claimBtn3d} />
            <LinearGradient
              colors={alreadyClaimed ? ['#B2BEC3', '#95A5A6'] : ['#2ED573', '#1E9F53']}
              start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
              style={styles.claimBtnGrad}
            >
              <View style={styles.claimBtnHighlight} />
              <Text style={styles.claimBtnText}>
                {alreadyClaimed
                  ? (t('claimed') || 'Alındı')
                  : (t('claim')   || 'Al')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Later butonu */}
          <TouchableOpacity
            style={styles.laterBtn}
            onPress={handleLater}
            activeOpacity={0.85}
          >
            <View style={styles.laterBtn3d} />
            <LinearGradient
              colors={['#45AAF2', '#2980B9']}
              start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
              style={styles.laterBtnGrad}
            >
              <View style={styles.laterBtnHighlight} />
              <Text style={styles.laterBtnText}>
                {t('later') || 'Sonra'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </View>
    </GradientBackground>
  );
}

// ─── Stiller ──────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  // ── Başlık şeridi ────────────────────────────────────────────────────────
  ribbonWrap: {
    alignItems: 'center',
    marginTop: 8,
  },
  ribbon: {
    borderRadius: 32,
    paddingHorizontal: 28,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#FF4757',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  ribbonTail: {
    position: 'absolute',
    bottom: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  ribbonTailLeft: {
    left: 24,
    borderTopColor: '#C0392B',
  },
  ribbonTailRight: {
    right: 24,
    borderTopColor: '#C0392B',
  },
  ribbonText: {
    fontSize: 20,
    fontFamily: 'Fredoka_700Bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  starLeft: {
    position: 'absolute',
    left: -8,
    top: 4,
    fontSize: 22,
  },
  starRight: {
    position: 'absolute',
    right: -8,
    top: 4,
    fontSize: 22,
  },

  // ── Kart ─────────────────────────────────────────────────────────────────
  cardWrap: {
    width: CARD_W,
    position: 'relative',
  },
  card: {
    borderRadius: 28,
    padding: 16,
    shadowColor: '#E17055',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'rgba(253,203,110,0.6)',
  },

  // Gün X rozeti
  dayBadge: {
    alignItems: 'center',
    marginBottom: 14,
  },
  dayBadgeGrad: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  dayBadgeText: {
    fontSize: 15,
    fontFamily: 'Fredoka_700Bold',
    color: '#fff',
    letterSpacing: 1,
  },

  // Hücre grid
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  dayCell: {
    width: CELL_SIZE,
    minHeight: CELL_SIZE + 8,
    backgroundColor: '#E8D4A8',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    gap: 2,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dayCellToday: {
    borderColor: '#FFC312',
    backgroundColor: '#FFF3CD',
    shadowColor: '#FFC312',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  dayCellClaimed: {
    backgroundColor: '#D5F5E3',
    borderColor: '#00B894',
  },
  dayCellLabel: {
    fontSize: 10,
    fontFamily: 'Nunito_700Bold',
    color: '#7D5A1C',
  },
  dayCellEmoji: {
    fontSize: 22,
  },
  dayCellStatus: {
    fontSize: 9,
    fontFamily: 'Nunito_700Bold',
    color: '#7D5A1C',
    textAlign: 'center',
  },
  dimText: {
    color: '#B2BEC3',
  },

  // Alındı overlay
  claimedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,184,148,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimedCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00B894',
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimedCheck: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Nunito_700Bold',
  },

  // Kilitli overlay
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(45,52,54,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  lockIcon: {
    fontSize: 20,
  },

  // Haftalık ilerleme
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressLabel: {
    fontSize: 11,
    fontFamily: 'Nunito_700Bold',
    color: '#7D5A1C',
    flexShrink: 0,
  },
  progressTrack: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(0,0,0,0.10)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
    minWidth: 8,
  },
  progressCount: {
    fontSize: 11,
    fontFamily: 'Nunito_700Bold',
    color: '#7D5A1C',
    minWidth: 22,
    textAlign: 'right',
  },

  // Ayı maskotu
  bearWrap: {
    position: 'absolute',
    right: -18,
    bottom: -16,
  },
  bearEmoji: {
    fontSize: 56,
  },

  // Streak
  streakBadge: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 7,
    shadowColor: '#FF4757',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  streakText: {
    fontSize: 14,
    fontFamily: 'Fredoka_700Bold',
    color: '#E17055',
  },

  // ── Butonlar ─────────────────────────────────────────────────────────────
  btnRow: {
    flexDirection: 'row',
    gap: 12,
    width: CARD_W,
  },

  // Claim butonu (geniş)
  claimBtn: {
    flex: 2,
    position: 'relative',
    height: 58,
  },
  claimBtnDone: {
    opacity: 0.75,
  },
  claimBtn3d: {
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#1A7A3C',
  },
  claimBtnGrad: {
    flex: 1,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  claimBtnHighlight: {
    position: 'absolute',
    top: 4,
    left: 20,
    right: 20,
    height: '38%',
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderRadius: 20,
  },
  claimBtnText: {
    fontSize: 22,
    fontFamily: 'Fredoka_700Bold',
    color: '#fff',
    letterSpacing: 1,
  },

  // Later butonu (dar)
  laterBtn: {
    flex: 1,
    position: 'relative',
    height: 58,
  },
  laterBtn3d: {
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#1A6A9A',
  },
  laterBtnGrad: {
    flex: 1,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  laterBtnHighlight: {
    position: 'absolute',
    top: 4,
    left: 10,
    right: 10,
    height: '38%',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20,
  },
  laterBtnText: {
    fontSize: 20,
    fontFamily: 'Fredoka_700Bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
});
