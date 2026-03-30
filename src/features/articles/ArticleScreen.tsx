import { Skeleton } from '@/src/components/skeleton';
import { useAppTheme } from '@/src/hooks/use-theme-colors';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import { MaterialIcons } from '@expo/vector-icons';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, Share, Platform, View, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ArticleHeader } from './components/ArticleHeader';
import { HandleDataSection } from './components/ArticleHandleData';
import { CaseDataSection } from './components/ArticleCaseData';
import { ArticleContent } from './components/ArticleContent';
import { AttachmentsList } from './components/AttachmentList';
import { MatrykaSection } from './components/MetricSection';
import { useArticle } from '@/src/hooks/use-article';
import { ArticleChangeHistorySection } from './components/ArticleChangeHistorySection';
import { Article } from '@/src/types/Article';
import { translate } from '@/src/services/translate';

export default function ArticleScreen() {
  const { theme } = useAppTheme();
  const { t, i18n } = useTranslation();
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);

  const { slug } = useLocalSearchParams<{ slug: string }>();
  const articleId = Number(slug);
  const { article, isLoading } = useArticle({ id: articleId });
  const [isMatrykaOpen, setIsMatrykaOpen] = useState(false);

  const [translated, setTranslated] = useState(false);
  const [translateArticle, setTranslatedArticle] = useState<Article | null>(null);
  const [translating, setTranslating] = useState(false);

  const handlePress = async () => {
    try {
      if (selectedBip == null) {
        showMessage({
          message: t('sharing_not_available_example_bip'),
          icon: 'auto',
          type: "warning",
        });
        return;
      };
      await Share.share({
        url: `${selectedBip?.url}/artykuly/${slug}`,
        title: 'Awesome website',
      });
    } catch (error) {
      console.error(error);
    }
  };


  const handleTranslate = async () => {
    // Jeśli już przetłumaczone — wróć do oryginału
    if (translated) {
      setTranslated(false);
      setTranslatedArticle(null);
      return;
    }

    if (!article) return;
    setTranslating(true);

    try {
      // Głęboka kopia, nie referencja!
      const copy: Article = { ...article };

      const fields: (keyof Article)[] = [
        'title', 'content', 'subtitle',
        'resolutionType', 'resolutionContent', 'resolutionPlace',
        'resolutionSubject', 'requiredDocuments', 'resolutionText',
        'appealProcedure', 'comments', 'fees', 'pickupLocation', 'author'
      ];

      for (const field of fields) {
        const value = copy[field];
        if (typeof value === 'string') {
          const translated = await translate(value, i18n.language);
          if (translated) {
            (copy as any)[field] = translated;
          }
        }
      }

      setTranslatedArticle(copy);
      setTranslated(true);
    } finally {
      setTranslating(false);
    }
  };

  const activeArticle = translated && translateArticle ? translateArticle : article;


  if (!activeArticle && isLoading) {
    return (
      <View style={{ padding: 16, paddingTop: Platform.OS == 'android' ? 20 : 130 }}>
        <Skeleton theme={theme} width="100%" height={24} borderRadius={4} style={{ marginBottom: 16 }} />
        <Skeleton theme={theme} width="60%" height={20} borderRadius={4} style={{ marginBottom: 24 }} />
        <Skeleton theme={theme} width="100%" height={200} borderRadius={8} style={{ marginBottom: 16 }} />
        <Skeleton theme={theme} width="100%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
        <Skeleton theme={theme} width="90%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
        <Skeleton theme={theme} width="95%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
        <Skeleton theme={theme} width="80%" height={16} borderRadius={4} style={{ marginBottom: 8 }} />
      </View>
    );
  }

  if (!activeArticle) {
    // fetch completed but returned null
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text style={{ color: theme.text, fontSize: 16 }}>Article not found</Text>
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
                color={isLiquidGlassAvailable() ? theme.text : theme.tint}
                style={{ paddingLeft: 2, paddingBottom: 2 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView style={{ backgroundColor: theme.background }}>
        <View style={{ padding: 16, paddingTop: Platform.OS == 'android' ? 20 : 130 }}>
          <ArticleHeader article={activeArticle} theme={theme} handleTranslate={handleTranslate} translating={translating} translateLabel={t(translated ? 'original' : 'translate')} />

          {activeArticle.articleType == 1 && (
            <HandleDataSection article={activeArticle} theme={theme}></HandleDataSection>
          )}
          {activeArticle.articleType == 2 && (
            <CaseDataSection article={activeArticle} theme={theme}></CaseDataSection>
          )}

          <ArticleContent content={activeArticle.content ?? ''} theme={theme} />

          {(activeArticle.documents && activeArticle.documents.length > 0) &&
            <AttachmentsList
              attachments={activeArticle.documents ? activeArticle.documents : []}
              theme={theme} slug={activeArticle.slug}
            />}

          <MatrykaSection
            article={activeArticle}
            isOpen={isMatrykaOpen}
            toggle={() => setIsMatrykaOpen(prev => !prev)}
            theme={theme} />

          {(activeArticle.versionCount && activeArticle.versionCount > 0) &&
            <ArticleChangeHistorySection
              article={activeArticle}
              theme={theme}
            />
          }
          <View style={{ height: 120 }} />

        </View>
      </ScrollView>
    </>
  );
}
