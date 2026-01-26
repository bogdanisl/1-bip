// src/components/pages/profile/Profile.tsx — БЕЗ NativeWind
import ListButton from '@/components/buttons/ListButton';
import { Colors } from '@/constants/theme';
import { Host, Picker } from '@expo/ui/swift-ui';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Notifications from 'expo-notifications';
import {
  Platform,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View
} from 'react-native';

const Profile = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [userName, setUserName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      Notifications.requestPermissionsAsync({
        ios: {
          allowBadge: true,
        },
      });
    }
  }, []);

  const setAppBadge = async (value: number) => {
    try {
      await Notifications.setBadgeCountAsync(value);
    } catch (e) {
      console.warn('Failed to set badge', e);
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior='always' contentContainerStyle={styles.scrollContent}>

      <View style={[styles.block, { backgroundColor: themeColors.background_2 }]}>
        <ListButton
          icon='feed'
          label={t('change_bip_connection')}
          onPress={() => router.replace('/(tabs)/settings/BipSelect')}
        />
      </View>

      {/* Language & Theme */}
      <View style={[styles.block, { backgroundColor: themeColors.background_2, marginTop: 30 }]}>
        <ListButton
          icon="language"
          label={t('language')}
          onPress={() => router.push('/(tabs)/settings/language')}
        />
        <ListButton
          icon="adjust"
          label={t('color_theme')}
          onPress={() => router.push('/(tabs)/settings/themePage')}
          isLast
        />
      </View>
      <View style={[styles.block, { backgroundColor: themeColors.background_2, marginTop: 30 }]}>
        {/* {Platform.OS == 'ios' && (
          <Host style={{ height: 100 }}>
              <Picker
                label='sadad'
                options={['0', '1', '2', '3', '4', '5']}
                selectedIndex={selectedIndex}
                onOptionSelected={({ nativeEvent: { index } }) => {
                  setSelectedIndex(index);
                  setAppBadge(index);
                }}
                variant='menu'
                color={themeColors.text}
              />
          </Host>
        )} */}
      </View>
    </ScrollView>
  );
};

export default Profile;

// === ОТДЕЛЬНЫЙ STYLESHEET ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 80,
  },
  block: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  mt50: {
    marginTop: 50,
  },
});