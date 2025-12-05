import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Animated,
  useColorScheme,
  FlatList,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import FileItem from '@/components/buttons/ItemButton';
import * as Clipboard from 'expo-clipboard';     // ← added
import { showMessage } from 'react-native-flash-message';
import { useTranslation } from 'react-i18next';
import { LinearTransition } from 'react-native-reanimated';
import { Br } from '@/components/Br';


const ROW_HEIGHT = 70;
const ROW_COUNT = 9; // 6 rows when expanded

const OfficeInfoCard = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const arrowRotation = useRef(new Animated.Value(0)).current;

  const handleCall = () => Linking.openURL('tel:111222334');
  const handleEmail = () => Linking.openURL('mailto:biuro@testowo.pl');

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

  const toggleExpand = () => {
    const toValue = expanded ? 0 : ROW_HEIGHT * (ROW_COUNT + 1.5);

    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(arrowRotation, {
        toValue: expanded ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    if (expanded) {
      setTimeout(() => setExpanded(false), 300);
    } else {
      setExpanded(true);
    }
  };

  const rotation = arrowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const rows = [
    { icon: 'account-balance', name: 'file-document-outline', label: 'Urząd Gminy Testowej', subText: "" },
    { icon: 'location-on', name: 'file-document-outline', label: 'Testowa 11A', subText: "Adres", clickable:true },
    { icon: 'location-city', name: 'file-document-outline', label: 'Testowo', subText: "Miasto" },
    { icon: 'markunread-mailbox', name: 'file-document-outline', label: '11-222', subText: "Kod pocztowy",clickable:true },
    { icon: 'domain', name: 'file-document-outline', label: 'ZAWIERCIAŃSKI', subText: "Powiat" },
    { icon: 'badge', name: 'file-document-outline', label: '99 99 99 99', subText: "NIP", clickable: true },
    { icon: 'credit-card', name: 'file-document-outline', label: '98 98 9888 9', subText: "REGON", clickable: true },
    {
      icon: 'phone',
      name: 'phone',
      label: '111 222 334',
      subText: "Telefon",
      onPress: handleCall,
      clickable: true,
    },
    {
      icon: 'email',
      name: 'email',
      label: 'biuro@testowo.pl',
      subText: 'E-mail',
      onPress: handleEmail,
      clickable: true,
    },
  ];

 const renderItem = ({ item }: { item: any }) => (
       <FileItem 
       style={{backgroundColor:theme.background_2}} 
       name={item.label} 
       iconBackground={theme.background} 
       details={item.subText} 
       leftIconName={item.icon}
       disabled={!item.clickable}
       rightIconName={item.clickable?
        item.name=='phone'?'call-made':item.name=='email'?'call-made':
        'content-copy':''}
       onPress={
        item.name=='phone'?handleCall:item.name=='email'?handleEmail:
        ()=>handleCopy(item.label)
      }
       />
    );

  return (
    // <View style={[styles.card, { backgroundColor: theme.background_2 }]}>
    //   {/* Header */}
    //   {/* <TouchableOpacity activeOpacity={0.8} onPress={toggleExpand} style={styles.header}>
    //     <View style={styles.statusRow}>
    //       <MaterialIcons name='account-balance' size={36} color={theme.tint} />
    //       <View style={{ flex: 1 }}>
    //         <Text style={[styles.titleText, { color: theme.text }]}>
    //           Dane urzędu
    //         </Text>
    //         <Text style={{ color: theme.text + '80', fontSize: 13, marginTop: 2 }}>
    //          Adres • NIP • REGON
    //         </Text>
    //       </View>
    //     </View>
    //     <Animated.View style={{ transform: [{ rotate: rotation }] }}>
    //       <MaterialIcons name="keyboard-arrow-down" size={28} color={theme.text} />
    //     </Animated.View>
    //   </TouchableOpacity> */}

    //   {/* Animated Expandable List */}
    //   <Animated.View style={{ }}>
    //     <View style={{ paddingBottom: 12, gap: 8, paddingHorizontal: 10 }}>
    //         {rows.map((item, index) => (
    //           <FileItem name={item.label} details={item.subText} leftIconName={item.icon} rightIconName={item.clickable ? 'content-copy' : ''} onPress={() => handleCopy(item.label)} />
    //         ))}
    //     </View>
    //   </Animated.View>
    // </View>
    <FlatList
          ListHeaderComponent={() =>
            <>
              <Text style={{ color: theme.text, fontSize: 15, fontWeight: '800', marginBottom: 10, marginTop:10 }}>
                {rows[0].label}
              </Text>
              <Br />
            </>
          }
          style={{ padding: 20 }}
          data={rows}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentInsetAdjustmentBehavior={'automatic'}
        />
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