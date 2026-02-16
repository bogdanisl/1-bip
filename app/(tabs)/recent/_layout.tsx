import { Colors } from '@/src/constants/theme';
import { useColorScheme } from '@/src/hooks/use-color-scheme.web';
import { MaterialIcons } from '@expo/vector-icons';
import { osName } from 'expo-device';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform, Text, TouchableOpacity } from 'react-native';

export default function RecentLayout() {
  const themeColors = useColorScheme() == 'dark' ? Colors.dark : Colors.light;
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTintColor: themeColors.tint,
          headerTitleStyle: { color: themeColors.text },
          headerStyle: {
            backgroundColor: Platform.OS == 'ios'
              ? "transparent"
              : themeColors.background_2,
          },
          headerBlurEffect: isLiquidGlassAvailable() ? 'none' : useColorScheme() == 'dark' ? 'dark' : 'light',

          headerLargeTitle: true,
          title: t('recents'),
          headerTitle: () => Platform.OS == 'android' ?
            <Text style={{ color: themeColors.text, fontSize: 24 }}>
              {t('recents')}
            </Text>
            : undefined,

          headerSearchBarOptions: {
            headerIconColor: themeColors.icon,
            tintColor: themeColors.tint,
            textColor: themeColors.text,
            hintTextColor: themeColors.tint,
            placeholder: t('search_article'),
            onChangeText: (event) => {
              router.setParams({
                q: event.nativeEvent.text,
              });
            },
          },
        }}
      />
      < Stack.Screen name="[slug]/index"
        options={
          {
            title: '',
            headerShown: true,
            headerBackButtonDisplayMode: Platform.OS == 'ios' ? isLiquidGlassAvailable() ? 'minimal' : 'default' : 'generic',
            headerTransparent: Platform.OS == 'ios' ? true : false,
            headerBlurEffect: isLiquidGlassAvailable() ? 'none' : useColorScheme() == 'dark' ? 'dark' : 'light',
            headerTintColor: themeColors.tint
          }
        }
      />
      < Stack.Screen name="[slug]/[file_uri]"
        options={{
          headerShown: Platform.OS === "ios" ? true : true,
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerLargeTitle: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => { router.back() }} style={{ width: 34, height: 34, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name='close' size={28} color={isLiquidGlassAvailable() ? themeColors.text : themeColors.tint} style={isLiquidGlassAvailable() ? { paddingLeft: 2 } : {}}></MaterialIcons>
            </TouchableOpacity>
          ),
          title: "",

          presentation:
            Platform.OS === "ios"
              ? isLiquidGlassAvailable() && osName !== "iPadOS"
                ? 'modal'
                : 'modal'
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
            : useColorScheme() === "dark"
              ? "dark"
              : "light",
        }}
      />
    </Stack >
  );
}