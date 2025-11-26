// src/components/pages/profile/Profile.tsx — БЕЗ NativeWind
import ListButton from '@/components/buttons/ListButton';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
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



  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

         <View style={[styles.block, styles.mt50, { backgroundColor: themeColors.background_2 }]}>
          <ListButton
            icon='feed'
            label={t('change_bip_connection')}
            onPress={() => router.replace('/(tabs)/settings/BipSelect')}
          />
        </View>

        {/* Language & Theme */}
        <View style={[styles.block, { backgroundColor: themeColors.background_2, marginTop:30 }]}>
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


        
      </ScrollView>
    </View>
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
    paddingTop:0
  },
  block: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  mt50: {
    marginTop: 50,
  },
});