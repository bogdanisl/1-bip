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
  const themeColors = colorScheme == 'dark'? Colors.dark:Colors.light
  const { t } = useTranslation()
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);

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
          title: selectedBip?t('home_tab'):t('demo'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name={selectedBip?"home":'bolt'} color={color} />,
        }}
      />
      <Tabs.Screen
        name="recent"
        options={{
          title: t('recents'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='clock-o' color={color} />,
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
        <Badge>15</Badge>
        <Label>{selectedBip?t('home_tab'):t('demo')}</Label>
        <Icon  sf={{ default:selectedBip?'house':'bolt',selected:selectedBip?'house.fill':'bolt.fill'}}drawable="ic_house" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="recent">
        <Badge>3</Badge>
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