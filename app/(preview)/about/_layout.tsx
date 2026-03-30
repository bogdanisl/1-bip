import { useAppTheme } from '@/src/hooks/use-theme-colors';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform, Text } from 'react-native';

export default function AboutLayout() {
  const { colorScheme, theme: themeColors } = useAppTheme();
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: themeColors.background }
      }}
    >
      <Stack.Screen name="index" options={{
        headerShown: false,
        headerTintColor: themeColors.tint,
        headerTitleStyle: { color: themeColors.text },
        headerStyle: {
          backgroundColor: Platform.OS == 'ios'
            ? "transparent"
            : themeColors.background_2,
        },
        headerBlurEffect: isLiquidGlassAvailable() ? 'none' : colorScheme === 'dark' ? 'dark' : 'light',

        headerLargeTitle: true,
        title: "O Aplikacji",
        headerTitle: () => Platform.OS == 'android' ?
          <Text style={{ color: themeColors.text, fontSize: 24 }}>
            {t('contact')}
          </Text>
          : undefined,
      }} />
      {/* <Stack.Screen name="subpage" options={{ title: 'Подстраница Kontakt' }} /> */}
    </Stack>
  );
}
