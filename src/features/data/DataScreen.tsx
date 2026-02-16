import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  useColorScheme,
  ScrollView
} from 'react-native';
import { Colors } from '@/src/constants/theme';
import FileItem from '@/src/components/buttons/ItemButton';
import * as Clipboard from 'expo-clipboard';
import { showMessage } from 'react-native-flash-message';
import { useTranslation } from 'react-i18next';
import { Br } from '@/src/components/Br';
import { OfficeData } from '@/src/types/OfficeData';
import { officeDataExample } from '@/src/constants/data_example';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import { storage } from '@/src/storage/asyncStorage';
import { fetchOfficeData } from '@/src/services/api/data';



const DataScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const { t, i18n } = useTranslation();
  var he = require('he');

  const currentLang = i18n.language
  const [officeData, setOfficeData] = useState<OfficeData | null>(null)
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);
  const handleCall = () => Linking.openURL(`tel:${officeData?.phone?.value}`);
  const handleEmail = () => Linking.openURL(`mailto:${officeData?.email?.value}`);
  const handleWebsite = () => Linking.openURL(`https://${officeData?.website?.value!}`);

  const handleCopy = async (content: string) => {
    await Clipboard.setStringAsync(content);
    showMessage({
      message: t('code_copied'), 
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
          {officeData?.title.value ?? t('no_data')}
        </Text>

        <Br />

        <View style={{ gap: 12 }}>
          {officeData?.name?.value && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={he.decode(officeData.name.value)}
              iconBackground={theme.background}
              details={currentLang == 'pl' ? he.decode(officeData.name.label) : t('office_name')}
              leftIconName="account-balance"
              disabled
            />
          )}

          {officeData?.street?.value && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={he.decode(officeData.street.value)}
              iconBackground={theme.background}
              details={currentLang == 'pl' ? officeData.street.label : t('street')}
              leftIconName="location-on"
              disabled
            />
          )}

          {officeData?.city && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={he.decode(officeData.city.value)}
              iconBackground={theme.background}
              details={currentLang == 'pl' ? officeData.city.label : t('city')}
              leftIconName="location-city"
              disabled
            />
          )}

          {officeData?.region?.value && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={he.decode(officeData.region.value)}
              iconBackground={theme.background}
              details={currentLang == 'pl' ? he.decode(officeData.region.label) : t('district')}
              leftIconName="domain"
              disabled
            />
          )}

          {officeData?.postalCode?.value && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={he.decode(officeData.postalCode.value)}
              iconBackground={theme.background}
              details={currentLang == 'pl' ? officeData.postalCode.label : t('postal_code')}
              leftIconName="location-on"
              rightIconName="content-copy"
              onPress={() => handleCopy(officeData.postalCode!.value!)}
            />
          )}

          {officeData?.nip?.value && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={he.decode(officeData.nip.value)}
              iconBackground={theme.background}
              details={currentLang == 'pl' ? officeData.nip.label : t('NIP')}
              leftIconName="badge"
              rightIconName="content-copy"
              onPress={() => handleCopy(officeData.nip!.value!)}
            />
          )}

          {officeData?.regon?.value && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={he.decode(officeData.regon.value)}
              iconBackground={theme.background}
              details={currentLang == 'pl' ? officeData.regon.label : t('REGON')}
              leftIconName="credit-card"
              rightIconName="content-copy"
              onPress={() => handleCopy(officeData.regon!.value!)}
            />
          )}
          {officeData?.website?.value && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={he.decode(officeData.website.value)}
              iconBackground={theme.background}
              details={currentLang == 'pl' ? officeData.website.label : t('website')}
              leftIconName='language'
              rightIconName='open-in-new'
              onPress={() => handleWebsite()}
            />
          )}
          {officeData?.fax?.value && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={he.decode(officeData.fax.value)}
              iconBackground={theme.background}
              details={currentLang == 'pl' ? officeData.fax.label : t('fax')}
              leftIconName="fax"
              rightIconName="content-copy"
              onPress={() => handleCopy(officeData.postalCode!.value!)}
            />
          )}

          {officeData?.email?.value && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={he.decode(officeData.email.value)}
              iconBackground={theme.background}
              details={currentLang == 'pl' ? officeData.email.label : t('email')}
              leftIconName="email"
              rightIconName='message'
              onPress={() => handleEmail()}
            />
          )}
          {officeData?.emailSecond?.value && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={he.decode(officeData.emailSecond.value)}
              iconBackground={theme.background}
              details={currentLang == 'pl' ? officeData.emailSecond.label : t('email_second')}
              leftIconName="email"
              rightIconName='message'
              onPress={() => handleEmail()}
            />
          )}

          {officeData?.phone?.value && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={he.decode(officeData.phone.value)}
              iconBackground={theme.background}
              details={currentLang == 'pl' ? officeData.phone.label : t('phone')}
              leftIconName="phone"
              rightIconName='call-made'
              onPress={() => handleCall()}
            />
          )}
          {officeData?.phoneSecond?.value && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={he.decode(officeData.phoneSecond.value)}
              iconBackground={theme.background}
              details={currentLang == 'pl' ? officeData.phoneSecond.label : t('phone_second')}
              leftIconName="phone"
              rightIconName='call-made'
              onPress={() => handleCall()}
            />
          )}
          {officeData?.phoneThird?.value && (
            <FileItem
              style={{ backgroundColor: theme.background_2 }}
              name={he.decode(officeData.phoneThird.value)}
              iconBackground={theme.background}
              details={currentLang == 'pl' ? officeData.phoneThird.label : t('phone_third')}
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


export default DataScreen;