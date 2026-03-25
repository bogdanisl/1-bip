import { Stack } from 'expo-router/stack';
import { useTranslation } from 'react-i18next';
import { Platform, useColorScheme, Text, TouchableOpacity } from 'react-native';
import { isLiquidGlassAvailable } from 'expo-glass-effect'
import { osName } from "expo-device";
import { router } from 'expo-router';
import { HeaderButton } from '@/src/components/buttons/HeaderButtons/HeaderButton';
import { Icon } from 'expo-router/unstable-native-tabs';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/theme';


export default function HomeLayout() {
  const { t } = useTranslation()
  const colorScheme = useColorScheme()
  const themeColors = colorScheme == 'dark' ? Colors.dark : Colors.light

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: Platform.OS === "ios" ? true : false,
        headerBlurEffect: isLiquidGlassAvailable() ? 'none' : 'regular',
        headerLargeTitle: false,
        headerTintColor: themeColors.tint,
        headerBackButtonDisplayMode: isLiquidGlassAvailable() ? 'minimal' : 'default',
        headerTitleStyle: { color: themeColors.text },
        headerLargeStyle: { backgroundColor: 'transparent' }
      }}
    >
      <Stack.Screen name="index" options={{ title: t('home_tab'), headerShown: false, headerTransparent: true }} />

      <Stack.Screen name="data"
        options={{
          title: t('home.office_data'),
        }}
      />
      <Stack.Screen name="bipSelector"
        options={{
          headerShown: Platform.OS === "ios" ? false : true,
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
        }}
      />
      <Stack.Screen name="editors/index"
        options={{
          title: t('home.bip_editors'),


        }}
      />
      <Stack.Screen name="employees/index"
        options={{
          title: t('home.positions'),

        }}
      />
      <Stack.Screen name="employees/[id]"
        options={{
          headerShown: Platform.OS === "ios" ? false : true,
          title: "",
          presentation:
            Platform.OS === "ios"
              ? isLiquidGlassAvailable() && osName !== "iPadOS"
                ? 'formSheet'
                : "formSheet"
              : 'card',
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.6],
          sheetInitialDetentIndex: 0,

          contentStyle: {
            backgroundColor: isLiquidGlassAvailable()
              ? "transparent"
              : colorScheme == 'light' ? themeColors.background : themeColors.background_2,
          },
        }}
      />
      <Stack.Screen name="editors/[id]"
        options={{
          headerShown: Platform.OS === "ios" ? false : true,
          title: "",
          presentation:
            Platform.OS === "ios"
              ? isLiquidGlassAvailable() && osName !== "iPadOS"
                ? 'formSheet'
                : "formSheet"
              : 'card',
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.6],
          sheetInitialDetentIndex: 0,

          contentStyle: {
            backgroundColor: isLiquidGlassAvailable()
              ? "transparent"
              : colorScheme == 'light' ? themeColors.background : themeColors.background_2,
          },
        }}
      />
      <Stack.Screen name="categories/index" options={{
        title: t('home.categories'),
      }}
      />
      <Stack.Screen
        name="categories/[id]/index"

      />
      <Stack.Screen
        name="categories/[id]/[slug]/index"
        options={
          {
            title: '',
          }
        }
      />
      <Stack.Screen name="categories/[id]/[slug]/[file_uri]"
        options={{
          headerShown: Platform.OS === "ios" ? true : true,
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
          }
        }}
      />
      <Stack.Screen name="statistics" options={{
        title: t('home.visit_statistics'),
      }} />

      <Stack.Screen name="changeRegister/index" options={{
        title: t('home.change_log'),
      }} />
      <Stack.Screen name='changeRegister/[slug]/index' options={{
        title: ''
      }} />
      <Stack.Screen name="changeRegister/[slug]/[file_uri]"
        options={{
          headerShown: Platform.OS === "ios" ? true : true,
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
          }
        }}
      />
      <Stack.Screen name="documents/index" options={{
        title: t('home.downloads'),
      }} />

      <Stack.Screen name="instruction_bip"
        options={{
          headerShown: Platform.OS === "ios" ? true : true,
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
          }
        }}
      />

      <Stack.Screen name="documents/[file_uri]"
        options={{
          headerShown: Platform.OS === "ios" ? true : true,
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
        }}
      />
    </Stack>
  );
}
