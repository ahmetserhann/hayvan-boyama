// SettingsScreen - Ayarlar
// - Dil seçimi: açılır modal picker
// - Ses toggle
// - KVKK, Gizlilik, Kullanım Koşulları, Hakkında
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientBackground } from '../components/common';
import { useTranslation, useLanguage } from '../i18n/index';
import useAppStore from '../store/useAppStore';
import { COLORS } from '../theme/colors';
import { SIZES } from '../theme/fonts';

// ─── Politika içerikleri ────────────────────────────────────────────────────
const POLICIES = {
  kvkk: {
    title: 'KVKK Aydınlatma Metni',
    icon: '🔐',
    color: ['#A29BFE', '#6C5CE7'],
    content: `6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Aydınlatma Metni

Veri Sorumlusu:
Hayvan Boyama Uygulaması

1. Toplanan Kişisel Veriler
Uygulamamız yalnızca şu verileri işlemektedir:
• Kullanıcı tarafından girilen kullanıcı adı (takma ad)
• Oyun ilerleme verileri (tamamlanan hayvanlar, yıldızlar)
• Ses ve dil tercihleri

Bu veriler yalnızca cihazınızda (AsyncStorage) saklanmakta olup herhangi bir sunucuya aktarılmamaktadır.

2. Verilerin İşlenme Amacı
• Oyun deneyiminin kişiselleştirilmesi
• İlerleme kaydının tutulması
• Kullanıcı tercihlerinin hatırlanması

3. Verilerin Üçüncü Taraflarla Paylaşımı
Kişisel verileriniz hiçbir üçüncü tarafla paylaşılmamaktadır. Uygulama internet bağlantısı gerektirmez ve veri göndermez.

4. Verilerin Saklanma Süresi
Veriler siz uygulamayı cihazınızdan silene kadar cihazınızda saklanır.

5. Haklarınız
KVKK kapsamında şu haklara sahipsiniz:
• Kişisel verilerinizin işlenip işlenmediğini öğrenme
• Verilerinizin silinmesini talep etme (uygulamayı kaldırmanız yeterlidir)
• Verilerin düzeltilmesini isteme

6. İletişim
KVKK kapsamındaki haklarınızı kullanmak için:
📧 info@hayvanBoyama.com`,
  },
  privacy: {
    title: 'Gizlilik Politikası',
    icon: '🛡️',
    color: ['#55EFC4', '#00B894'],
    content: `Gizlilik Politikası

Son güncelleme: Mart 2025

Hayvan Boyama uygulaması, çocuklara yönelik eğitici bir boyama oyunudur. Gizliliğiniz bizim için son derece önemlidir.

1. Çocukların Gizliliği
Uygulamamız 13 yaş altı çocuklar dahil tüm yaş grupları için tasarlanmıştır. COPPA (Children's Online Privacy Protection Act) uyumlu olarak:
• Çocuklardan kişisel bilgi toplamıyoruz
• Profil oluşturma gerektirmiyoruz
• Sosyal özellik içermiyoruz

2. Reklam ve Analitik
• Uygulama hiçbir reklam göstermez
• Üçüncü taraf analitik hizmeti kullanılmaz
• Kullanım verisi toplanmaz

3. İnternet Bağlantısı
Uygulama tamamen çevrimdışı çalışır. Hiçbir veri internet üzerinden iletilmez.

4. Cihazda Saklanan Veriler
Yalnızca şunlar cihazınızda saklanır:
• Seçilen kullanıcı adı (takma ad)
• Oyun ilerleme bilgisi
• Dil ve ses tercihleri

Bu verilere yalnızca uygulamamız erişebilir.

5. Değişiklikler
Politikamızı güncellediğimizde uygulama içinde bildirim yapılır.

6. İletişim
📧 privacy@hayvanBoyama.com`,
  },
  terms: {
    title: 'Kullanım Koşulları',
    icon: '📋',
    color: ['#FDCB6E', '#E17055'],
    content: `Kullanım Koşulları

Son güncelleme: Mart 2025

Bu uygulamayı kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.

1. Kabul
Uygulamayı indirerek veya kullanarak bu Kullanım Koşulları'nı kabul etmiş olursunuz. Kabul etmiyorsanız uygulamayı kullanmayınız.

2. Kullanım Lisansı
Size bu uygulamayı kişisel, ticari olmayan amaçlarla kullanmanız için sınırlı, devredilemez bir lisans verilmektedir.

3. Yasak Kullanımlar
Aşağıdaki kullanımlar kesinlikle yasaktır:
• Uygulamayı tersine mühendislik yapmak
• Uygulamanın kaynak kodunu kopyalamak veya değiştirmek
• Uygulamayı ticari amaçlarla kullanmak
• Çocuklar için zararlı içerik oluşturmak

4. Fikri Mülkiyet
Uygulamadaki tüm görseller, sesler, tasarımlar ve kodlar telif hakkı ile korunmaktadır. Tüm haklar saklıdır.

5. Garanti Reddi
Uygulama "olduğu gibi" sunulmaktadır. Kesintisiz veya hatasız çalışacağı garanti edilmez.

6. Sorumluluk Sınırlaması
Uygulama kullanımından doğabilecek doğrudan veya dolaylı zararlardan sorumlu tutulamayız.

7. Ebeveyn Onayı
13 yaş altı çocukların uygulamayı ebeveyn gözetiminde kullanması önerilir.

8. Değişiklikler
Koşulları değiştirme hakkımız saklıdır. Güncel koşullar her zaman uygulama içinde görüntülenebilir.

9. İletişim
📧 legal@hayvanBoyama.com`,
  },
  about: {
    title: 'Uygulama Hakkında',
    icon: 'ℹ️',
    color: ['#74B9FF', '#0984E3'],
    content: `Hayvan Boyama

Versiyon 1.0.0

🎨 Çocukların hayal gücünü renklendiren, hayvanlarla dolu eğlenceli bir boyama dünyası!

Nasıl Oynanır?
1. Kategoriden bir hayvan seç
2. Renk paletinden renk seç
3. Hayvanın bölgelerine dokun ve boya
4. Tamamladığında kutlama ekranını gör!

Özellikler
• 11 farklı kategori
• 50+ hayvan
• Türkçe ve İngilizce dil desteği
• Ses efektleri
• İlerleme takibi
• Çevrimdışı çalışır

Geliştirici Notu
Bu uygulama çocukların yaratıcılığını desteklemek amacıyla sevgiyle yapılmıştır. Ebeveynlerimizin geri bildirimleri bizim için çok değerli!

Yapılan Teknolojiler
• React Native + Expo
• react-native-svg
• Zustand (state yönetimi)

İletişim & Geri Bildirim
📧 info@hayvanBoyama.com
🌐 www.hayvanBoyama.com

© 2025 Hayvan Boyama. Tüm hakları saklıdır.`,
  },
};

