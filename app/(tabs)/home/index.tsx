// app/(tabs)/home.tsx
import { Colors } from '@/constants/theme';
import { RelativePathString, router, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../../../assets/images/icon_svg.svg';
import {
  Dimensions,
  Image,
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
const { width } = Dimensions.get('window');

type Bip = {
  id: string;
  code: string;
  name: string;
};

export default function HomePage() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  //const [selectedBip, setSelectedBip] = useState<Bip | null>(null);
  const [loading, setLoading] = useState(true);
  const [SavedBipsArray, setSavedBipsArray] = useState<Bip[] | null>(null);
  const today = new Date();
  const dayName = today.toLocaleDateString('pl-PL', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });

  const menuItems = [
    { title: t('home.office_data'), subtitle: t('home.office_data_desc'), icon: 'account-balance', route: '/(tabs)/home/sub_pages/data' },
    { title: t('home.opening_hours'), subtitle: t('home.opening_hours_desc'), icon: 'schedule', route: '/(tabs)/home/sub_pages/hours' },
    { title: t('home.positions'), subtitle: t('home.positions_desc'), icon: 'work', route: '/positions' },
    { title: t('home.bank_accounts'), subtitle: t('home.bank_accounts_desc'), icon: 'account-balance-wallet', route: '/(tabs)/home/sub_pages/bank_accounts' },
    { title: t('home.downloads'), subtitle: t('home.downloads_desc'), icon: 'download', route: '/downloads' },
    { title: t('home.bip_editors'), subtitle: t('home.bip_editors_desc'), icon: 'group', route: '/(tabs)/home/sub_pages/editors' },
    { title: t('home.visit_statistics'), subtitle: t('home.visit_statistics_desc'), icon: 'bar-chart', route: '/statistics' },
    { title: t('home.search_employee'), subtitle: t('home.search_employee_desc'), icon: 'person-search', route: '/employee-search' },
  ];

  const handlePress = (route: RelativePathString) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(route);
  };

  useEffect(() => {
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
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Red → Dark Blue Header */}
        <LinearGradient
          colors={['#b50315', '#20313b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: 50, paddingHorizontal: 20, paddingBottom: 40 }}
        >
          {/* Weather + Search */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, marginTop:5 }}>
            <View style={{flexDirection:'row', gap: 8}}>
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
              {selectedBip?.name ?? 'GMINA TESTOWA'}
            </Text>

            {/* Logo with original wireframe globe background */}
            <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center', width: 140, height: 140, padding: 10 }}>
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
        <View style={{
          marginTop: -20,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: theme.background,
          paddingHorizontal: 16,
          paddingTop: 30,
        }}>
          {/* <InfoCarousel></InfoCarousel> */}

          <View
            style={{
              backgroundColor: theme.background_2,
              borderRadius: 16,
              padding: 20,
              marginBottom: 28,
              flexDirection: 'row',
              justifyContent: 'space-around',
              elevation: 6,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 32, fontWeight: 'bold', color: theme.tint }}>127</Text>
              <Text style={{ color: theme.icon, fontSize: 13 }}>Nowe uchwały</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#e74c3c' }}>8</Text>
              <Text style={{ color: theme.icon, fontSize: 13 }}>Do przeczytania</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#2ecc71' }}>42</Text>
              <Text style={{ color: theme.icon, fontSize: 13 }}>Archiwum</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
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