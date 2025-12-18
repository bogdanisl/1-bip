import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Animated,
  useColorScheme,
  FlatList,
  ScrollView
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import FileItem from '@/components/buttons/ItemButton';
import * as Clipboard from 'expo-clipboard';     // ← added
import { showMessage } from 'react-native-flash-message';
import { useTranslation } from 'react-i18next';
import { LinearTransition } from 'react-native-reanimated';
import { Br } from '@/components/Br';
import { OfficeData } from '@/types/OfficeData';
import { officeDataExample } from '@/constants/data_example';
import { useSelectedBipStore } from '@/hooks/use-selected-bip';
import { storage } from '@/utils/storage/asyncStorage';
import { fetchOfficeData } from '@/utils/data';


const ROW_HEIGHT = 70;

const OfficeInfoCard = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language
  const [officeData, setOfficeData] = useState<OfficeData | null>(null)
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);
  const handleCall = () => Linking.openURL(`tel:${officeData?.phone?.content}`);
  const handleEmail = () => Linking.openURL(`mailto:${officeData?.email?.content}`);

  const handleCopy = async (content: string) => {
    await Clipboard.setStringAsync(content);
    showMessage({
      message: t('code_copied'), // "Skopiowano!"
      description: t('code_copied_desc'),
      type: 'success',
      icon: 'success',
      duration: 2500,
    });

  }

  useEffect(() => {
    const getData = async () => {
      if (selectedBip == null) {
        setOfficeData(officeDataExample);
        return;
      }
      const data = await storage.get<OfficeData>(`${selectedBip?.id}/officeData`);
      if (!data) {
        try {
          if (selectedBip.url == '' || selectedBip.url == null) return;
          const fetched = await fetchOfficeData(selectedBip.url);
          if (!fetched) return;
          setOfficeData(fetched);
          await storage.set<OfficeData>(`${selectedBip.id}/officeData`, fetched);
          return;
        }
        catch (e) {
          console.error('Failed to fetch office data in OfficeInfoPage: ', e);
          return;
        }
        setOfficeData(null);
        return;
      }
      else if (!data) {
        setOfficeData(null);
        return;
      }
      setOfficeData(data || null);
    }
    getData();
  }, [selectedBip])


  if (!officeData) {
    return (
      <>
        <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
          <Text style={{ color: theme.text, fontSize: 15, fontWeight: '800', marginBottom: 10, marginTop: 10 }}>
            {t('no_data')}
          </Text>
        </View>
      </>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 20 }}
      >
        <Text
          style={{
            color: theme.text,
            fontSize: 15,
            fontWeight: '800',
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          {officeData?.title ?? t('no_data')}
        </Text>

        <Br />

        <View style={{ gap: 12 }}>
          {officeData?.title && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={officeData.title}
              iconBackground={theme.background}
              details={t('office_name')}
              leftIconName="account-balance"
              disabled
            />
          )}

          {officeData?.address && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={officeData.address.content}
              iconBackground={theme.background}
              details={currentLang == 'pl'? officeData.address.label: t('address')}
              leftIconName="location-on"
              disabled
            />
          )}

          {officeData?.city && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={officeData.city.content}
              iconBackground={theme.background}
              details={currentLang == 'pl'? officeData.city.label: t('city')}
              leftIconName="location-city"
              disabled
            />
          )}

          {officeData?.district && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={officeData.district.content}
              iconBackground={theme.background}
              details={currentLang == 'pl'? officeData.district.label: t('district')}
              leftIconName="domain"
              disabled
            />
          )}

          {officeData?.province && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={officeData.province.content}
              iconBackground={theme.background}
              details={currentLang == 'pl'? officeData.province.label: t('province')}
              leftIconName="domain"
              disabled
            />
          )}

          {officeData?.postalCode && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={officeData.postalCode.content}
              iconBackground={theme.background}
              details={currentLang == 'pl'? officeData.postalCode.label: t('postal_code')}
              leftIconName="location-on"
              rightIconName="content-copy"
              onPress={() => handleCopy(officeData.postalCode!.content)}
            />
          )}

          {officeData?.NIP && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={officeData.NIP.content}
              iconBackground={theme.background}
              details={currentLang == 'pl'? officeData.NIP.label:t('NIP')}
              leftIconName="badge"
              rightIconName="content-copy"
              onPress={() => handleCopy(officeData.NIP!.content)}
            />
          )}

          {officeData?.REGON && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={officeData.REGON.content}
              iconBackground={theme.background}
              details={currentLang == 'pl'? officeData.REGON.label:t('REGON')}
              leftIconName="credit-card"
              rightIconName="content-copy"
              onPress={() => handleCopy(officeData.REGON!.content)}
            />
          )}

          {officeData?.email && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={officeData.email.content}
              iconBackground={theme.background}
              details={currentLang == 'pl'? officeData.email.label:t('email')}
              leftIconName="email"
              rightIconName='message'
              onPress={() => handleEmail()}
            />
          )}

          {officeData?.phone && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={officeData.phone.content}
              iconBackground={theme.background}
              details={currentLang == 'pl'? officeData.phone.label:t('phone')}
              leftIconName="phone"
              rightIconName='call-made'
              onPress={() => handleCall()}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );

};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 12,
    marginTop: 130,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    height: ROW_HEIGHT,
  },
  clickableRow: {
    borderWidth: 1,
    borderColor: '#FFFFFF10',
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dayText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default OfficeInfoCard;