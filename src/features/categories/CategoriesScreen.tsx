import { RefreshControl, Text, View, useColorScheme } from 'react-native';
import Animated from 'react-native-reanimated';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Colors } from '@/src/constants/theme';
import { styles } from '@/assets/styles/recent_index';
import { useEffect, useState } from 'react';
import { Section } from '@/src/types/Category';
import SectionCard from '@/src/features/categories/components/SectionCard';
import { apiRequest } from '@/src/services/api/client';
import { Skeleton } from '@/src/components/skeleton';
import { EmptyState } from '@/src/components/EmptyState';
import { storage } from '@/src/services/storage/asyncStorage';

const CategoriesScreen = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const params = useLocalSearchParams<{ q?: string }>();

  const [sections, setSections] = useState<Section[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getSections = async () => {
    try {
      const sections = await apiRequest<Section[]>('/api/v1/category/list');
      if (!sections) return;
      setSections(sections);
    }
    catch (err: any) {
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    await getSections();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000)
  };

  useEffect(() => {
    getSections()
      .finally(() => setIsLoading(false));
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
    <>
      <Stack.Screen
        options={filteredSections.length > 0 ? {
          headerSearchBarOptions: {
            headerIconColor: theme.icon,
            tintColor: theme.tint,
            textColor: theme.text,
            hintTextColor: theme.tint,
            placeholder: t('find'),
            onChangeText: (event) => {
              router.setParams({
                q: event.nativeEvent.text,
              });
            },
          },
        } : {}}
      />
      <Animated.FlatList
        data={filteredSections}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }: { item: Section }) =>
          <SectionCard section={item} />
        }
        contentContainerStyle={styles.listContent}

        //itemLayoutAnimation={LinearTransition}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.tint}
          />
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={{ gap: 12 }}>
              <Skeleton borderRadius={15} width={'100%'} height={80} theme={theme} />
              <Skeleton borderRadius={15} width={'100%'} height={80} theme={theme} />
              <Skeleton borderRadius={15} width={'100%'} height={80} theme={theme} />
              <Skeleton borderRadius={15} width={'100%'} height={80} theme={theme} />
              <Skeleton borderRadius={15} width={'100%'} height={80} theme={theme} />
              <Skeleton borderRadius={15} width={'100%'} height={80} theme={theme} />
              <Skeleton borderRadius={15} width={'100%'} height={80} theme={theme} />
            </View>
          ) : (
            <EmptyState
              iconName='list'
              onRefresh={handleRefresh}
              loading={refreshing}
            />
          )
        }
      />

    </>
  );
};

export default CategoriesScreen;
