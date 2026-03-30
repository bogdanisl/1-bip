import { MaterialIcons } from '@expo/vector-icons';
import { osName } from 'expo-device';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform, Text, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/src/hooks/use-theme-colors';

export default function ProfileLayout() {
  const { t } = useTranslation();
  const { theme: colorScheme } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackButtonDisplayMode: isLiquidGlassAvailable() ? 'minimal' : 'default',
        headerTransparent: Platform.OS == 'ios' ? true : false,
        headerBlurEffect: isLiquidGlassAvailable() ? 'none' : 'regular',
        headerTintColor: colorScheme.tint,
        headerTitleStyle: { color: colorScheme.text },
        headerLargeStyle: { backgroundColor: 'transparent' },
        contentStyle:{backgroundColor:colorScheme.background}
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
        title: t('language'),
      }} />
      <Stack.Screen name="themePage" options={{
        title: t('color_theme'),
      }} />
      <Stack.Screen name="agreements/accessDeclaration" options={{
        title: t('access_declaration'),  
      }} />
      <Stack.Screen name="agreements/privacyPolicy" options={{
        title: t('privacy_policy'),
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
