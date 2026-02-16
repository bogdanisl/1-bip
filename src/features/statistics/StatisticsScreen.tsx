import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, hexToRgba } from "@/constants/theme";
import { Br } from "@/src/components/Br";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Article } from "@/types/Article";
import { Category, CategoryStat } from "@/types/Category";
import { fetchMostReadArticles } from "@/utils/articles";
import { fetchMostReadCategories } from "@/utils/categories";
import ActivityIndicator from "@/src/components/ActivityIndicator";


export default function StatisticsScreen() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
    const [topArticle, setTopArticle] = useState<Article>();
    const [topCategory, setTopCategory] = useState<CategoryStat>();
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<CategoryStat[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadArticle = async () => {
            const data = await fetchMostReadArticles(0, 5, 'https://www.dev.bip.av1.pl');
            if (!data) return;
            setArticles(data);
            setTopArticle(data[0]);
            const dataCat = await fetchMostReadCategories(0, 5, 'https://www.dev.bip.av1.pl');
            if (!dataCat) return;
            setCategories(dataCat);
            setTopCategory(dataCat[0]);
            setIsLoading(false);
        }
        loadArticle();
    }, [])

    const renderProgressBar = (percent: number, useGradient: boolean = false) => {
        return (
            <View
                style={{
                    height: 8,
                    width: "100%",
                    backgroundColor: theme.background,
                    borderRadius: 4,
                    overflow: "hidden",
                }}
            >
                {useGradient ? (
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[theme.tint, "#ff2600ff"]} // red → orange subtle gradient
                        style={{ width: `${percent}%`, height: 8, borderRadius: 10 }}
                    />
                ) : (
                    <View
                        style={{
                            height: 8,
                            width: `${percent}%`,
                            backgroundColor: theme.tint,
                        }}
                    />
                )}
            </View>
        );
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} />
            </View>
        )
    }

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{ flex: 1, backgroundColor: theme.background, paddingTop: 20 }}
        >
            {/* Top articles */}
            <View style={{ paddingHorizontal: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons name="article" size={24} color={theme.tint} />
                    <Text
                        style={{
                            color: theme.text,
                            fontSize: 15,
                            fontWeight: "800",
                            marginLeft: 10,
                            marginVertical: 10,
                        }}
                    >
                        Najpopularniejsze artykuły
                    </Text>
                </View>
                <Br />

                <View style={{ marginTop: 10, gap: 12 }}>
                    {articles.map(article => {
                        if (!article.views) return;
                        const widthPercent = (article.views / topArticle!.views!) * 100;
                        return (
                            <View
                                key={article.id}
                                style={{
                                    padding: 15,
                                    backgroundColor: theme.background_2,
                                    borderRadius: 15,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 15,
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: articles[0].id === article.id ? theme.tint : theme.background,
                                            height: 28,
                                            width: 28,
                                            borderRadius: 30,
                                            marginRight: 10,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: articles[0].id === article.id ? "white" : theme.text,
                                                textAlign: "center",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {articles.indexOf(article) + 1}
                                        </Text>
                                    </View>
                                    <Text
                                        style={{
                                            color: theme.text,
                                            flex: 1,
                                            fontSize: 16,
                                            fontWeight: "600",
                                        }}
                                    >
                                        {article.title}
                                    </Text>
                                    <Text
                                        style={{
                                            color: articles[0].id === article.id ? theme.tint : theme.text,
                                            fontWeight: "700",
                                            marginLeft: 10,
                                            fontSize: 16,
                                        }}
                                    >
                                        {article.views}
                                    </Text>
                                </View>

                                {renderProgressBar(widthPercent, true)}
                            </View>
                        );
                    })}
                </View>
            </View>

            {/* Top categories */}
            <View style={{ paddingHorizontal: 10, marginTop: 40 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons name="pie-chart" size={24} color={theme.tint} />
                    <Text
                        style={{
                            color: theme.text,
                            fontSize: 15,
                            fontWeight: "800",
                            marginLeft: 10,
                            marginVertical: 10,
                        }}
                    >
                        Kategorie z największym udziałem
                    </Text>
                </View>
                <Br />

                <View style={{ marginTop: 10, gap: 12 }}>
                    {categories.map(category => {
                        return (
                            <View
                                key={category.id}
                                style={{
                                    padding: 15,
                                    backgroundColor: theme.background_2,
                                    borderRadius: 15,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 15,
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: category.id === topCategory?.id ? theme.tint : theme.background,
                                            height: 28,
                                            width: 28,
                                            borderRadius: 30,
                                            marginRight: 10,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: category.id === topCategory?.id ? "white" : theme.text,
                                                textAlign: "center",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {categories.indexOf(category) + 1}
                                        </Text>
                                    </View>
                                    <Text
                                        style={{
                                            color: theme.text,
                                            flex: 1,
                                            fontSize: 16,
                                            fontWeight: "600",
                                        }}
                                    >
                                        {category.title}
                                    </Text>
                                    <Text
                                        style={{
                                            color: category.id === topCategory?.id ? theme.tint : theme.text,
                                            fontWeight: "700",
                                            marginLeft: 10,
                                            fontSize: 16,
                                        }}
                                    >
                                        {category.percentage}%
                                    </Text>
                                </View>

                                {/* Progress bar with subtle gradient */}
                                {renderProgressBar(category.percentage, true)}
                            </View>
                        );
                    })}
                </View>
            </View>

            {/* <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, marginVertical: 20 }}>
                <View style={{
                    width: '48%',
                    backgroundColor: theme.background_2,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 20,
                    elevation: 6,
                }}>
                    <MaterialIcons name='trending-up' size={36} color={theme.tint} />
                    <Text style={{ color: theme.text, fontSize: 24, fontWeight: "700", marginTop: 10 }}>2.4k</Text>
                    <Text style={{ color: theme.subText, fontSize: 13, marginTop: 4, textAlign: "center" }}>Łączna liczba wyświetleń</Text>
                </View>

                <View style={{
                    width: '48%',
                    backgroundColor: theme.background_2,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 20,
                    elevation: 6,
                }}>
                    <MaterialIcons name='list' size={36} color={theme.tint} />
                    <Text style={{ color: theme.text, fontSize: 24, fontWeight: "700", marginTop: 10 }}>15</Text>
                    <Text style={{ color: theme.subText, fontSize: 13, marginTop: 4, textAlign: "center" }}>Liczba kategorii</Text>
                </View>
            </View> */}
        </ScrollView>
    );
}
