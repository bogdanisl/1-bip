import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';


export const Footer = () => (
  <LinearGradient
    colors={['#b50315', '#20313b']}
    start={{ x: 0, y: 1 }}
    end={{ x: 1, y: 0 }}
    style={{ position: 'absolute', bottom: -220, left: 0, right: 0, height: 430 }}
  >
    <View style={{ position: 'absolute', top: 50, left: 0, right: 0, zIndex: 100, padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row' }}>
        <FontAwesome style={{ marginRight: 5 }} color="#bababaff" size={13} name="code" />
        <Text style={{ textAlign: 'center', color: '#bababaff', fontSize: 11, fontWeight: '500' }}>WERSJA 6.1.0 0001032511</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <FontAwesome style={{ marginRight: 5 }} color="#bababaff" size={14} name="mobile-phone" />
        <Text style={{ textAlign: 'center', color: '#bababaff', fontSize: 11, fontWeight: '500' }}>WERSJA APLIKACJI 1.0.0</Text>
      </View>
    </View>
    <Image
      source={require('@/assets/images/shape.3.50.webp')}
      style={{ position: 'absolute', alignSelf: 'center', top: -90, width: '80%', height: '80%', opacity: 1, transform: [{ rotate: '300deg' }] }}
      resizeMode="contain"
    />
  </LinearGradient>
);