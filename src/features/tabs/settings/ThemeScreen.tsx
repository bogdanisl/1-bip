// app/profile_tabs/theme.tsx — БЕЗ NativeWind + useColorScheme
import ListButton from '@/src/components/buttons/ListButton';
import { Colors } from '@/src/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Appearance,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View
} from 'react-native';

type AppTheme = 'light' | 'dark' | 'system';

const ThemeScreen = () => {
  const { t } = useTranslation();
  const systemScheme = useColorScheme(); // 'light' | 'dark' | null
  const [appTheme, setAppTheme] = useState<AppTheme>('system');

  // Загрузка сохранённой темы
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('app_theme');
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        setAppTheme(saved);
      }
    })();
  }, []);

  // Применение темы
  const applyTheme = async (theme: AppTheme) => {
    setAppTheme(theme);
    await AsyncStorage.setItem('app_theme', theme);
    // Expo не меняет тему автоматически — эмулируем
    if (theme !== 'system') {
      Appearance.setColorScheme(theme);
    } else {
      Appearance.setColorScheme(null);
    }
  };

  // Определяем текущую активную тему
  const activeTheme =
    appTheme === 'system'
      ? systemScheme || 'light'
      : appTheme;
  const colorScheme = useColorScheme();

  const themeColors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={[styles.block, { backgroundColor: themeColors.background_2 }]}>
          <ListButton
            icon='moon-o'
            label={t('dark')}
            onPress={() => applyTheme('dark')}
            rightIcon={appTheme === 'dark' ? 'check' : 'won'}
          />
          <ListButton
            icon='sun-o'
            label={t('light')}
            onPress={() => applyTheme('light')}
            rightIcon={appTheme === 'light' ? 'check' : 'won'}
          />
          <ListButton
            icon='adjust'
            label={t('system')}
            onPress={() => applyTheme('system')}
            isLast
            rightIcon={appTheme === 'system' ? 'check' : 'won'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ThemeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 16,
    marginTop: 50,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  block: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});