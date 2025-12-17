// app/(tabs)/recent.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  RefreshControl,
  useColorScheme,
  Text,
  View
} from 'react-native';
import Animated, {
  LinearTransition,
} from "react-native-reanimated";

import { Colors } from '@/constants/theme';
import { styles } from '@/assets/styles/recent_index';
import type { Article } from '@/types/Article';
import { ArticleCard, ArticleCardPreloader } from '@/components/articles/ArticleCard';
import { useLocalSearchParams } from 'expo-router';
import { fetchArticles } from '@/utils/articles';
import { useSelectedBipStore } from '@/hooks/use-selected-bip';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArticlesListExample } from '@/constants/data_example';

const LIMIT = 40;
const SKELETON_COUNT = 6;

const RecentPage = () => {
  const colorScheme = useColorScheme();
  const [articles, setArticles] = useState<Article[]>([]);
  const [offset, setOffset] = useState(0);
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);

  const [isRefreshing, setIsRefreshing] = useState(false); // <-- refresh
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lang, setLang] = useState('pl-PL');


  const { t } = useTranslation();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const params = useLocalSearchParams<{ q?: string }>();
  const searchText = params?.q?.toLowerCase() || "";

  const filteredArticles = articles.filter((article) => {
    if (!searchText) return true;
    return article.title?.toLowerCase().includes(searchText);
  });

  // === Загрузка статей (offset,limit) ===
  const loadArticles = useCallback(
    async (offsetToLoad: number, append = false, url: string) => {
      if (isLoadingMore || isRefreshing) {
        return;
      };
      if (append) {
        setIsLoadingMore(true);
      }
      else {
        setIsLoading(true);
      }
      if (selectedBip == null) {
        setIsLoadingMore(false);
        setIsRefreshing(false);
        setArticles(ArticlesListExample);
        setIsLoading(false);
        return
      }
      if (url == '' || url == undefined || url == null) {
        setArticles([]);
        setIsLoadingMore(false);
        setIsRefreshing(false);
        setIsLoading(false);
        return;
      }
      const fetched = await fetchArticles(offsetToLoad, LIMIT, url);
      if (fetched) {
        if (fetched.length < LIMIT) {
          setHasMore(false);
        }

        setArticles((prev) =>
          append ? [...prev, ...fetched] : fetched
        );

        setOffset(offsetToLoad);
        setIsLoadingMore(false);
        setIsRefreshing(false);
        setIsLoading(false);
      }
      else {
        setArticles([])
        setIsLoadingMore(false);
        setIsRefreshing(false);
        setIsLoading(false);
      }
      if (append) {
        setIsLoadingMore(false);
        setIsRefreshing(false);
        setIsLoading(false);
      }
    },
    [isLoadingMore, isRefreshing]
  );

  // === Primary load ===
  useEffect(() => {
    const setLanguage = async () => {
      const saved = await AsyncStorage.getItem('app_language')
      //console.log({saved});
      setLang(saved || 'en');
    }
    setLanguage();

    if (selectedBip == null) {
      setArticles(ArticlesListExample);
      return;
    }
    if (selectedBip != null && selectedBip.url != '') {
      //setIsLoading(true);
      loadArticles(0, false, selectedBip?.url);
      return;
    }
    else {
      //setArticles([]);
    }
    //console.log({ selectedBip });
  }, [selectedBip]);

  // === Pull-to-refresh ===
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setHasMore(true);
    if (selectedBip == null || selectedBip.url == '' || selectedBip.id == '-1') {
      setTimeout(() => {
        setIsRefreshing(false);
        setArticles(ArticlesListExample);
        setHasMore(false)
      }, 1000);
      return;
    }
    const freshData = await fetchArticles(0, LIMIT, selectedBip.url);
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
    loadArticles(offset + LIMIT, true, selectedBip?.url || '');
  };

  const renderArticle = ({ item }: { item: Article }) => (
    isLoading ?
      <ArticleCardPreloader />
      :
      <ArticleCard article={item} lang={lang} />
  );

  return (
    <Animated.FlatList
      scrollToOverflowEnabled
      contentInsetAdjustmentBehavior='automatic'
      keyboardShouldPersistTaps='handled'
      data={isLoading ? ArticlesListExample : filteredArticles}
      renderItem={renderArticle}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={true}
      itemLayoutAnimation={LinearTransition}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
      ListEmptyComponent={
        <>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, alignContent: 'center' }}>
            {selectedBip?.url == '' ?
              (
                <Text style={{ color: theme.text, textAlign: 'center', fontSize: 18 }}>{t('unsupported_bip', { name: selectedBip.name })}</Text>
              ) : searchText ? (
                <Text style={{ color: theme.text, textAlign: 'center' }}>{t('not_found_articles')}</Text>
              )
                : (
                  <Text style={{ color: theme.text, textAlign: 'center' }}>{t('empty_list')}</Text>
                )
            }
          </View>
        </>
      }
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
