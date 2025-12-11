// app/(tabs)/home.tsx
import { Colors } from '@/constants/theme';
import { RelativePathString, router, Stack } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../../../assets/images/icon_svg.svg';
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import SearchModal from '@/components/AnimatedSearchButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelectedBipStore } from '@/hooks/use-selected-bip';
import { Button } from '@expo/ui/swift-ui';
import { HeaderButton } from '@/components/buttons/HeaderButtons/HeaderButton';
import { GlassView } from 'expo-glass-effect';
import { showMessage } from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OpeningHoursCard from './sub_pages/hours';
import OfficeInfoCard from './sub_pages/data';
import BankAccountCard from './sub_pages/bank_accounts';
import * as Application from 'expo-application'
import { checkVersion } from '@/utils/versionControl';
import { VersionResponse } from '@/types/VersionResponse';

const { width } = Dimensions.get('window');
const GOOGLE_PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.anonymous.Alpanet&hl=pl'
const APP_STORE_LINK = 'https://apps.apple.com/pl/app/alpanet/id6749890567?l=pl'

type Bip = {
  id: string;
  code: string;
  name: string;
};

export default function HomePage() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  //const [selectedBip, setSelectedBip] = useState<Bip | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [SavedBipsArray, setSavedBipsArray] = useState<Bip[] | null>(null);
  const today = new Date();
  const dayName = today.toLocaleDateString('pl-PL', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });

  const menuItems = [
    { title: t('home.office_data'), subtitle: t('home.office_data_desc'), icon: 'account-balance', route: '/(tabs)/home/sub_pages/data' },
    // { title: t('home.opening_hours'), subtitle: t('home.opening_hours_desc'), icon: 'schedule', route: '/(tabs)/home/sub_pages/hours' },
    { title: t('home.positions'), subtitle: t('home.positions_desc'), icon: 'work', route: '/(tabs)/home/sub_pages/employees' },
    //{ title: t('home.bank_accounts'), subtitle: t('home.bank_accounts_desc'), icon: 'account-balance-wallet', route: '/(tabs)/home/sub_pages/bank_accounts' },
    { title: t('home.downloads'), subtitle: t('home.downloads_desc'), icon: 'download', route: '/(tabs)/home/sub_pages/downloads' },
    { title: t('home.bip_editors'), subtitle: t('home.bip_editors_desc'), icon: 'group', route: '/(tabs)/home/sub_pages/editors' },
    { title: t('home.visit_statistics'), subtitle: t('home.visit_statistics_desc'), icon: 'bar-chart', route: '/(tabs)/home/sub_pages/visit_statistics' },
    { title: t('home.change_log'), subtitle: t('home.change_log_desc'), icon: 'archive', route: '/(tabs)/home/sub_pages/change_register' },
  ];

  const handlePress = (route: RelativePathString) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(route);
  };



  async function promptUpdate(result: VersionResponse) {
    if (!result) {
      setIsUpdateAvailable(false);
      return;
    }
    if (!result.updateAvailable) {
      setIsUpdateAvailable(false);
      return;
    }

    if (result.mandatory) {
      Alert.alert(
        t('update_required_title'),
        t('update_required', { version: result.latestVersion }),
        [
          {
            text: t('update'),
            onPress: () => {
              const url =
                Platform.OS === 'ios' ? APP_STORE_LINK : GOOGLE_PLAY_STORE_LINK
              Linking.openURL(url).catch(err =>
                console.error('Open store error', err)
              )
              setTimeout(() => {
                router.replace('./')
              }, 2000)

            },

          },
        ],
        { cancelable: false }
      )
      setIsUpdateAvailable(true);
    }
    else {
      setIsUpdateAvailable(true);
    }

  }


  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate an async refresh action
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const checkUpdate = async () => {
      const result = await checkVersion();
      promptUpdate(result!);
    }
    const loadSelectedBip = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('selectedBipCities');
        //console.log('Raw from storage:', jsonValue);

        if (jsonValue != null) {
          const parsed = JSON.parse(jsonValue);

          // If multiple cities saved → take first
          if (parsed.length > 1) {
            setSavedBipsArray(parsed)
          }
          else {
            setSavedBipsArray(null);
          }
        }
      } catch (error) {
        console.error('Failed to load selected BIP:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSelectedBip();
    checkUpdate();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, marginTop: 0 }}
      >

        {/* Red → Dark Blue Header */}
        <LinearGradient
          colors={['#b50315', '#20313b']}
          start={{ x: 0, y: 0.4 }}
          end={{ x: 1, y: 1 }}
          style={{ marginTop: -300, paddingHorizontal: 20, paddingBottom: 40 }}
        >
          <Image
            source={require('@/assets/images/shape.3.50.webp')}
            style={{
              backgroundColor: 'transparent',
              position: 'absolute',
              top: 230,
              left: -50,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              alignSelf: 'center',
              opacity: 1,        // adjust for blending
              transform: [{ rotate: '180deg' }]
            }}
            resizeMode='contain'
          />
          {/* Weather + Search */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, marginTop: insets.top + 300 }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {(SavedBipsArray ? SavedBipsArray.length > 1 : false) && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>

                  {/* NEW: Touchable temperature button – identical style to the search one */}
                  <TouchableOpacity
                    onPress={() => {
                      // your action, e.g. open city list, refresh, etc.
                      router.push({
                        pathname: '/(tabs)/home/sub_pages/bip_selector'
                      })
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'rgba(255,255,255,0.25)',
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      maxWidth: 200,
                      maxHeight: 45,
                      borderRadius: 25,
                      gap: 6,                    // space between icon and text
                    }}
                    activeOpacity={0.7}
                  >
                    {/* Optional location icon – looks great with temperature */}

                    <Text style={{ color: 'white', fontSize: 15 }}>
                      {t('change_bip')}
                    </Text>
                    <MaterialIcons name='swap-horiz' size={20} color="white" />

                  </TouchableOpacity>

                  {/* Uncomment if you want the AQI pill back later */}
                  {/* <View style={{ backgroundColor: '#00d4aa', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>AQI 18</Text>
    </View> */}
                </View>
              )}
              <TouchableOpacity
                onPress={() => {
                  // your action, e.g. open city list, refresh, etc.


                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  maxWidth: 200,
                  maxHeight: 45,
                  borderRadius: 25,
                  gap: 6,                    // space between icon and text
                }}
                activeOpacity={0.7}
              >
                {/* Optional location icon – looks great with temperature */}
                <Text style={{ color: 'white', fontSize: 15 }}>
                  2°
                </Text>
                <MaterialIcons name='snowing' size={20} color="white" />

              </TouchableOpacity>
            </View>
            {/* Existing search button – unchanged */}
            <TouchableOpacity
              onPress={() => setIsSearchModalVisible(true)}
              style={{
                flexDirection: 'row',
                backgroundColor: 'rgba(255,255,255,0.25)',
                paddingLeft: 10,
                paddingRight: 15,
                paddingVertical: 10,
                borderRadius: 25,
                gap: 8,
                alignItems: 'center',
              }}
            >
              <MaterialIcons name="search" size={20} color="white" />
              <Text style={{ color: 'white', fontSize: 15 }}>Szukaj</Text>
            </TouchableOpacity>
          </View>

          {/* Date */}
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15, marginBottom: 0 }}>
            {dayName.charAt(0).toUpperCase() + dayName.slice(1)}, {dateStr}
          </Text>
          {/* Title + Logo with Globe Background */}
          <Logo width={90} height={60} fill="white" style={{ marginTop: 0, marginBottom: 0 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 24, fontWeight: '800', color: 'white', flex: 1 }}>
              {selectedBip?.name ?? 'Gmina Testowa'}
              <Text style={{ fontSize: 15, color: Colors.dark.subText, fontWeight: '600' }}>
                {`\n${(selectedBip?.code.slice(0, 2) ?? '11') + '-' + (selectedBip?.code.slice(2) ?? '222')} Testowo\nTestowa 11A`}
              </Text>
            </Text>

            {/* Logo with original wireframe globe background */}
            <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center', width: 140, height: 140, padding: 80, backgroundColor: 'transparent', borderRadius: 90 }}>
              <Image
                source={require('@/assets/images/sphere.1.webp')}
                style={{ width: 140, height: 140, position: 'absolute' }}
                resizeMode="contain"
              />
              <Image
                source={require('@/assets/images/Logo_gmina.webp')}
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: 'transparent',
                  borderRadius: 0,
                }}
                resizeMode="contain"
              />
            </View>
          </View>
        </LinearGradient>

        {/* Clean White Cards Area – No Gradients */}
        {isUpdateAvailable &&
          <View style={{
            backgroundColor: 'black',
            marginTop: -20,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,

          }}>

            <TouchableOpacity
              style={{
                backgroundColor: 'transparent',
                width: '100%'
              }}
              activeOpacity={0.5}
              onPress={() => {
                const url =
                  Platform.OS === 'ios' ? APP_STORE_LINK : GOOGLE_PLAY_STORE_LINK
                Linking.openURL(url).catch(err =>
                  console.error('Open store error', err)
                )
              }
              }
            >
              <LinearGradient
                colors={['#53779a', '#1DB954']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  padding: 10,
                  paddingBottom: 25,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center'
                }}

              >
                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Poppins-Medium' }}>
                  {t('update_available')}{' '}
                </Text>
                <MaterialIcons name='downloading' color={'white'} size={18}></MaterialIcons>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        }

        <View style={{
          marginTop: -15,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: theme.background,
          paddingHorizontal: 16,
          paddingTop: 30,
        }}>



          <OpeningHoursCard />
          {/* <OfficeInfoCard/> */}
          <BankAccountCard />

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 16, justifyContent: 'center' }}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.85}
                onPress={() => handlePress(item.route as RelativePathString)}
                style={{
                  width: (width - 48) / 2,
                  height: 130,
                  backgroundColor: theme.background_2,
                  borderRadius: 20,
                  padding: 16,
                  justifyContent: 'space-between',
                  elevation: 8,
                }}
              >
                <MaterialIcons name={item.icon as any} size={36} color={theme.tint} />
                <View>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: theme.text, marginBottom: 4 }}>
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 12, color: theme.icon, lineHeight: 14 }}>
                    {item.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>

            ))}
          </View>
        </View>
        <SearchModal
          visible={isSearchModalVisible}
          onClose={() => setIsSearchModalVisible(false)}
        />
      </ScrollView>
    </View>
  );
}