import { Stack } from 'expo-router/stack';
import { useTranslation } from 'react-i18next';
import { Platform, useColorScheme, Text, TouchableOpacity } from 'react-native';
import { isLiquidGlassAvailable } from 'expo-glass-effect'
import { osName } from "expo-device";
import { router } from 'expo-router';
import { HeaderButton } from '@/components/buttons/HeaderButtons/HeaderButton';
import { Icon } from 'expo-router/unstable-native-tabs';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';


export default function HomeLayout() {
  const { t } = useTranslation()
  const colorScheme = useColorScheme()
  const themeColors = colorScheme == 'dark' ? Colors.dark : Colors.light

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Можно включить, если нужны заголовки
      }}
    >
      <Stack.Screen name="index" options={{ title: '',headerShown:false,headerTransparent:true }} />

      <Stack.Screen name="sub_pages/data"
        options={{
          headerShown: true,
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerLargeTitle: false,
          title: t('home.office_data'),
          headerStyle: {
            backgroundColor:
              Platform.OS === "ios"
                ? "transparent"
                : 'white',
          },
          headerBlurEffect: isLiquidGlassAvailable()
            ? undefined
            : colorScheme === "dark"
              ? "dark"
              : "light",
        }}
      />
      <Stack.Screen name="sub_pages/bip_selector"
        options={{
          headerShown: Platform.OS === "ios" ? false : true,
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerLargeTitle: false,
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => { router.back() }} style={{ width: 34, height: 34, justifyContent: 'center', alignItems: 'center' }}>
          //     <MaterialIcons name='close' size={28} color={themeColors.tint} style={isLiquidGlassAvailable() ? { paddingLeft: 2 } : {}}></MaterialIcons>
          //   </TouchableOpacity>
          // ),
          title: "",
          
          presentation:
            Platform.OS === "ios"
              ? isLiquidGlassAvailable() && osName !== "iPadOS"
                ? 'formSheet'
                : "formSheet"
              : 'card',
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.7],
          sheetInitialDetentIndex: 0,
          
          contentStyle: {
            backgroundColor: isLiquidGlassAvailable()
              ? "transparent"
              : themeColors.background,
          },
          headerStyle: {
            backgroundColor:
              Platform.OS === "ios"
                ? "transparent"
                : themeColors.background,
          },
          headerBlurEffect: isLiquidGlassAvailable()
            ? undefined
            : colorScheme === "dark"
              ? "dark"
              : "light",
        }}
      />
      <Stack.Screen name="sub_pages/editors" 
      options={{ 
        title: t('home.bip_editors'), 
        headerShown: true, headerBackButtonDisplayMode: 'minimal', 
        headerTransparent: true,
        }} 
        />
      <Stack.Screen name="sub_pages/hours" options={{ title: t('home.opening_hours'), headerShown: true, headerBackButtonDisplayMode: 'minimal', headerTransparent: true }} />
      <Stack.Screen name="sub_pages/bank_accounts" options={{ title: t('home.bank_accounts'), headerShown: true, headerBackButtonDisplayMode: 'minimal', headerTransparent: true }} />
      {/* <Stack.Screen name="subpage" options={{ title: 'Подстраница Główna' }} /> */}
    </Stack>
  );
}