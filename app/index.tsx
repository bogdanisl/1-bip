// app/index.tsx
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import '../i18n'
import { updateAllData } from '@/src/services/storage/updateData';




export default function App() {

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });
  const [hasBip, setHasBip] = useState<boolean | null>(null); // null = loading
  useEffect(() => {
    const checkBip = async () => {
      try {
        const value = await AsyncStorage.getItem('selectedBipIds');

        const hasSelection = value !== null && JSON.parse(value).length > 0;

        setHasBip(hasSelection);
        await updateAllData();


      } catch (e) {
        console.warn('AsyncStorage error', e);
        setHasBip(false);
      }
    };
    if (fontsLoaded) {
      checkBip();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || hasBip === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return hasBip ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/(preview)/about" />
  );
}