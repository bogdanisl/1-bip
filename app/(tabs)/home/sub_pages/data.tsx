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


const ROW_HEIGHT = 70;
const ROW_COUNT = 9; // 6 rows when expanded

const OfficeInfoCard = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const { t } = useTranslation();

  const [officeData, setOfficeData] = useState<OfficeData | null>(null)
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);
  const handleCall = () => Linking.openURL(`tel:${officeData?.phone}`);
  const handleEmail = () => Linking.openURL(`mailto:${officeData?.email}`);

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
      const data = await storage.get<OfficeData>(`${selectedBip?.id}/officeData`);
      if (!data && selectedBip?.id == '-1') {
        setOfficeData(officeDataExample);
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


  const renderItem = ({ item }: { item: any }) => {

    if (item.label == null || item.label == undefined || item.label == '') return <View style={{ marginVertical: -6 }}></View>;
    return (
      <FileItem
        style={{ backgroundColor: theme.background_2 }}
        name={item.label}
        iconBackground={theme.background}
        details={item.subText}
        leftIconName={item.icon}
        disabled={!item.clickable}
        rightIconName={item.clickable ?
          item.name == 'phone' ? 'call-made' : item.name == 'email' ? 'call-made' :
            'content-copy' : ''}
        onPress={
          item.name == 'phone' ? handleCall : item.name == 'email' ? handleEmail :
            () => handleCopy(item.label)
        }
      />
    );


  }

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

  const rows = [
    { icon: 'account-balance', name: 'file-document-outline', label: officeData!.name, subText: "" },
    { icon: 'location-on', name: 'file-document-outline', label: officeData!.address, subText: "Adres", clickable: true },
    { icon: 'location-city', name: 'file-document-outline', label: officeData!.city, subText: "Miasto" },
    { icon: 'markunread-mailbox', name: 'file-document-outline', label: officeData!.postalCode, subText: "Kod pocztowy", clickable: true },
    { icon: 'domain', name: 'file-document-outline', label: officeData!.district, subText: "Powiat" },
    { icon: 'badge', name: 'file-document-outline', label: officeData!.NIP, subText: "NIP", clickable: true },
    { icon: 'credit-card', name: 'file-document-outline', label: officeData!.REGON, subText: "REGON", clickable: true },
    {
      icon: 'phone',
      name: 'phone',
      label: officeData!.phone!,
      subText: "Telefon",
      onPress: handleCall,
      clickable: true,
    },
    {
      icon: 'email',
      name: 'email',
      label: officeData.email!,
      subText: 'E-mail',
      onPress: handleEmail,
      clickable: true,
    },
  ];

return (
  <View style={{ flex: 1, paddingHorizontal:20 }}>
    <ScrollView
      style={{ flex: 1 }}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 32 }}
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
        {officeData?.name ?? t('no_data')}
      </Text>

      <Br />

      <View style={{ gap: 12 }}>
        {officeData?.name && (
          <FileItem
            style={{ backgroundColor: theme.background_2 }}
            name={officeData.name}
            iconBackground={theme.background}
            details={t('office_name')}
            leftIconName="account-balance"
            disabled
          />
        )}

        {officeData?.address && (
          <FileItem
            style={{ backgroundColor: theme.background_2 }}
            name={officeData.address}
            iconBackground={theme.background}
            details={t('address')}
            leftIconName="location-on"
            disabled
          />
        )}

        {officeData?.city && (
          <FileItem
            style={{ backgroundColor: theme.background_2 }}
            name={officeData.city}
            iconBackground={theme.background}
            details={t('city')}
            leftIconName="location-city"
            disabled
          />
        )}

        {officeData?.district && (
          <FileItem
            style={{ backgroundColor: theme.background_2 }}
            name={officeData.district}
            iconBackground={theme.background}
            details={t('district')}
            leftIconName="domain"
            disabled
          />
        )}

        {officeData?.province && (
          <FileItem
            style={{ backgroundColor: theme.background_2 }}
            name={officeData.province}
            iconBackground={theme.background}
            details={t('province')}
            leftIconName="domain"
            disabled
          />
        )}

        {officeData?.postalCode && (
          <FileItem
            style={{ backgroundColor: theme.background_2 }}
            name={officeData.postalCode}
            iconBackground={theme.background}
            details={t('postal_code')}
            leftIconName="location-on"
            rightIconName="content-copy"
            onPress={() => handleCopy(officeData.postalCode!)}
          />
        )}

        {officeData?.NIP && (
          <FileItem
            style={{ backgroundColor: theme.background_2 }}
            name={officeData.NIP}
            iconBackground={theme.background}
            details={t('NIP')}
            leftIconName="badge"
            rightIconName="content-copy"
            onPress={() => handleCopy(officeData.NIP!)}
          />
        )}

        {officeData?.REGON && (
          <FileItem
            style={{ backgroundColor: theme.background_2 }}
            name={officeData.REGON}
            iconBackground={theme.background}
            details={t('REGON')}
            leftIconName="credit-card"
            rightIconName="content-copy"
            onPress={() => handleCopy(officeData.REGON!)}
          />
        )}

        {officeData?.email && (
          <FileItem
            style={{ backgroundColor: theme.background_2 }}
            name={officeData.email}
            iconBackground={theme.background}
            details={t('email')}
            leftIconName="email"
            rightIconName='message'
            onPress={() => handleEmail()}
          />
        )}

        {officeData?.phone && (
          <FileItem
            style={{ backgroundColor: theme.background_2 }}
            name={officeData.phone}
            iconBackground={theme.background}
            details={t('phone')}
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