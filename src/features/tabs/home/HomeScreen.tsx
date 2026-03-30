import React, { useState } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { useAppTheme } from '@/src/hooks/use-theme-colors';
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
  const { theme, isContrast, isMonochrome } = useAppTheme();
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const { isUpdateAvailable } = useHome();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Header theme={theme} isContrast={isContrast} isMonochrome={isMonochrome} />
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
          <Menu type='top' theme={theme} />
          <View style={{ height: 20 }}></View>

          <OpeningHoursCard theme={theme} />
          <BankAccountCard theme={theme} />
          <Menu theme={theme} />
        </View>

        <Footer theme={theme} />

        <SearchModal visible={isSearchModalVisible} onClose={() => setIsSearchModalVisible(false)} />
      </ScrollView>
    </View>
  );
}
