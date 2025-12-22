import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useColorScheme,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Colors } from '@/constants/theme';
import { showMessage } from 'react-native-flash-message';
import { useTranslation } from 'react-i18next';
import FileItem from '@/components/buttons/ItemButton';
import { storage } from '@/utils/storage/asyncStorage';
import { BankCredentials, OfficeData } from '@/types/OfficeData';
import { bankCredentialsExample, officeDataExample } from '@/constants/data_example';
import { useSelectedBipStore } from '@/hooks/use-selected-bip';

const ROW_HEIGHT = 60;
const ROW_COUNT = 2;

const BankAccountCard = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);

  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const arrowRotation = useRef(new Animated.Value(0)).current;

  const [accountNumber, setAccountNumber] = useState<string | null>(null);
  const [bankName, setBankName] = useState<string | null>(null);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(accountNumber!);
    showMessage({
      message: t('code_copied') || 'Skopiowano!',
      description: accountNumber!,
      type: 'success',
      icon: 'success',
      duration: 2800,
    });
  };

  useEffect(() => {
    const getData = async () => {
      if (selectedBip == null) {
        setAccountNumber(bankCredentialsExample.number!);
        setBankName(bankCredentialsExample.name!);
        return;
      }
      const data = await storage.get<BankCredentials>(`${selectedBip?.id}/bankCredentials`);
      if (!data) {
        setAccountNumber(null);
        setBankName(null);
        return;
      }
      setAccountNumber(data.number || null);
      setBankName(data.name || null);
    }
    getData();
  }, [selectedBip])

  const toggleExpand = () => {
    const toValue = expanded ? 0 : ROW_HEIGHT * (ROW_COUNT + 1);

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

  if (!accountNumber || !bankName) {
    return <></>;
  }
  return (
    <View style={[styles.card, { backgroundColor: theme.background_2 }]}>
      {/* Header */}
      <TouchableOpacity activeOpacity={0.8} onPress={toggleExpand} style={styles.header}>
        <View style={styles.statusRow}>
          <MaterialIcons name='credit-card' size={36} color={theme.tint} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.titleText, { color: theme.text }]}>
              {t('home.bank_accounts')}
            </Text>
            <Text style={{ color: theme.text + '80', fontSize: 13, marginTop: 2 }}>
              {t('home.bank_accounts_desc')}
            </Text>
          </View>
        </View>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <MaterialIcons name="keyboard-arrow-down" size={28} color={theme.text} />
        </Animated.View>
      </TouchableOpacity>

      {/* Expandable Content */}
      <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
        <View style={{ paddingBottom: 12, paddingHorizontal: 16 }}>
          {expanded && (
            <>
              {/* Bank Name Row */}
              <FileItem name={bankName} leftIconName={'account-balance'} style={{ marginBottom: 8 }} disabled />
              {/* Account Number Row - Clickable */}
              <FileItem name={accountNumber} leftIconName={'credit-card'} rightIconName='content-copy' onPress={copyToClipboard} />
            </>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 12,
    marginTop: 16,
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

export default BankAccountCard;