import { useAppTheme } from "@/src/hooks/use-theme-colors";
import { Tabs } from "expo-router";
import { Badge, Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useHome } from "@/src/features/tabs/home/hooks/use-home";


type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface TabIconProps {
  name: IoniconsName;
  selectedName: IoniconsName;
  focused: boolean;
  color: string;
  size: number;
}

function TabIcon({ name, selectedName, focused, color, size }: TabIconProps) {
  return (
    <Ionicons
      name={focused ? selectedName : name}
      size={size}
      color={color}
    />
  );
}

export default function TabLayout() {
  const { theme } = useAppTheme();
  const { officeData } = useHome();
  const HomePageModeIsSelected = officeData?.homePageMode?.value == 'wybrane'
  const { t } = useTranslation()

  return (
    (Platform.OS == 'android') ? (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.tint,
          tabBarStyle: {
            backgroundColor: theme.background,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: t('home_tab'),
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                name="home-outline"
                selectedName="home"
                focused={focused}
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="recent"
          options={{
            title: HomePageModeIsSelected ? t('articles') : t('recents'),
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                name="time-outline"
                selectedName="time"
                focused={focused}
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="contact"
          options={{
            title: t('contact'),
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                name="call-outline"
                selectedName="call"
                focused={focused}
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: t('settings'),
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                name="settings-outline"
                selectedName="settings"
                focused={focused}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
    ) : (
      <NativeTabs tintColor={theme.tint} disableTransparentOnScrollEdge>
        <NativeTabs.Trigger name="home">
          <Label>{t('home_tab')}</Label>
          <Icon sf={{ default: 'house', selected: 'house.fill' }} drawable='' />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="recent">
          <Label>{HomePageModeIsSelected ? t('articles') : t('recents')}</Label>
          <Icon sf={{ default: HomePageModeIsSelected ? 'newspaper' : 'clock', selected: HomePageModeIsSelected ? 'newspaper.fill' : 'clock.fill' }} drawable="ic_house" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="contact">
          <Label>{t('contact')}</Label>
          <Icon sf={{ default: 'phone', selected: 'phone.fill' }} drawable="custom_android_drawable" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name={"settings"}>
          <Icon sf={{ default: 'gearshape', selected: 'gearshape.fill' }} drawable="custom_settings_drawable" />
          <Label>{t('settings')}</Label>
        </NativeTabs.Trigger>

      </NativeTabs>)
  );
}
