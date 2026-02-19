import { Colors } from '@/src/constants/theme';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform, useColorScheme, Text } from 'react-native';

export default function ProfileLayout() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() == 'dark' ? Colors.dark : Colors.light

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{
        headerShown: true,
        headerTintColor: colorScheme.tint,
        headerTitleStyle: { color: colorScheme.text },
        headerStyle: {
          backgroundColor: Platform.OS == 'ios'
            ? "transparent"
            : colorScheme.background_2,
        },
        headerBlurEffect: isLiquidGlassAvailable() ? 'none' : 'regular',
        headerLargeStyle: {
          backgroundColor: 'transparent'
        },
        headerLargeTitleShadowVisible: false,
        headerLargeTitle: true,
        title: t('settings'),
        headerTitle: () => Platform.OS == 'android' ?
          <Text style={{ color: colorScheme.text, fontSize: 24 }}>
            {t('settings')}
          </Text>
          : undefined,
      }} />
      <Stack.Screen name="language" options={{
        headerShown: true,
        headerBackButtonDisplayMode: Platform.OS == 'ios' ? isLiquidGlassAvailable() ? 'minimal' : 'default' : 'generic',
        headerTransparent: Platform.OS == 'ios' ? true : false,
        headerBlurEffect: isLiquidGlassAvailable() ? 'none' : useColorScheme() == 'dark' ? 'dark' : 'light',
        title: t('language'),
        headerTintColor: colorScheme.tint,
        headerTitleStyle: { color: colorScheme.text }
      }} />
      <Stack.Screen name="themePage" options={{
        headerShown: true,
        headerBackButtonDisplayMode: Platform.OS == 'ios' ? isLiquidGlassAvailable() ? 'minimal' : 'default' : 'generic',
        headerTransparent: Platform.OS == 'ios' ? true : false,
        headerBlurEffect: isLiquidGlassAvailable() ? 'none' : useColorScheme() == 'dark' ? 'dark' : 'light',
        title: t('color_theme'),
        headerTintColor: colorScheme.tint,
        headerTitleStyle: { color: colorScheme.text }
      }} />
      <Stack.Screen name="agreements/accessDeclaration" options={{
        headerShown: true,
        headerBackButtonDisplayMode: isLiquidGlassAvailable() ? 'minimal' : 'default',
        headerTransparent: Platform.OS == 'ios' ? true : false,
        headerBlurEffect: isLiquidGlassAvailable() ? 'none' : 'regular',
        title: t('access_declaration'),
        headerTintColor: colorScheme.tint,
        headerTitleStyle: { color: colorScheme.text }
      }} />
      <Stack.Screen name="agreements/privacyPolicy" options={{
        headerShown: true,
        headerBackButtonDisplayMode: isLiquidGlassAvailable() ? 'minimal' : 'default',
        headerTransparent: Platform.OS == 'ios' ? true : false,
        headerBlurEffect: isLiquidGlassAvailable() ? 'none' : 'regular',
        title: t('privacy_policy'),
        headerTintColor: colorScheme.tint,
        headerTitleStyle: { color: colorScheme.text }
      }} />
      <Stack.Screen name="agreements/statute" options={{
        headerShown: true,
        headerBackButtonDisplayMode: isLiquidGlassAvailable() ? 'minimal' : 'default',
        headerTransparent: Platform.OS == 'ios' ? true : false,
        headerBlurEffect: isLiquidGlassAvailable() ? 'none' : 'regular',
        title: t('statute'),
        headerTintColor: colorScheme.tint,
        headerTitleStyle: { color: colorScheme.text }
      }} />
      {/* <Stack.Screen name="BipSelect/index" options={{ title: t('color_theme'), headerShown: false, headerTransparent: true, headerBackButtonDisplayMode: 'minimal', headerTintColor: colorScheme.tint, headerTitleStyle: { color: colorScheme.text } }} />
      <Stack.Screen name="BipSelect/select" options={{ title: t(''), headerShown: true, headerTransparent: true, headerBackButtonDisplayMode: 'minimal', headerTintColor: colorScheme.tint, headerTitleStyle: { color: colorScheme.text } }} />
      <Stack.Screen name="subpage" options={{ title: 'Подстраница Konto' }} /> */}
    </Stack>
  );
}