import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { Colors } from '@/constants/theme';
import SearchModal from '@/components/AnimatedSearchButton';
import OpeningHoursCard from './sub_pages/hours';
import BankAccountCard from './sub_pages/bank_accounts';
import { useHome } from '@/hooks/use-home';
import { Header } from '@/components/home/Header';
import { UpdateBanner } from '@/components/home/UpdateBunner';
import { Menu } from '@/components/home/Menu';
import { Footer } from '@/components/home/Footer';
import HomeArticles from '@/components/home/Articles';


export default function HomePage() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const { isUpdateAvailable } = useHome();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Header onSearchPress={() => setIsSearchModalVisible(true)} />
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
          <HomeArticles />
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
