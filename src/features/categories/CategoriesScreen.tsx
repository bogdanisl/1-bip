import { Text, View, useColorScheme } from 'react-native';
import Animated from 'react-native-reanimated';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Colors } from '@/src/constants/theme';
import { styles } from '@/assets/styles/recent_index';
import { useEffect, useState } from 'react';
import { Section } from '@/src/types/Category';
import { fetchSections } from '@/src/services/api/categories';
import SectionCard from '@/src/features/categories/components/SectionCard';
import ActivityIndicator from '@/src/components/ActivityIndicator';

const CategoriesScreen = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const params = useLocalSearchParams<{ q?: string }>();

  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSections = async () => {
      const sections = await fetchSections(0, 20, 'https://www.dev.bip.av1.pl')
      if (!sections || sections.length == 0) {
        return;
      }
      setSections(sections);
      setIsLoading(false);
    }
    getSections();
  }, [])

  const searchText = params?.q?.toLowerCase() || "";
  const filteredSections = sections.filter((section) => {
    if (!searchText) return true;

    const lowerSearch = searchText.toLowerCase();

    // Check if section name matches
    const sectionMatch = section.name.toLowerCase().includes(lowerSearch);

    // Check if any category title matches
    const categoryMatch = section.categories?.some((category) =>
      category.title.toLowerCase().includes(lowerSearch)
    );

    return sectionMatch || categoryMatch;
  });


  return (
    <Animated.FlatList
      data={filteredSections}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }: { item: Section }) =>
        <SectionCard section={item} />
      }
      contentContainerStyle={styles.listContent}

      //itemLayoutAnimation={LinearTransition}
      onEndReachedThreshold={0.3}
      ListEmptyComponent={
        isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: '80%' }}>
            <ActivityIndicator size={50} width={100} height={100} />
          </View>
        ) : (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: theme.text }}>{t('empty_list')}</Text>
          </View>
        )
      }
    />
  );
};

export default CategoriesScreen;
