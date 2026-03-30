// src/components/pages/profile/Profile.tsx — БЕЗ NativeWind
import ListButton from '@/src/components/buttons/ListButton';
import { Host, Picker } from '@expo/ui/swift-ui';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import * as Notifications from 'expo-notifications';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import { useAppTheme } from '@/src/hooks/use-theme-colors';

const SettingsScreen = () => {
  const { t } = useTranslation();
  const { theme: themeColors } = useAppTheme();
  const selectedBip = useSelectedBipStore((s) => s.selectedBip);
  const link = selectedBip ? '/(tabs)/settings' : '/(preview)/settings'

  // React.useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     Notifications.requestPermissionsAsync({
  //       ios: {
  //         allowBadge: true,
  //       },
  //     });
  //   }
  // }, []);

  const handleChangeBip = async () => {
    Alert.alert(
      t('change_bip_title'),
      t('change_bip_message'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('continue'),
          style: 'destructive',
          onPress: () => {
            router.replace('/(preview)/selector');
          },
        },
      ],
      { cancelable: true }
    );
    //router.replace('/(preview)/selector');
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior='always' contentContainerStyle={styles.scrollContent}>

      {selectedBip &&
        <View style={[styles.block, { backgroundColor: themeColors.background_2, marginBottom: 30 }]}>
          <ListButton
            icon='feed'
            label={t('change_bip_connection')}
            onPress={handleChangeBip}
          />
        </View>
      }

      {/* Language & Theme */}
      <View style={[styles.block, { backgroundColor: themeColors.background_2 }]}>
        <ListButton
          icon="language"
          label={t('language')}
          onPress={() => router.push('./settings/language')}
        />
        <ListButton
          icon="adjust"
          label={t('color_theme')}
          onPress={() => router.push('./settings/themePage')}
          isLast
        />
      </View>
      <View style={[styles.block, { backgroundColor: themeColors.background_2, marginTop: 30 }]}>
        {selectedBip &&
          (
            <>
              <ListButton
                icon="gavel"
                label={t('access_declaration')}
                onPress={() => router.push('./settings/agreements/accessDeclaration')}
              />
              <ListButton
                icon='shield'
                label={t('privacy_policy')}
                onPress={() => router.push('./settings/agreements/privacyPolicy')}
              />
            </>
          )
        }
        <ListButton
          icon='file-text'
          label={t('statute')}
          onPress={() => router.push('./settings/agreements/statute')}
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

export default SettingsScreen;

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
