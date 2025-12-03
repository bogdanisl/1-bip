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
import type { Article, NormalArticle, HandleArticle, CaseArticle } from '@/types/Article'
import { NormalArticleCard } from '@/components/articles/normal/NormalArticleCard';
import { HandleArticleCard } from '@/components/articles/handle/HandleArticleCard';
import { CaseArticleCard } from '@/components/articles/case/CaseArticleCard';
import { articles_examples_full } from '@/constants/data_example';
import { normalizeArticle } from '@/utils/normalizeArticle';

// === Основная страница ===
const RecentPage = () => {
  const colorScheme = useColorScheme();
  const [articles, setArticles] = useState<Article[] | null>(null)
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  useEffect(() => {
    const normalized = articles_examples_full.map(normalizeArticle)
    setArticles(normalized)
  }, [])
  const renderArticle = ({ item }: { item: Article }) => {
    switch (item.artTypeId) {
      case 0:
        return <NormalArticleCard article={item} />;
      case 1:
        return <HandleArticleCard article={item} />;
      case 2:
        return <CaseArticleCard article={item} />;
      default:
        return null;
    }
  };

  return (
      <FlatList
        scrollToOverflowEnabled
        contentInsetAdjustmentBehavior='automatic'
        keyboardShouldPersistTaps='handled'      
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
              //itemLayoutAnimation={LinearTransition}

      />
  );
};

export default RecentPage;