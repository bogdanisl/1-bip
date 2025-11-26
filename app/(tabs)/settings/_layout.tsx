import { Colors } from '@/constants/theme';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';

export default function ProfileLayout() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() == 'dark'?Colors.dark:Colors.light

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTransparent:false
      }}
    >
      <Stack.Screen name="index" options={{ title: t('settings') }} />
      <Stack.Screen name="language" options={{ title: t('language'), headerShown:true, headerTransparent: true, headerBackButtonDisplayMode:'minimal',headerTintColor:colorScheme.tint, headerTitleStyle:{color:colorScheme.text}}} />
      <Stack.Screen name="themePage" options={{ title: t('color_theme'), headerShown:true, headerTransparent: true,headerBackButtonDisplayMode:'minimal',headerTintColor:colorScheme.tint, headerTitleStyle:{color:colorScheme.text} }} />
      
      
      <Stack.Screen name="BipSelect/index" options={{ title: t('color_theme'), headerShown:false, headerTransparent: true,headerBackButtonDisplayMode:'minimal',headerTintColor:colorScheme.tint, headerTitleStyle:{color:colorScheme.text} }} />
      <Stack.Screen name="BipSelect/select" options={{ title: t(''), headerShown:true, headerTransparent: true,headerBackButtonDisplayMode:'minimal',headerTintColor:colorScheme.tint, headerTitleStyle:{color:colorScheme.text} }} />
      {/* <Stack.Screen name="subpage" options={{ title: 'Подстраница Konto' }} /> */}
    </Stack>
  );
}