import { RefreshControl, Text, View, useColorScheme } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { RelativePathString, router, Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useArticles } from '@/hooks/use-articles';
import { ArticleCard, ArticleCardPreloader } from '@/components/articles/ArticleCard';
import { Colors } from '@/constants/theme';
import { styles } from '@/assets/styles/recent_index';
import { Article } from '@/types/Article';
import { useEffect, useState } from 'react';
import { Category } from '@/types/Category';
import { fetchCategory } from '@/utils/categories';
import FileItem from '@/components/buttons/ItemButton';
import { Skeleton } from '@/components/skeleton';

const CategoryDetails = () => {
    const { t } = useTranslation();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const { id, title, articleCount, subcategoriesCount } = useLocalSearchParams<{ id: string, title: string, articleCount: string, subcategoriesCount: string }>();

    const [articles, setArticles] = useState<Article[]>([]);
    const [category, setCategory] = useState<Category>();
    const [isLoading, setIsLoading] = useState(true);
    const params = useLocalSearchParams<{ q?: string }>();
    const searchText = params?.q?.toLowerCase() || '';

    const skeletonData: Article[] = Array.from({ length: Number(articleCount ?? '6') }, (_, i) => ({
        id: -i - 1,
    } as Article));

    const skeletonSubcategories = Array.from({ length: Number(subcategoriesCount ?? '0') }, (_, i) => ({
        id: -i - 1,
    }));

    useEffect(() => {
        const loadCategory = async () => {
            const categoryLoad = await fetchCategory(0, 20, 'https://www.dev.bip.av1.pl', Number(id));
            if (!categoryLoad) return;
            setCategory(categoryLoad);
            if (categoryLoad.articles) {
                setArticles(categoryLoad.articles);
                setIsLoading(false);
            }
        }
        loadCategory();
    }, [])

    const filteredArticles = articles.filter(a =>
        !searchText || a.title?.toLowerCase().includes(searchText)
    );

    return (
        <>
            <Stack.Screen
                options={{
                    title: title
                }}
            >
            </Stack.Screen>
            <Animated.FlatList
                data={isLoading ? skeletonData : filteredArticles}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item }: { item: Article }) =>
                    isLoading ? <ArticleCardPreloader /> : <ArticleCard article={item} path={(`/(tabs)/home/categories/${id}/${item.id}` as RelativePathString)} />
                }

                ListHeaderComponent={
                    () => {
                        if (isLoading) {
                            return (
                                <View style={{ gap: 8 }}>
                                    {skeletonSubcategories.map(c =>
                                        <Skeleton key={c.id} width={'100%'} height={70} theme={theme} />
                                    )}
                                </View>
                            )
                        }
                        if (!category?.subCategories) return;
                        if (category.subCategories.length < 1) return;
                        return (
                            <>
                                <View style={{ gap: 8 }}>
                                    {category.subCategories.map(c =>
                                        <FileItem
                                            key={c.id}
                                            name={c.title}
                                            detailsAccent={c.articleCount? 'Artykuły: ' + c.articleCount: ''}
                                            details={c.subcategoryCount? 'Podkategorie: ' + c.subcategoryCount + ' • ': ''}
                                            style={{ backgroundColor: theme.background_2 }}
                                            onPress={() => router.push({
                                                pathname: (`/(tabs)/home/categories/${c.id}` as RelativePathString),
                                                params: { title: c.title,
                                                    articleCount: c.articleCount,
                                                    subcategoriesCount: c.subcategoryCount
                                                 }
                                            })}
                                            rightIconName='chevron-right'
                                        />
                                    )}
                                </View>
                            </>
                        )
                    }
                }
                contentContainerStyle={styles.listContent}
                itemLayoutAnimation={LinearTransition}
                // onEndReached={loadMore}
                // onEndReachedThreshold={0.3}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={isRefreshing}
                //         onRefresh={refresh}
                //         tintColor={theme.tint}
                //         colors={[theme.text]}
                //     />
                // }
                ListEmptyComponent={
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <Text style={{ color: theme.text }}>{t('empty_list')}</Text>
                    </View>
                }
            />

        </>
    );
};

export default CategoryDetails;
