import { Text, View, useColorScheme } from 'react-native';
import Animated from 'react-native-reanimated';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Colors } from '@/src/constants/theme';
import { styles } from '@/assets/styles/recent_index';
import { useEffect, useState } from 'react';
import { Section } from '@/src/types/Category';
import SectionCard from '@/src/features/categories/components/SectionCard';
import { apiRequest } from '@/src/services/api/client';
import { Skeleton } from '@/src/components/skeleton';

const CategoriesScreen = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const params = useLocalSearchParams<{ q?: string }>();

  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSections = async () => {
      try {
        const sections = await apiRequest<Section[]>('/api/v1/category/list');
        if (!sections) return;
        setSections(sections);
      }
      catch (err: any) {
      }
    }
    getSections();
      //.finally(() => setIsLoading(false));
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
          <View style={{ gap:12 }}>
            <Skeleton borderRadius={15} width={'100%'} height={80} theme={theme}/>
            <Skeleton borderRadius={15} width={'100%'} height={80} theme={theme}/>
            <Skeleton borderRadius={15} width={'100%'} height={80} theme={theme}/>
            <Skeleton borderRadius={15} width={'100%'} height={80} theme={theme}/>
            <Skeleton borderRadius={15} width={'100%'} height={80} theme={theme}/>
            <Skeleton borderRadius={15} width={'100%'} height={80} theme={theme}/>
            <Skeleton borderRadius={15} width={'100%'} height={80} theme={theme}/>
          </View>
        ) : (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: theme.text, fontSize:15, fontWeight:'600' }}>{t('empty_category_list')}</Text>
          </View>
        )
      }
    />
  );
};

export default CategoriesScreen;
