// app/(tabs)/recent.tsx
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  useColorScheme,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

import { Colors } from '@/constants/theme';
import { styles } from '@/assets/styles/recent_index';
import type { Article } from '@/types/Article'
import { NormalArticleCard } from '@/components/articles/normal/NormalArticleCard';
import { articles_examples_full } from '@/constants/data_example';
//import { normalizeArticle } from '@/utils/normalizeArticle';
import { useLocalSearchParams } from 'expo-router';
import { fetchArticles } from '@/utils/articles';

// === Основная страница ===
const RecentPage = () => {
  const colorScheme = useColorScheme();
  const [articles, setArticles] = useState<Article[] | null>(null)
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const params = useLocalSearchParams<{ q?: string }>();

  const searchText = params?.q?.toLowerCase() || "";
  const filteredArticles = articles ? articles.filter((article) => {
    if (!searchText) {
      return true;
    }

    return article.keywords ? article.slug.toLowerCase().includes(searchText.replace(' ', '-')) : articles;
  }) : null;

  const loadArticles = async () =>{
    const fetchedArticles = await fetchArticles(0,4);
    if(fetchedArticles){
      setArticles(fetchedArticles);
    }
  }

  useEffect(() => {
    loadArticles()
  }, [])
  const renderArticle = ({ item }: { item: Article }) => {
    return (
      <NormalArticleCard article={item} />
    )
  }
  return (
    <Animated.FlatList
      scrollToOverflowEnabled
      contentInsetAdjustmentBehavior='automatic'
      keyboardShouldPersistTaps='handled'
      data={filteredArticles}
      renderItem={renderArticle}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      itemLayoutAnimation={LinearTransition}

    />
  );
};

export default RecentPage;