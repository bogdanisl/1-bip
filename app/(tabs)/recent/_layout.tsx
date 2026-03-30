import { useAppTheme } from '@/src/hooks/use-theme-colors';
import { MaterialIcons } from '@expo/vector-icons';
import { osName } from 'expo-device';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform, Text, TouchableOpacity } from 'react-native';

export default function RecentLayout() {
  const { theme: themeColors, isDark } = useAppTheme();
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: themeColors.background }
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTintColor: themeColors.tint,
          headerTitleStyle: { color: themeColors.text },
          headerStyle: {
            backgroundColor: Platform.OS === 'ios'
              ? 'transparent'
              : themeColors.background_2,
          },
          headerBlurEffect: isLiquidGlassAvailable() ? 'none' : 'regular',
          headerLargeStyle: {
            backgroundColor: 'transparent'
          },
          headerLargeTitleShadowVisible: false, headerLargeTitle: true,
          title: t('recents'),
          headerTitle: () => Platform.OS === 'android' ?
            <Text style={{ color: themeColors.text, fontSize: 24 }}>
              {t('recents')}
            </Text>
            : undefined,
        }}
      />
      < Stack.Screen name="[slug]/index"
        options={
          {
            title: '',
            headerShown: true,
            headerLargeStyle: { backgroundColor: 'transparent' },
            headerBackButtonDisplayMode: Platform.OS === 'ios' ? isLiquidGlassAvailable() ? 'minimal' : 'default' : 'generic',
            headerTransparent: Platform.OS === 'ios' ? true : false,
            headerBlurEffect: isLiquidGlassAvailable() ? 'none' : isDark ? 'dark' : 'light',
            headerTintColor: themeColors.tint
          }
        }
      />
      <Stack.Screen
        name="[slug]/version/[versionId]"
        options={{
          title: t('change_register.compare_title'),
          headerShown: true,
          headerLargeStyle: { backgroundColor: 'transparent' },
          headerBackButtonDisplayMode: Platform.OS === 'ios' ? isLiquidGlassAvailable() ? 'minimal' : 'default' : 'generic',
          headerTransparent: Platform.OS === 'ios' ? true : false,
          headerBlurEffect: isLiquidGlassAvailable() ? 'none' : isDark ? 'dark' : 'light',
          headerTintColor: themeColors.tint,
        }}
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
            : isDark
              ? "dark"
              : "light",
        }}
      />
    </Stack >
  );
}
