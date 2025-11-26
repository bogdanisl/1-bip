import BankAccountCard from '@/app/(tabs)/home/sub_pages/bank_accounts';
import OfficeInfoCard from '@/app/(tabs)/home/sub_pages/data';
import OpeningHoursCard from '@/app/(tabs)/home/sub_pages/hours';
import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';


const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.88; // 88% szerokości ekranu – piękne marginesy

export default function InfoCarousel() {
  const renderItem = ({ item }: { item: React.FC }) => {
    const CardComponent = item;
    return (
      <View style={styles.cardContainer}>
        <CardComponent />
      </View>
    );
  };

  const data = [ OfficeInfoCard,OpeningHoursCard, BankAccountCard];

  return (
    <View style={styles.container}>
      <Carousel
        width={CARD_WIDTH}
        height={440} // dostosuj do wysokości Twoich kart
        data={data}
        renderItem={renderItem}
        loop={true}
        pagingEnabled
        snapEnabled
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 50,
          parallaxAdjacentItemScale: 0.8,
        }}
        
        style={{ width: screenWidth }}
      />

      {/* Opcjonalne kropki paginacji */}
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === Math.round(1) ? '#D32F2F' : '#444' }, // możesz podpiąć current index
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  cardContainer: {
    paddingHorizontal: 0,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});