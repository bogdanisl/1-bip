// app/profile_tabs/theme.tsx — БЕЗ NativeWind + useColorScheme
import ListButton from '@/src/components/buttons/ListButton';
import { AppTheme } from '@/src/constants/theme';
import { useAppTheme } from '@/src/hooks/use-theme-colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';

const ThemeScreen = () => {
  const { t } = useTranslation();
  const { appTheme, theme, setAppTheme } = useAppTheme();

  const applyTheme = async (theme: AppTheme) => {
    await setAppTheme(theme);
  };

  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={[styles.block, { backgroundColor: theme.background_2 }]}>
          <ListButton
            icon='adjust'
            label={t('system')}
            onPress={() => applyTheme('system')}
            rightIcon={appTheme === 'system' ? 'check' : 'won'}
          />
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
            icon='universal-access'
            label={t('contrast')}
            onPress={() => applyTheme('contrast')}
            rightIcon={appTheme === 'contrast' ? 'check' : 'won'}
          />
          <ListButton
            icon='adjust'
            label={t('monochrome')}
            onPress={() => applyTheme('monochrome')}
            isLast
            rightIcon={appTheme === 'monochrome' ? 'check' : 'won'}
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
