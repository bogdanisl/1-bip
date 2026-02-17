import { Skeleton } from '@/src/components/skeleton';
import { Colors } from '@/src/constants/theme';
import { useColorScheme } from '@/src/hooks/use-color-scheme.web';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import { MaterialIcons } from '@expo/vector-icons';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { useEffect, useState } from 'react';
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

export default function ArticleScreen() {
  const theme = useColorScheme() == 'dark' ? Colors.dark : Colors.light;
  const { t } = useTranslation();
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);

  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { article, isLoading } = useArticle({ id: Number(slug) });
  const [isMatrykaOpen, setIsMatrykaOpen] = useState(false);


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
        message: `${t('check_this_message')}: https://www.bip.alpanet.pl/artykuly/${slug}`,
        url: `${selectedBip?.url}/artykuly/${slug}`,
        title: 'Awesome website',
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!article && isLoading) {
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

  if (!article) {
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
          <ArticleHeader article={article} theme={theme} />

          {article.articleType == 1 && (
            <HandleDataSection article={article} theme={theme}></HandleDataSection>
          )}
          {article.articleType == 2 && (
            <CaseDataSection article={article} theme={theme}></CaseDataSection>
          )}

          <ArticleContent content={article.content ?? ''} theme={theme} />

          {(article.documents && article.documents.length > 0) &&
            <AttachmentsList
              attachments={article.documents ? article.documents : []}
              theme={theme} slug={article.slug}
            />}

          <MatrykaSection
            article={article}
            isOpen={isMatrykaOpen}
            toggle={() => setIsMatrykaOpen(prev => !prev)}
            theme={theme} />
          <View style={{ height: 60 }} />

        </View>
      </ScrollView>
    </>
  );
}
