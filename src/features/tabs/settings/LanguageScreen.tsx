// app/profile_tabs/language.tsx — БЕЗ NativeWind
import ListButton from '@/src/components/buttons/ListButton';
import { Colors } from '@/src/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, useColorScheme, View } from 'react-native';

const LanguageScreen = () => {
  const { i18n, t } = useTranslation();
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === 'dark' ? Colors.dark : Colors.light;
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
            icon="flag"
            label="Polski"
            onPress={() => setLanguage('pl')}
            rightIcon={currentLang === 'pl' ? 'check' : 'won'}
          />
          <ListButton
            icon="flag"
            label="English"
            isLast
            onPress={() => setLanguage('en')}
            rightIcon={currentLang === 'en' ? 'check' : 'won'}
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