// ─── Dil Seçim Modali ────────────────────────────────────────────────────────
function LanguageModal({ visible, current, onSelect, onClose }) {
  const LANGS = [
    { code: 'tr', flag: '🇹🇷', label: 'Türkçe' },
    { code: 'en', flag: '🇺🇸', label: 'English' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.langModal} onPress={() => {}}>
          {/* Başlık */}
          <LinearGradient
            colors={['#C47DF5', '#A55EEA']}
            style={styles.langModalHeader}
          >
            <Text style={styles.langModalTitle}>🌍  Dil Seç</Text>
            <TouchableOpacity onPress={onClose} style={styles.langModalClose}>
              <Text style={styles.langModalCloseText}>✕</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Seçenekler */}
          <View style={styles.langOptions}>
            {LANGS.map((lang) => {
              const isSelected = current === lang.code;
              return (
                <TouchableOpacity
                  key={lang.code}
                  style={[styles.langOption, isSelected && styles.langOptionSelected]}
                  onPress={() => { onSelect(lang.code); onClose(); }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.langFlag}>{lang.flag}</Text>
                  <Text style={[styles.langLabel, isSelected && styles.langLabelSelected]}>
                    {lang.label}
                  </Text>
                  {isSelected && (
                    <View style={styles.checkCircle}>
                      <Text style={styles.checkMark}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ─── Politika Modali ─────────────────────────────────────────────────────────
function PolicyModal({ policy, onClose }) {
  const insets = useSafeAreaInsets();
  if (!policy) return null;

  return (
    <Modal
      visible={!!policy}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[styles.policyContainer, { paddingTop: insets.top }]}>
        {/* Header */}
        <LinearGradient colors={policy.color} style={styles.policyHeader}>
          <Text style={styles.policyHeaderIcon}>{policy.icon}</Text>
          <Text style={styles.policyHeaderTitle}>{policy.title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.policyClose}>
            <Text style={styles.policyCloseText}>✕</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* İçerik */}
        <ScrollView
          style={styles.policyScroll}
          contentContainerStyle={[styles.policyContent, { paddingBottom: insets.bottom + 24 }]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.policyText}>{policy.content}</Text>
        </ScrollView>
      </View>
    </Modal>
  );
}

// ─── Ayar satırı ─────────────────────────────────────────────────────────────
function SettingRow({ icon, label, children, onPress, showArrow }) {
  const inner = (
    <View style={styles.settingRow}>
      <Text style={styles.settingIcon}>{icon}</Text>
      <Text style={styles.settingLabel}>{label}</Text>
      <View style={styles.settingControl}>{children}</View>
      {showArrow && <Text style={styles.settingArrow}>›</Text>}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {inner}
      </TouchableOpacity>
    );
  }
  return inner;
}

// ─── Ana ekran ────────────────────────────────────────────────────────────────
export default function SettingsScreen() {
  const t = useTranslation();
  const insets = useSafeAreaInsets();
  const { language, setLanguage } = useLanguage();
  const soundEnabled = useAppStore((s) => s.soundEnabled);
  const setSoundEnabled = useAppStore((s) => s.setSoundEnabled);

  const [langModalVisible, setLangModalVisible] = useState(false);
  const [activePolicyKey, setActivePolicyKey] = useState(null);
  const activePolicy = activePolicyKey ? POLICIES[activePolicyKey] : null;

  const currentLangLabel = language === 'tr' ? '🇹🇷 Türkçe' : '🇺🇸 English';

  const policyItems = [
    { key: 'kvkk',    icon: '🔐', label: 'KVKK Aydınlatma Metni' },
    { key: 'privacy', icon: '🛡️', label: 'Gizlilik Politikası' },
    { key: 'terms',   icon: '📋', label: 'Kullanım Koşulları' },
    { key: 'about',   icon: 'ℹ️',  label: 'Uygulama Hakkında' },
  ];

  return (
    <GradientBackground colors={COLORS.mainBg}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.container, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{t('settings') || 'Ayarlar'}</Text>

        {/* Genel Ayarlar */}
        <Text style={styles.sectionLabel}>⚙️  Genel</Text>
        <View style={styles.card}>
          <SettingRow icon="🔊" label={t('sound') || 'Ses'}>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#E0E0E0', true: '#2ED573' }}
              thumbColor="#fff"
            />
          </SettingRow>

          <View style={styles.divider} />

          <SettingRow
            icon="🌍"
            label={t('language') || 'Dil'}
            onPress={() => setLangModalVisible(true)}
            showArrow
          >
            <View style={styles.langChip}>
              <Text style={styles.langChipText}>{currentLangLabel}</Text>
            </View>
          </SettingRow>
        </View>

        {/* Yasal & Bilgi */}
        <Text style={styles.sectionLabel}>📄  Yasal & Bilgi</Text>
        <View style={styles.card}>
          {policyItems.map((item, index) => (
            <React.Fragment key={item.key}>
              {index > 0 && <View style={styles.divider} />}
              <SettingRow
                icon={item.icon}
                label={item.label}
                onPress={() => setActivePolicyKey(item.key)}
                showArrow
              />
            </React.Fragment>
          ))}
        </View>

        <Text style={styles.versionText}>Hayvan Boyama v1.0.0</Text>
      </ScrollView>

      {/* Modaller */}
      <LanguageModal
        visible={langModalVisible}
        current={language}
        onSelect={setLanguage}
        onClose={() => setLangModalVisible(false)}
      />
      <PolicyModal
        policy={activePolicy}
        onClose={() => setActivePolicyKey(null)}
      />
    </GradientBackground>
  );
}

// ─── Stiller ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Fredoka_700Bold',
    color: COLORS.darkText,
    textAlign: 'center',
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 13,
    fontFamily: 'Nunito_700Bold',
    color: COLORS.lightText,
    marginHorizontal: 24,
    marginBottom: 8,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: SIZES.radiusXl,
    paddingVertical: 4,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14,
  },
  settingIcon: {
    fontSize: 22,
    width: 28,
    textAlign: 'center',
  },
  settingLabel: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    color: COLORS.darkText,
  },
  settingControl: {
    alignItems: 'flex-end',
  },
  settingArrow: {
    fontSize: 22,
    color: COLORS.lightText,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginHorizontal: 20,
  },
  langChip: {
    backgroundColor: 'rgba(165,94,234,0.10)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(165,94,234,0.25)',
  },
  langChipText: {
    fontSize: 13,
    fontFamily: 'Nunito_700Bold',
    color: '#A55EEA',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: COLORS.lightText,
    marginTop: 4,
  },

  // ── Dil Modali ───────────────────────────────────────────────────────────
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  langModal: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  langModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  langModalTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Fredoka_700Bold',
    color: '#fff',
  },
  langModalClose: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  langModalCloseText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },
  langOptions: {
    padding: 12,
    gap: 8,
  },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    gap: 12,
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  langOptionSelected: {
    backgroundColor: 'rgba(165,94,234,0.08)',
    borderColor: '#A55EEA',
  },
  langFlag: {
    fontSize: 26,
  },
  langLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    color: COLORS.darkText,
  },
  langLabelSelected: {
    color: '#A55EEA',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#A55EEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Nunito_700Bold',
  },

  // ── Politika Modali ──────────────────────────────────────────────────────
  policyContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 12,
  },
  policyHeaderIcon: {
    fontSize: 24,
  },
  policyHeaderTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Fredoka_700Bold',
    color: '#fff',
  },
  policyClose: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  policyCloseText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
  policyScroll: {
    flex: 1,
  },
  policyContent: {
    padding: 24,
  },
  policyText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#2D3436',
    lineHeight: 22,
  },
});
