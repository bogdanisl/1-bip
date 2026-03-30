// app/profile_tabs/language.tsx — БЕЗ NativeWind
import ListButton from '@/src/components/buttons/ListButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useAppTheme } from '@/src/hooks/use-theme-colors';

const LanguageScreen = () => {
  const { i18n } = useTranslation();
  const { theme: themeColors } = useAppTheme();
  const currentLang = i18n.language;

  const setLanguage = async (lang: string) => {
    await AsyncStorage.setItem('app_language', lang);
    await i18n.changeLanguage(lang);

  };

  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.block, { backgroundColor: themeColors.background_2 }]}>
          <ListButton
            label="🇵🇱 Polski"
            onPress={() => setLanguage('pl')}
            rightIcon={currentLang === 'pl' ? 'check' : 'won'}
          />
          <ListButton
            label="🇬🇧 English"
            onPress={() => setLanguage('en')}
            rightIcon={currentLang === 'en' ? 'check' : 'won'}
          />
          <ListButton
            label="🇺🇦 Українська"
            onPress={() => setLanguage('uk')}
            rightIcon={currentLang === 'uk' ? 'check' : 'won'}
          />
          <ListButton
            label="🇩🇪 Deutsch"
            onPress={() => setLanguage('de')}
            rightIcon={currentLang === 'de' ? 'check' : 'won'}
          />
          <ListButton
            label="🇫🇷 Français"
            onPress={() => setLanguage('fr')}
            rightIcon={currentLang === 'fr' ? 'check' : 'won'}
          />
          <ListButton
            label="🇮🇹 Italiano"
            onPress={() => setLanguage('it')}
            rightIcon={currentLang === 'it' ? 'check' : 'won'}
          />
          <ListButton
            label="🇪🇸 Española"
            isLast
            onPress={() => setLanguage('es')}
            rightIcon={currentLang === 'es' ? 'check' : 'won'}
          />

        </View>
      </ScrollView>
    </View>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  block: {
    marginTop: 50,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
