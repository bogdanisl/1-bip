import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { Platform, useColorScheme } from 'react-native'; // Или ваш хук, если кастомный
import FlashMessage from 'react-native-flash-message';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <FlashMessage position={'top'} style={{ paddingTop: Platform.OS === 'android' ? 30 : 0 }} />

      {/* <Header currentRouteName={''} handlePresentModalPress={() => { } } handleSheetChanges={()=>{}}/>; */}
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Добавьте другие экраны вне табов, если нужно, напр. модальные */}
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}