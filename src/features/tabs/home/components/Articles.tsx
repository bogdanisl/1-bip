import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { useArticles } from '@/src/hooks/use-articles';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import { Colors } from '@/src/constants/theme';
import { ArticleCard, ArticleCardPreloader } from '@/src/features/articles/ArticleCard';
import { useTranslation } from 'react-i18next';
import { RelativePathString, router } from 'expo-router';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { useAppTheme } from '@/src/hooks/use-theme-colors';

export default function HomeArticles() {
    const { theme } = useAppTheme();
    const isContrastTheme = theme.text == '#ffff00';
    const width = Dimensions.get('window').width;
    const ref = React.useRef<ICarouselInstance>(null);

    const { t } = useTranslation();
    const { articles, isLoading } = useArticles({ initialLimit: 5 });

    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };

    if (!isLoading && articles.length === 0) {
        return (
            <></>
        );
    }
    const panGesture = Gesture.Pan()
        // Carousel aktywuje się TYLKO przy ruchu poziomym
        .activeOffsetX([-15, 15])

        // Jeśli użytkownik ruszy palcem w pionie → gesture FAIL
        .failOffsetY([-10, 10]);
    return (
        <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: theme.text, marginBottom: 12 }}>
                    {t('home.latest_articles')}
                </Text>
                <TouchableOpacity
                    onPress={() => { router.push('/(tabs)/recent'); }}
                    style={{ paddingVertical: 12, borderRadius: 8, paddingHorizontal: 12, alignItems: 'center', backgroundColor: theme.tint }}
                >
                    <Text style={{ color: theme.whiteText, fontFamily: 'Poppins-Bold', fontSize: 13, letterSpacing: 1.2 }}>
                        {t('see_all').toUpperCase()}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Carousel */}
            <Pagination.Basic
                progress={progress}
                data={articles}
                dotStyle={{ backgroundColor: theme.border, borderRadius: 50 }}
                containerStyle={{ gap: 5 }}
                activeDotStyle={{ backgroundColor: isContrastTheme? theme.background_2: theme.tint }}
                onPress={onPressPagination}

            />
            {
                (isLoading && articles.length === 0) ? (
                    <View
                        style={{
                            marginHorizontal: -20
                        }}
                    >
                        <ArticleCardPreloader />
                    </View>
                ) : (
                    <Carousel
                        ref={ref}
                        width={width}
                        data={articles}
                        height={230} // slightly taller to fit full ArticleCard
                        loop
                        autoPlay
                        autoPlayInterval={6000}
                        style={{ marginHorizontal: -32, marginTop: 5 }}
                        pagingEnabled
                        mode='parallax'
                        modeConfig={{ parallaxScrollingScale: 1, parallaxAdjacentItemScale: 0.8, parallaxScrollingOffset: 65 }}
                        onProgressChange={(offsetProgress, absoluteProgress) => {
                            progress.value = absoluteProgress;
                        }}
                        onConfigurePanGesture={(pan) =>
                            pan.activeOffsetX([-12, 12])
                        }
                        renderItem={({ item }) => (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ArticleCard variant='short' style={{ width: width - 32, flex: 1 }} article={item} path={`/(tabs)/home/categories/${item.categoryId}/${item.id}` as RelativePathString} />
                            </View>
                        )}
                    />

                )
            }

        </View>
    );
}
