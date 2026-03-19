import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { Colors } from '@/src/constants/theme';
import SearchModal from './components/AnimatedSearchButton';
import { useHome } from './hooks/use-home';
import OpeningHoursCard from './components/OpenHours';
import BankAccountCard from './components/BankAccounts';
import { Header } from './components/Header';
import { UpdateBanner } from './components/UpdateBunner';
import HomeArticles from './components/Articles';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';


export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const { isUpdateAvailable } = useHome();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Header />
        {isUpdateAvailable && <UpdateBanner />}

        <View style={{
          zIndex: 1,
          marginTop: -25,
          borderRadius: 30,
          backgroundColor: theme.background,
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: 20,
          marginBottom: 80
        }}>
          <HomeArticles/>
          <Menu type='top' />
          <View style={{height:20}}></View>

          <OpeningHoursCard />
          <BankAccountCard />
          <Menu />
        </View>

        <Footer />

        <SearchModal visible={isSearchModalVisible} onClose={() => setIsSearchModalVisible(false)} />
      </ScrollView>
    </View>
  );
}
