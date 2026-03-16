import { RefreshControl, Text, View, useColorScheme } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useArticles } from '@/src/hooks/use-articles';
import { ArticleCard, ArticleCardPreloader } from '@/src/features/articles/ArticleCard';
import { Colors } from '@/src/constants/theme';
import { styles } from '@/assets/styles/recent_index';
import { Article } from '@/src/types/Article';
import { EmptyState } from '@/src/components/EmptyState';

const ArticlesScreen = () => {
  const { t } = useTranslation();
  const { articles, isLoading, isRefreshing, refresh, loadMore } = useArticles();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const params = useLocalSearchParams<{ q?: string }>();



  const skeletonData: Article[] = Array.from({ length: 6 }, (_, i) => ({
    id: -i - 1,
  } as Article));


  const searchText = params?.q?.toLowerCase() || '';
  const filteredArticles = articles.filter(a =>
    !searchText || a.title?.toLowerCase().includes(searchText)
  );

  return (
    <>
      <Stack.Screen
        options={articles.length > 0 ? {
          headerSearchBarOptions: {
            headerIconColor: theme.icon,
            tintColor: theme.tint,
            textColor: theme.text,
            hintTextColor: theme.tint,
            placeholder: t('search_article'),
            onChangeText: (event) => {
              router.setParams({
                q: event.nativeEvent.text,
              });
            },
          },
        } : {}}
      />
      <Animated.FlatList
        data={isLoading ? skeletonData : filteredArticles}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }: { item: Article }) =>
          isLoading ?
            <ArticleCardPreloader />
            : <ArticleCard article={item} />
        }
        contentContainerStyle={styles.listContent}
        itemLayoutAnimation={LinearTransition}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor={theme.tint}
            colors={[theme.text]}
          />
        }
        ListEmptyComponent={
          <EmptyState
            title={t('empty_list')}
            onRefresh={refresh}
          />
        }
      />
    </>
  );
};

export default ArticlesScreen;
