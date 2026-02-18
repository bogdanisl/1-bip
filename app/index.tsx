// app/index.tsx
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import '../i18n'
import { updateAllData } from '@/src/services/storage/updateData';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import * as Notifications from 'expo-notifications';



export default function App() {
  const { t } = useTranslation()
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);

    const setAppBadge = async (value: number) => {
      try {
        await Notifications.setBadgeCountAsync(value);
      } catch (e) {
        console.warn('Failed to set badge', e);
      }
    };

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });

  const [hasBip, setHasBip] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    //console.log('index')
    const checkBip = async () => {
      try {
        const value = await AsyncStorage.getItem('selectedBipIds');
        const hasSelection = value !== null && JSON.parse(value).length > 0;
        setHasBip(hasSelection);
        await updateAllData();
        setAppBadge(18)

      } catch (e) {
        console.warn('AsyncStorage error', e);
        setHasBip(false);
      }
    };
    if (fontsLoaded) {
      checkBip();
    }
  }, [fontsLoaded]);

  // Still loading fonts or checking storage
  if (!fontsLoaded || hasBip === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // This is SAFE — <Redirect /> is designed for this
  return hasBip ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/(preview)/about" /> 
  );
}