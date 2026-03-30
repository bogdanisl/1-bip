import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform, Text } from 'react-native';
import { useAppTheme } from '@/src/hooks/use-theme-colors';

export default function ProfileLayout() {
  const { t } = useTranslation();
  const { colorScheme, theme: colorTheme } = useAppTheme();
  const headerBlurEffect = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackButtonDisplayMode: Platform.OS == 'ios' ? isLiquidGlassAvailable() ? 'minimal' : 'default' : 'generic',
        headerTransparent: Platform.OS == 'ios' ? true : false,
        headerBlurEffect: isLiquidGlassAvailable() ? 'none' : headerBlurEffect,
        headerTintColor: colorTheme.tint,
        headerTitleStyle: { color: colorTheme.text },
        headerLargeStyle: { backgroundColor: 'transparent' },
        contentStyle: { backgroundColor: colorTheme.background }
      }}
    >
      <Stack.Screen name="index" options={{
        headerShown: true,
        headerTintColor: colorTheme.tint,
        headerTitleStyle: { color: colorTheme.text },
        headerStyle: {
          backgroundColor: Platform.OS == 'ios'
            ? "transparent"
            : colorTheme.background_2,
        },
        headerBlurEffect: isLiquidGlassAvailable() ? 'none' : 'regular',
        headerLargeStyle: {
          backgroundColor: 'transparent'
        },
        headerLargeTitleShadowVisible: false,
        headerLargeTitle: true,
        title: t('settings'),
        headerTitle: () => Platform.OS == 'android' ?
          <Text style={{ color: colorTheme.text, fontSize: 24 }}>
            {t('settings')}
          </Text>
          : undefined,
      }} />
      <Stack.Screen name="language" options={{
        title: t('language'),
      }} />
      <Stack.Screen name="themePage" options={{
        title: t('color_theme'),
      }} />
      <Stack.Screen name="agreements/statute" options={{
        title: t('statute'),
      }} />
      {/* <Stack.Screen name="BipSelect/index" options={{ title: t('color_theme'), headerShown: false, headerTransparent: true, headerBackButtonDisplayMode: 'minimal', headerTintColor: colorScheme.tint, headerTitleStyle: { color: colorScheme.text } }} />
      <Stack.Screen name="BipSelect/select" options={{ title: t(''), headerShown: true, headerTransparent: true, headerBackButtonDisplayMode: 'minimal', headerTintColor: colorScheme.tint, headerTitleStyle: { color: colorScheme.text } }} />
      <Stack.Screen name="subpage" options={{ title: 'Подстраница Konto' }} /> */}
    </Stack>
  );
}
