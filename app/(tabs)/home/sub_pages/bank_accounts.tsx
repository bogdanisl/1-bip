import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';     // ← added
import { Colors } from '@/constants/theme';
import { showMessage } from 'react-native-flash-message';
import { useTranslation } from 'react-i18next';

const BankAccountCard = () => {
    const { t } = useTranslation()
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const accountNumber = '11 2222 3333 4444 5555 6666 7777 8888';

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(accountNumber);

    // You can replace this Alert with react-native-toast-message or any other toast library
    showMessage({
        message: t('code_copied'), // "Skopiowano!"
        description: t('code_copied_desc'),
        type: 'success',
        icon: 'success',
        duration: 2500,
      });
  };

  const handleBankPress = () => {
    // Optional: keep opening the bank website / app if you still want it
    // Linking.openURL('https://twojbank.pl');
    // Or just do nothing – here we just copy on the bank name row as well if you want
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.background_2 }]}>
      {/* Nazwa banku – you can keep the press behaviour you prefer */}
      <TouchableOpacity style={styles.row} onPress={handleBankPress}>
        <View style={[styles.iconCircle,{backgroundColor:theme.background}]}>
          <MaterialCommunityIcons name="bank" size={24} color="#D32F2F" />
        </View>
        <View style={[styles.infoBox,{backgroundColor:theme.background}]}>
          <Text style={[styles.bankName, {color:theme.text}]}>BANK TESTOWY</Text>
        </View>
      </TouchableOpacity>

      {/* Numer konta – press → copy */}
      <TouchableOpacity
        style={styles.row}
        onPress={copyToClipboard}           // ← copy on normal press
        onLongPress={copyToClipboard}       // ← copy on long press (optional)
        activeOpacity={0.7}
      >
        <View style={[styles.iconCircle,{backgroundColor:theme.background}]}>
          <MaterialIcons name="credit-card" size={22} color={theme.tint} />
        </View>
        <View style={[styles.infoBox,{backgroundColor:theme.background}]}>
          <Text style={[styles.accountNumber, {color:theme.text}]}>{accountNumber}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginTop: 110,
    borderRadius: 20,
    overflow: 'hidden',
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 7,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  accountBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  bankName: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  accountNumber: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 2.5,
    fontVariant: ['tabular-nums'],
  },
});

export default BankAccountCard;