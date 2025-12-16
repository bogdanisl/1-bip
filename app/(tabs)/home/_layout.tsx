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
      <Stack.Screen name="index" options={{ title: t('home_tab'), headerShown: false, headerTransparent: true }} />

      <Stack.Screen name="sub_pages/data"
        options={{
          headerShown: true,
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerLargeTitle: false,
          headerTintColor: themeColors.tint,
          headerBackButtonDisplayMode: isLiquidGlassAvailable() ? 'minimal' : 'default',
          headerTitleStyle: { color: themeColors.text },
          title: t('home.office_data'),
          headerStyle: {
            backgroundColor:
              Platform.OS === "ios"
                ? "transparent"
                : themeColors.background_2,
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
          headerShown: true,
          headerBackButtonDisplayMode: isLiquidGlassAvailable() ? 'minimal' : 'default',
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerBlurEffect: isLiquidGlassAvailable()
            ? undefined
            : colorScheme === "dark"
              ? "dark"
              : "light",
          headerSearchBarOptions: {
            headerIconColor: themeColors.icon,
            tintColor: themeColors.tint,
            textColor: themeColors.text,
            hintTextColor: themeColors.tint,
            placeholder: t('home.search_editor'),
            onChangeText: (event) => {
              router.setParams({
                q: event.nativeEvent.text,
              });
            },
          },
          headerTintColor: themeColors.tint,
          headerTitleStyle: { color: themeColors.text },

        }}
      />
      <Stack.Screen name="sub_pages/employees"
        options={{
          title: t('home.positions'),
          headerShown: true,
          headerBackButtonDisplayMode: isLiquidGlassAvailable() ? 'minimal' : 'default',
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerBlurEffect: isLiquidGlassAvailable()
            ? undefined
            : colorScheme === "dark"
              ? "dark"
              : "light",
          headerSearchBarOptions: {
            headerIconColor: themeColors.icon,
            tintColor: themeColors.tint,
            textColor: themeColors.text,
            hintTextColor: themeColors.tint,
            placeholder: t('home.search_employee'),
            onChangeText: (event) => {
              router.setParams({
                q: event.nativeEvent.text,
              });
            },
          },
          headerTintColor: themeColors.tint,
          headerTitleStyle: { color: themeColors.text },

        }}
      />
      <Stack.Screen name="sub_pages/employee/[id]"
        options={{
          headerShown: Platform.OS === "ios" ? false : true,
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerLargeTitle: false,
          title: "",
          headerTitleStyle: { color: themeColors.text },
          headerBackButtonDisplayMode: isLiquidGlassAvailable() ? 'minimal' : 'default',
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
      <Stack.Screen name="sub_pages/editor/[id]"
        options={{
          headerShown: Platform.OS === "ios" ? false : true,
          headerTransparent: Platform.OS === "ios" ? true : false,
          headerLargeTitle: false,
          title: "",
          headerTitleStyle: { color: themeColors.text },
          headerBackButtonDisplayMode: isLiquidGlassAvailable() ? 'minimal' : 'default',
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
              : themeColors.background_2,
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
      <Stack.Screen name="sub_pages/hours" options={{
        title: t('home.opening_hours'),
        headerTintColor: themeColors.tint,
        headerTitleStyle: { color: themeColors.text },
        headerShown: true,
        headerBlurEffect: isLiquidGlassAvailable()
          ? undefined
          : colorScheme === "dark"
            ? "dark"
            : "light",
        headerBackButtonDisplayMode: 'minimal',
        headerTransparent: Platform.OS === "ios" ? true : false,
      }} />

      <Stack.Screen name="sub_pages/bank_accounts" options={{
        headerShown: true,
        headerTransparent: Platform.OS === "ios" ? true : false,
        headerLeft: () => (
            <TouchableOpacity onPress={() => { router.back() }} style={{ width: 34, height: 34, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name='close' size={28} color={isLiquidGlassAvailable()?themeColors.text:themeColors.tint} style={isLiquidGlassAvailable() ? { paddingLeft: 2 } : {}}></MaterialIcons>
            </TouchableOpacity>
          ),
        headerLargeTitle: false,
        title: "",
        headerTitleStyle: { color: themeColors.text },
        headerBackButtonDisplayMode: isLiquidGlassAvailable() ? 'minimal' : 'default',
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
            : themeColors.background_2,
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
      }} />

      <Stack.Screen name="sub_pages/change_register" options={{
        title: t('home.change_log'),
        headerTintColor: themeColors.tint,
        headerTitleStyle: { color: 'black' },
        headerShown: true,
        headerBlurEffect: isLiquidGlassAvailable()
          ? undefined
          : colorScheme === "dark"
            ? "dark"
            : "light",
        headerBackButtonDisplayMode: 'minimal',
        headerTransparent: Platform.OS === "ios" ? true : false,
      }} />
      <Stack.Screen name="sub_pages/visit_statistics" options={{
        title: t('home.visit_statistics'),
        headerTintColor: themeColors.tint,
        headerTitleStyle: { color: 'black' },
        headerShown: true,
        headerBlurEffect: isLiquidGlassAvailable()
          ? undefined
          : colorScheme === "dark"
            ? "dark"
            : "light",
        headerBackButtonDisplayMode: 'minimal',
        headerTransparent: Platform.OS === "ios" ? true : false,
      }} />
      <Stack.Screen name="sub_pages/downloads" options={{
        title: t('home.downloads'),
        headerTintColor: themeColors.tint,
        headerTitleStyle: { color: themeColors.text },
        headerShown: true,
        headerBlurEffect: isLiquidGlassAvailable()
          ? undefined
          : colorScheme === "dark"
            ? "dark"
            : "light",
        headerBackButtonDisplayMode: 'minimal',
        headerTransparent: Platform.OS === "ios" ? true : false,
        headerSearchBarOptions: {
          headerIconColor: themeColors.icon,
          tintColor: themeColors.tint,
          textColor: themeColors.text,
          hintTextColor: themeColors.tint,
          placeholder: t('find'),
          onChangeText: (event) => {
            router.setParams({
              q: event.nativeEvent.text,
            });
          },
        },
      }} />
      <Stack.Screen name="sub_pages/downloads/[file_uri]"
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
      {/* <Stack.Screen name="subpage" options={{ title: 'Подстраница Główna' }} /> */}
    </Stack>
  );
}