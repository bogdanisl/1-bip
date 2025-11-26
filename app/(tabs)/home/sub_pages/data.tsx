import React from 'react';
import { View, Text, StyleSheet, Linking, useColorScheme } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

const OfficeInfoCard = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const handleCall = () => Linking.openURL('tel:111222334');
  const handleEmail = () => {}//Linking.openURL('mailto:biuro@testowo.pl');

  return (
    <View style={[styles.card, { backgroundColor: theme.background_2 }]}>
      {/* Województwo */}
      <View style={styles.row}>
        <View style={[styles.iconCircle, {backgroundColor:theme.background}]}>
          <MaterialCommunityIcons name="file-document" size={20} color="#D32F2F" />
        </View>
        <View style={[styles.infoBox,{backgroundColor:theme.background}]}>
          <Text style={[styles.contactText,{color:theme.text}]}>WOJ. ŚLĄSKIE</Text>
        </View>
      </View>

      {/* Powiat */}
      <View style={styles.row}>
        <View style={[styles.iconCircle, {backgroundColor:theme.background}]}>
          <MaterialCommunityIcons name="file-document" size={20} color="#D32F2F" />
        </View>
        <View style={[styles.infoBox,{backgroundColor:theme.background}]}>
          <Text style={[styles.contactText,{color:theme.text}]}>POWIAT ZAWIERCIAŃSKI</Text>
        </View>
      </View>

      {/* NIP */}
      <View style={styles.row}>
        <View style={[styles.iconCircle, {backgroundColor:theme.background}]}>
          <MaterialCommunityIcons name="file-document" size={20} color="#D32F2F" />
        </View>
        <View style={[styles.infoBox,{backgroundColor:theme.background}]}>
          <Text style={[styles.contactText,{color:theme.text}]}>NIP: 99 99 99 99</Text>
        </View>
      </View>

      {/* REGON */}
      <View style={styles.row}>
        <View style={[styles.iconCircle, {backgroundColor:theme.background}]}>
          <MaterialCommunityIcons name="file-document" size={20} color="#D32F2F" />
        </View>
        <View style={[styles.infoBox,{backgroundColor:theme.background}]}>
          <Text style={[styles.contactText,{color:theme.text}]}>REGON: 98 98 9888 9</Text>
        </View>
      </View>

      {/* Telefon */}
      <View style={styles.row} onTouchEnd={handleCall}>
        <View style={[styles.iconCircle, {backgroundColor:theme.background}]}>
          <MaterialIcons name="phone" size={22} color="#D32F2F" />
        </View>
        <View style={[styles.infoBox, styles.clickableBox,{backgroundColor:theme.background}]}>
          <Text style={[styles.contactText,{color:theme.text}]}>TEL: 111 222 334 , 222 5666</Text>
        </View>
      </View>

      {/* E-mail */}
      <View style={styles.row} onTouchEnd={handleEmail}>
        <View style={[styles.iconCircle, {backgroundColor:theme.background}]}>
          <MaterialIcons name="email" size={20} color="#D32F2F" />
        </View>
        <View style={[styles.infoBox, styles.clickableBox,{backgroundColor:theme.background}]}>
          <Text style={[styles.contactText,{color:theme.text}]}>E-MAIL: BIURO@TESTOWO.PL</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginTop: 90,
    borderRadius: 20,
    overflow: 'hidden',
    paddingVertical: 12,
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
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    justifyContent: 'center',
  },
  clickableBox: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  infoText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  contactText: {
    color: '#E91E63',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
});

export default OfficeInfoCard;