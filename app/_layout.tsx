import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAppTheme } from '@/src/hooks/use-theme-colors';
import { Platform } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export default function RootLayout() {
  const { colorScheme } = useAppTheme();

  return (
    <ThemeProvider value={colorScheme == 'dark' ? DarkTheme : DefaultTheme}>
      <FlashMessage position={'top'} style={{ paddingTop: Platform.OS === 'android' ? 30 : 0 }} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <Header currentRouteName={''} handlePresentModalPress={() => { } } handleSheetChanges={()=>{}}/>; */}
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false, animation: 'none' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
          <Stack.Screen name="(preview)" options={{ headerShown: false, animation: 'fade' }} />
          {/* Добавьте другие экраны вне табов, если нужно, напр. модальные */}
        </Stack>
      </GestureHandlerRootView>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
