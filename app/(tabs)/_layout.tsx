import { HapticTab } from "@/components/haptic-tab";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { useTranslation } from 'react-i18next';
import { Platform, useColorScheme } from 'react-native';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation()
  const isAuthorized = false

  return (
    (Platform.OS=='android')?(
          <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#b50315' : '#b50315',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' },
        headerShown: false,
        tabBarLabelStyle: { fontSize: 11 },
        tabBarButton: HapticTab
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t('home'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="promotions"
        options={{
          title: t('promo'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='percent' color={color} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: t('contact'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="phone" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"

        options={{
          title: t('settings'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="gear" color={color} />,
        }}
      />
    </Tabs>
    ):(
      <NativeTabs tintColor={'#b50315'} disableTransparentOnScrollEdge>
      <NativeTabs.Trigger name="home">
        <Label>{t('home_tab')}</Label>
        <Icon  sf={{ default:'house',selected:'house.fill'}}drawable="ic_house" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="recent">
        <Label>{t('recents')}</Label>
        <Icon  sf={{ default:'clock',selected:'clock.fill'}}drawable="ic_house" />
      </NativeTabs.Trigger>
          <NativeTabs.Trigger name="contact">
        <Label>{t('contact')}</Label>
        <Icon sf={{ default:'phone',selected:'phone.fill'}} drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name={"settings"}>
        <Icon sf={{ default:'gearshape',selected:'gearshape.fill'}} drawable="custom_settings_drawable" />
        <Label>{t('settings')}</Label>
      </NativeTabs.Trigger>

    </NativeTabs>)
  );
}