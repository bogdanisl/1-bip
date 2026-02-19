import { Colors } from '@/src/constants/theme';
import { useColorScheme } from '@/src/hooks/use-color-scheme.web';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform, Text } from 'react-native';

export default function PreviewContactLayout() {
  const themeColors = useColorScheme() == 'dark' ? Colors.dark : Colors.light;
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{
        headerShown: true,
        headerTintColor: themeColors.tint,
        headerTitleStyle: { color: themeColors.text },
        headerStyle: {
          backgroundColor: Platform.OS == 'ios'
            ? "transparent"
            : themeColors.background_2,
        },
        headerBlurEffect: isLiquidGlassAvailable() ? 'none' : 'regular',
        headerLargeStyle: {
          backgroundColor: 'transparent'
        },
        headerLargeTitleShadowVisible: false,
        headerLargeTitle: true,
        title: t('contact'),
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