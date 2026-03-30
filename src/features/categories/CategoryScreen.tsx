import { RefreshControl, Text, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { RelativePathString, router, Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@/src/hooks/use-theme-colors';
import { ArticleCard, ArticleCardPreloader } from '@/src/features/articles/ArticleCard';
import { styles } from '@/assets/styles/recent_index';
import { Article } from '@/src/types/Article';
import { useEffect, useState } from 'react';
import { Category } from '@/src/types/Category';
import FileItem from '@/src/components/buttons/ItemButton';
import { Skeleton } from '@/src/components/skeleton';
import { apiRequest } from '@/src/services/api/client';
import { EmptyState } from '@/src/components/EmptyState';

const CategoryScreen = () => {
    const { t } = useTranslation();
    const { theme } = useAppTheme();
    const { id, title, articleCount, subcategoriesCount } = useLocalSearchParams<{ id: string, title: string, articleCount: string, subcategoriesCount: string }>();

    const [articles, setArticles] = useState<Article[]>([]);
    const [category, setCategory] = useState<Category>();
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setRefreshing] = useState(false);
    const params = useLocalSearchParams<{ q?: string }>();
    const searchText = params?.q?.toLowerCase() || '';

    const skeletonData: Article[] = Array.from({ length: Number(articleCount ?? '6') }, (_, i) => ({
        id: -i - 1,
    } as Article));

    const skeletonSubcategories = Array.from({ length: Number(subcategoriesCount ?? '0') }, (_, i) => ({
        id: -i - 1,
    }));

    const loadCategory = async () => {

        const categoryLoad = await apiRequest<Category>(`/api/v1/category/${id}`, {
            body: {
                offset: 0,
                limit: 20,
            }
        });
        if (!categoryLoad) return;
        setCategory(categoryLoad);
        if (categoryLoad.articles) {
            setArticles(categoryLoad.articles);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadCategory();
    }, [])

    const handleRefresh = async () => {
        setRefreshing(true);
        loadCategory();
        setTimeout(() => { setRefreshing(false) }, 1000)
    }
    const filteredArticles = articles.filter(a =>
        !searchText || a.title?.toLowerCase().includes(searchText)
    );

    return (
        <>
            <Stack.Screen
                options={

                    articles.length > 0 ? {
                        title: title,
                        headerSearchBarOptions: {
                            headerIconColor: theme.icon,
                            tintColor: theme.tint,
                            textColor: theme.text,
                            hintTextColor: theme.tint,
                            placeholder: t('search_article'),
                            onChangeText: (event) => {
                                router.setParams({
                                    q: event.nativeEvent.text,
                                });
                            },
                        },
                    } : {
                        title: title,
                    }}
            >
            </Stack.Screen>
            <Animated.FlatList
                data={isLoading ? skeletonData : filteredArticles}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item }: { item: Article }) =>
                    isLoading ? <ArticleCardPreloader /> : <ArticleCard article={item} path={(`.${id}/${item.id}` as RelativePathString)} />
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
                                            detailsAccent={c.articleCount ? t('articles') + ': ' + c.articleCount : ''}
                                            details={c.subcategoryCount ? t('subcategories') + + c.subcategoryCount + ' • ' : ''}
                                            style={{ backgroundColor: theme.background_2 }}
                                            onPress={() => router.push({
                                                pathname: (`/(tabs)/home/categories/${c.id}` as RelativePathString),
                                                params: {
                                                    title: c.title,
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
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        tintColor={theme.tint}
                        colors={[theme.text]}
                    />
                }
                ListEmptyComponent={
                    <EmptyState
                        title={t('empty_article_list')}
                        onRefresh={handleRefresh}
                    />
                }
            />

        </>
    );
};

export default CategoryScreen;
