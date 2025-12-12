import ArticlePage from '@/components/articles/ArticlePage';
import { Skeleton } from '@/components/skeleton';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme.web';
import { Article } from '@/types/Article';
import { fetchArticle } from '@/utils/articles';
import { MaterialIcons } from '@expo/vector-icons';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, Share, Platform, View } from 'react-native';

export default function ArticleShow() {
  const themeColors = useColorScheme() == 'dark' ? Colors.dark : Colors.light;
  const { t } = useTranslation();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const handlePress = async () => {
    try {
      await Share.share({
        message: `${t('check_this_message')}: https://www.bip.alpanet.pl/artykuly/${slug}`,
        url: `https://www.bip.alpanet.pl/artykuly/${slug}`,
        title: 'Awesome website',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getArticle = async () => {
    setLoading(true);
    const fetchedArticle = await fetchArticle(Number(slug));
    setLoading(false);

    if (fetchedArticle) {
      setArticle(fetchedArticle);
    } else {
      setArticle(null);
    }
  };

  useEffect(() => {
    getArticle();

  }, []);


  if (!article && loading) {
    return (
      <View style={{ padding: 16, paddingTop:Platform.OS=='android'?20:130 }}>
        <Skeleton width="100%" height={24} borderRadius={4} style={{ marginBottom: 16 }} /> 
        <Skeleton width="60%" height={20} borderRadius={4} style={{ marginBottom: 24 }} /> 
        <Skeleton width="100%" height={200} borderRadius={8} style={{ marginBottom: 16 }} />
        <Skeleton width="100%" height={16} borderRadius={4} style={{ marginBottom: 8 }} /> 
        <Skeleton width="90%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
        <Skeleton width="95%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
        <Skeleton width="80%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
      </View>
    );
  }

  if (!article) {
    // fetch completed but returned null
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text style={{ color: themeColors.text, fontSize: 16 }}>Article not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ height: 34, width: 34, justifyContent: 'center', alignItems: 'center' }}
              onPress={handlePress}
            >
              <MaterialIcons
                name={Platform.OS == 'ios' ? 'ios-share' : 'share'}
                size={24}
                color={isLiquidGlassAvailable() ? themeColors.text : themeColors.tint}
                style={{ paddingLeft: 2, paddingBottom: 2 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ArticlePage article={article} />
    </>
  );
}
