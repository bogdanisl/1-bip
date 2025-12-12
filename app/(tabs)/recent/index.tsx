// app/(tabs)/recent.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  RefreshControl,
  useColorScheme,
} from 'react-native';
import Animated, {
  LinearTransition,
} from "react-native-reanimated";

import { Colors } from '@/constants/theme';
import { styles } from '@/assets/styles/recent_index';
import type { Article } from '@/types/Article';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { useLocalSearchParams } from 'expo-router';
import { fetchArticles } from '@/utils/articles';

const LIMIT = 40;
const SKELETON_COUNT = 6;

const RecentPage = () => {
  const colorScheme = useColorScheme();
  const [articles, setArticles] = useState<Article[]>([]);
  const [offset, setOffset] = useState(0);

  const [isRefreshing, setIsRefreshing] = useState(false); // <-- refresh
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const params = useLocalSearchParams<{ q?: string }>();
  const searchText = params?.q?.toLowerCase() || "";

  const filteredArticles = articles.filter((article) => {
    if (!searchText) return true;
    return article.title?.toLowerCase().includes(searchText);
  });

  // === Загрузка статей (offset,limit) ===
  const loadArticles = useCallback(
    async (offsetToLoad: number, append = false) => {
      if (isLoadingMore || isRefreshing) return;

      if (append) {
        setIsLoadingMore(true);
      }
      const fetched = await fetchArticles(offsetToLoad, LIMIT);

      if (fetched) {
        if (fetched.length < LIMIT) {
          setHasMore(false);
        }

        setArticles((prev) =>
          append ? [...prev, ...fetched] : fetched
        );

        setOffset(offsetToLoad);
      }

      if (append) {
        setIsLoadingMore(false);
      }
    },
    [isLoadingMore, isRefreshing]
  );

  // === Primary load ===
  useEffect(() => {
    loadArticles(0, false);
  }, []);

  // === Pull-to-refresh ===
  const handleRefresh = async () => {
    setIsRefreshing(true);

    setHasMore(true);       // Сбросить "конец списка"
    const freshData = await fetchArticles(0, LIMIT);

    if (freshData) {
      setArticles(freshData);
      setOffset(0);
      if (freshData.length < LIMIT) {
        setHasMore(false);
      }
    }

    setIsRefreshing(false);
  };

  // === Load more ===
  const handleLoadMore = () => {
    if (isLoadingMore || isRefreshing || !hasMore) return;
    loadArticles(offset + LIMIT, true);
  };

  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard article={item}/>
  );

  return (
    <Animated.FlatList
      scrollToOverflowEnabled
      contentInsetAdjustmentBehavior='automatic'
      keyboardShouldPersistTaps='handled'

      data={filteredArticles}
      renderItem={renderArticle}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={true}
      itemLayoutAnimation={LinearTransition}

      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}

      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          tintColor={theme.tint}
          colors={[theme.text]}
        />
      }
    />
  );
};

export default RecentPage;
