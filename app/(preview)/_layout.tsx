import { HapticTab } from "@/src/components/haptic-tab";
import { Colors } from "@/src/constants/theme";
import { useSelectedBipStore } from "@/src/hooks/use-selected-bip";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Badge, Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { useTranslation } from 'react-i18next';
import { Platform, useColorScheme } from 'react-native';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation()

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
          title: t('about'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name={'info'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="instruction"
        options={{
          title: t('instruction'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='file' color={color} />,
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
        name="selector"

        options={{
          title: t('select'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='sign-in' color={color} />,
        }}
      />
    </Tabs>
    ):(
      <NativeTabs tintColor={'#b50315'} disableTransparentOnScrollEdge>
      <NativeTabs.Trigger name="about">
        <Label>{t('O Aplikacji')}</Label>
        <Icon  sf={{ default:'info.square',selected:'info.square.fill'}}drawable="ic_house" />
      </NativeTabs.Trigger>
      {/* <NativeTabs.Trigger name="instruction">
        <Label>{t('Instrukcja')}</Label>
        <Icon  sf={{ default:'book',selected:'book.fill'}}drawable="ic_house" />
      </NativeTabs.Trigger> */}
          <NativeTabs.Trigger name="contact">
        <Label>{t('contact')}</Label>
        <Icon sf={{ default:'phone',selected:'phone.fill'}} drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name={"selector"}>
        <Icon sf={{ default:'building.columns',selected:'building.columns.fill'}} drawable="custom_settings_drawable" />
        <Label>{t('Wybierz BIP')}</Label>
      </NativeTabs.Trigger>

    </NativeTabs>)
  );
}