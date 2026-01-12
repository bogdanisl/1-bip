import React from 'react';
import { View, Text, useColorScheme, Dimensions, TouchableOpacity } from 'react-native';
import { useArticles } from '@/hooks/use-articles';
import { useSelectedBipStore } from '@/hooks/use-selected-bip';
import { Colors } from '@/constants/theme';
import { ArticleCard, ArticleCardPreloader } from '@/components/articles/ArticleCard';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';

export default function HomeArticles() {
    const selectedBip = useSelectedBipStore((s) => s.selectedBip);
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const width = Dimensions.get('window').width;
    const ref = React.useRef<ICarouselInstance>(null);

    const { t } = useTranslation();

    const { articles, isLoading } = useArticles();
    // Take only the first 3 articles
    const topArticles = articles.slice(0, 3);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };

    if (!isLoading && topArticles.length === 0) {
        return (
            <View style={{ marginVertical: 16 }}>
                <ArticleCardPreloader />
            </View>
        );
    }
    const panGesture = Gesture.Pan()
        // Carousel aktywuje się TYLKO przy ruchu poziomym
        .activeOffsetX([-15, 15])

        // Jeśli użytkownik ruszy palcem w pionie → gesture FAIL
        .failOffsetY([-10, 10]);
    return (
        <View style={{ marginVertical: 16, paddingHorizontal: 16 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: theme.text, marginBottom: 12 }}>
                    {t('home.latest_articles')}
                </Text>
                <TouchableOpacity
                    onPress={() => { router.push('/(tabs)/recent'); }}
                    style={{ paddingVertical: 12, borderRadius: 8, paddingHorizontal: 12, alignItems: 'center', backgroundColor: theme.tint }}
                >
                    <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', fontSize: 13, letterSpacing: 1.2 }}>
                        {t('see_all').toUpperCase()}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Carousel */}
            <Pagination.Basic
                progress={progress}
                data={topArticles}
                dotStyle={{ backgroundColor: theme.border, borderRadius: 50 }}
                containerStyle={{ gap: 5 }}
                activeDotStyle={{ backgroundColor: theme.tint }}
                onPress={onPressPagination}
            />
            {
                (isLoading && topArticles.length === 0) ? (
                    <ArticleCardPreloader />
                ) : (
                    <Carousel
                        ref={ref}
                        width={width}
                        data={topArticles}
                        height={230} // slightly taller to fit full ArticleCard
                        loop
                        autoPlay
                        autoPlayInterval={6000}
                        style={{ marginHorizontal: -32 }}
                        pagingEnabled
                        mode='parallax'
                        modeConfig={{ parallaxScrollingScale: 0.9, parallaxScrollingOffset: 50 }}
                        onProgressChange={(offsetProgress, absoluteProgress) => {
                            progress.value = absoluteProgress;
                        }}
                        renderItem={({ item }) => (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ArticleCard style={{ width: width, flex: 1 }} article={item} />
                            </View>
                        )}
                    />

                )
            }

        </View>
    );
}
