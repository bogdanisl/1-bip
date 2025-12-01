import { CaseArticleCard } from '@/components/articles/CaseArticleCard';
import CaseArticlePage from '@/components/articles/CaseArticlePage';
import { HandleArticleCard } from '@/components/articles/HandleArticleCard';
import HandleArticlePage from '@/components/articles/HandleArticlePage';
import NormalArticlePage from '@/components/articles/NormalArticlePage';
import { HeaderButton } from '@/components/buttons/HeaderButtons/HeaderButton.ios';
import { articles_examples_full } from '@/constants/data_example';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme.web';
import { Article } from '@/types/Article';
import { normalizeArticle } from '@/utils/normalizeArticle';
import { MaterialIcons } from '@expo/vector-icons';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router/stack'
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, Share, Platform } from 'react-native'

export default function ArticlePage() {
    const themeColors = useColorScheme() == 'dark' ? Colors.dark : Colors.light;
    const { t } = useTranslation()
    const { slug } = useLocalSearchParams<{ slug: string }>();
    const handlePress = async () => {
        try {
            const result = await Share.share({
                message: `${t('check_this_message')}: https://www.bip.alpanet.pl/artykuly/${slug}`,
                url: `https://www.bip.alpanet.pl/artykuly/${slug}`, // iOS will use this
                title: 'Awesome website',   // iOS only
            });
        } catch (error) {
            console.error(error);
        }

    }

    const article = articles_examples_full.map(normalizeArticle).find(a => a.slug === slug);

    if (!article) return <Text>Artykuł nie znaleziony</Text>;
    return (
        <>
            <Stack.Screen
                options={{
                    headerRight: () =>
                        <>
                            <TouchableOpacity style={{ height: 34, width: 34, justifyContent: 'center', alignItems: 'center' }} onPress={handlePress}>
                                <MaterialIcons
                                 name={Platform.OS=='ios'?'ios-share':'share'} 
                                 size={24} color={isLiquidGlassAvailable() ? themeColors.text : themeColors.tint}
                                 style={{
                                    paddingLeft:2,
                                    paddingBottom:2

                                 }}
                                 >

                                 </MaterialIcons>
                            </TouchableOpacity>
                        </>
                }}
            >

            </Stack.Screen>
            {article.artTypeId === 0 && (
                <NormalArticlePage article={article} />
            )}
            {article.artTypeId === 1 && (
                <HandleArticlePage article={article} />
            )}
            {article.artTypeId === 2 && (
                <CaseArticlePage article={article} />
            )}
        </>
    )
}