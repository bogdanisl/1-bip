import { HapticTab } from "@/src/components/haptic-tab";
import { Colors } from "@/src/constants/theme";
import { useSelectedBipStore } from "@/src/hooks/use-selected-bip";
import { useAppTheme } from "@/src/hooks/use-theme-colors";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Badge, Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

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
  const { t } = useTranslation()


  return (
    (Platform.OS == 'android') ? (
      // <Tabs
      //   screenOptions={{
      //     tabBarActiveTintColor: theme.tint,
      //     tabBarInactiveTintColor: 'gray',
      //     tabBarStyle: { backgroundColor: theme.background },
      //     headerShown: false,
      //     tabBarLabelStyle: { fontSize: 11 },
      //     tabBarButton: HapticTab
      //   }}
      // >
      //   <Tabs.Screen
      //     name="about"
      //     options={{
      //       title: t('about_app'),
      //       tabBarIcon: ({ color }) => <FontAwesome size={28} name={'info'} color={color} />,
      //     }}
      //   />
      //   <Tabs.Screen
      //     name="selector"

      //     options={{
      //       title: t('select_bip'),
      //       tabBarIcon: ({ color }) => <FontAwesome size={28} name='sign-in' color={color} />,
      //     }}
      //   />
      //   <Tabs.Screen
      //     name="contact"
      //     options={{
      //       title: t('contact'),
      //       tabBarIcon: ({ color }) => <FontAwesome size={28} name="phone" color={color} />,
      //     }}
      //   />
      //   <Tabs.Screen
      //     name="settings"
      //     options={{
      //       title: t('settings'),
      //       tabBarIcon: ({ color }) => <FontAwesome size={28} name='gear' color={color} />,
      //     }}
      //   />
      // </Tabs>

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
          name="about"
          options={{
            title: t('about_app'),
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                name="information-circle-outline"
                selectedName="information-circle"
                focused={focused}
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tabs.Screen
          name='selector'
          options={{
            title: t('select_bip'),
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                name='business-outline'
                selectedName='business'
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
        <NativeTabs.Trigger name="about">
          <Label>{t('about_app')}</Label>
          <Icon sf={{ default: 'info.square', selected: 'info.square.fill' }} drawable="ic_house" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name={"selector"}>
          <Icon sf={{ default: 'building.columns', selected: 'building.columns.fill' }} drawable="custom_settings_drawable" />
          <Label>{t('select_bip')}</Label>
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
