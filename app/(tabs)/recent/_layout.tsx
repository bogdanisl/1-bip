import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme.web';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform, Text } from 'react-native';

export default function RecentLayout() {
  const themeColors = useColorScheme() == 'dark' ? Colors.dark : Colors.light;
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerShown: false,  // Показывать заголовки на подстраницах, если нужно (можно false)
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown:true,
          headerTintColor:themeColors.tint,
          headerTitleStyle:{color:themeColors.text},
          headerStyle: {
            backgroundColor: Platform.OS == 'ios'
              ? "transparent"
              : themeColors.background_2,
          },
          headerBlurEffect: isLiquidGlassAvailable() ? 'none' : useColorScheme() == 'dark' ? 'dark' : 'light',

          headerLargeTitle: true,
          title: t('recents'),
          headerTitle: () => Platform.OS == 'android'?
          <Text style={{color:themeColors.text, fontSize:24}}>
                {t('recents')}
          </Text>
          :undefined,
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
      <Stack.Screen name="[slug]"
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
      {/* Добавьте больше <Stack.Screen> для других подстраниц */}
    </Stack>
  );
}