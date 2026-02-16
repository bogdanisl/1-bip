import { RefreshControl, Text, View, useColorScheme } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useArticles } from '@/src/hooks/use-articles';
import { ArticleCard, ArticleCardPreloader } from '@/src/features/articles/ArticleCard';
import { Colors } from '@/src/constants/theme';
import { styles } from '@/assets/styles/recent_index';
import { Article } from '@/src/types/Article';

const ArticlesScreen = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const { articles, isLoading, isRefreshing, refresh, loadMore } = useArticles();

  const params = useLocalSearchParams<{ q?: string }>();
  const searchText = params?.q?.toLowerCase() || '';

  const skeletonData: Article[] = Array.from({ length: 6 }, (_, i) => ({
    id: -i - 1,
  } as Article));

  const filteredArticles = articles.filter(a =>
    !searchText || a.title?.toLowerCase().includes(searchText)
  );

  return (
    <Animated.FlatList
      data={isLoading ? skeletonData : filteredArticles}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }: { item: Article }) =>
        isLoading ? <ArticleCardPreloader /> : <ArticleCard article={item} />
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
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: theme.text }}>{t('empty_list')}</Text>
        </View>
      }
    />
  );
};

export default ArticlesScreen;
