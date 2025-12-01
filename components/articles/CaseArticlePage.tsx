// app/(tabs)/recent/CaseArticlePage.tsx
import React, { useState } from 'react';
import { styles } from '../../assets/styles/article_page_styles';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CaseArticle } from '@/types/Article';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
    article: CaseArticle;
}

export default function CaseArticlePage({ article }: Props) {
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
    const [isMatrykaOpen, setIsMatrykaOpen] = useState(false);

    const toggleMatryka = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsMatrykaOpen(prev => !prev);
    };

    return (
        <ScrollView style={{ backgroundColor: theme.background }}>
            <View style={styles.container}>

                {/* HEADER */}
                <View style={styles.headerSection}>
                    <Text style={[styles.title, { color: theme.text }]}>
                        {article.caseType || 'Rodzaj sprawy'}
                    </Text>

                    <View style={styles.viewCount}>
                        <MaterialIcons name="visibility" size={18} color={theme.subText} />
                        <Text style={[styles.viewCountText, { color: theme.subText }]}>
                            {article.readCount ?? 0}
                        </Text>
                    </View>
                </View>

                {/* SUBTITLE - miejsce załatwienia */}
                {article.settlePlace && (
                    <Text style={[styles.subtitle, { color: theme.subText }]}>
                        Miejsce załatwienia: {article.settlePlace}
                    </Text>
                )}

                {/* MAIN CONTENT BLOCK */}
                <View
                    style={[
                        styles.contentSection,
                        {
                            borderTopColor: theme.border,
                            borderBottomColor: theme.border,
                        },
                    ]}
                >
                    {/* Required documents */}
                    {article.requiredDocuments && (
                        <Text
                            style={[
                                styles.subtitle,
                                { color: theme.text, marginBottom: 12 },
                            ]}
                        >
                            Wymagane dokumenty: {article.requiredDocuments}
                        </Text>
                    )}

                    {/* Content */}
                    <Text style={[styles.contentText, { color: theme.text }]}>
                        {article.content || 'Informacje o sprawie są niedostępne.'}
                    </Text>
                </View>

                {/* CATEGORIES */}
                {(article.categoryId ||
                    article.categoryId1 ||
                    article.categoryId2 ||
                    article.categoryId3) && (
                    <View style={styles.categorySection}>
                        <Text
                            style={[
                                styles.sectionTitle,
                                {
                                    color: theme.text,
                                    fontSize: 15,
                                    fontWeight: 800,
                                    marginBottom: 0,
                                },
                            ]}
                        >
                            Kategorie
                        </Text>

                        <View style={styles.progressContainer}>
                            <View style={[styles.progressBar]} />
                        </View>

                        {/* TEMPORARY STATIC — replace when categories implemented */}
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 8,
                                flexWrap: 'wrap',
                            }}
                        >
                            <View
                                style={[
                                    styles.categoryChip,
                                    { backgroundColor: theme.inactive },
                                ]}
                            >
                                <Text
                                    style={[styles.categoryText, { color: theme.text }]}
                                >
                                    Sprawy urzędowe
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* METRYKA */}
                <TouchableOpacity
                    onPress={toggleMatryka}
                    style={[styles.matrykaHeader, { borderColor: theme.border }]}
                    activeOpacity={0.7}
                >
                    <Text
                        style={[
                            styles.sectionTitle,
                            { color: theme.text, fontSize: 15, fontWeight: 800 },
                        ]}
                    >
                        Metryka Wpisu
                    </Text>

                    <MaterialIcons
                        name={isMatrykaOpen ? 'expand-less' : 'expand-more'}
                        size={28}
                        color={theme.subText}
                    />
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar]} />
                </View>

                {isMatrykaOpen && (
                    <View style={styles.matrykaContent}>
                        {/* SOURCE */}
                        {article.source && (
                            <View style={styles.infoRow}>
                                <Text
                                    style={[styles.sectionTitle, { color: theme.subText }]}
                                >
                                    Źródło informacji
                                </Text>
                                <View style={styles.authorRow}>
                                    <View
                                        style={[
                                            styles.avatar,
                                            { backgroundColor: theme.background_2 },
                                        ]}
                                    >
                                        <MaterialIcons
                                            name="edit"
                                            size={24}
                                            color={theme.tint}
                                        />
                                    </View>
                                    <Text
                                        style={[styles.authorName, { color: theme.text }]}
                                    >
                                        {article.source}
                                    </Text>
                                </View>
                            </View>
                        )}

                        {/* ADDED TO SYSTEM */}
                        <View style={styles.infoRow}>
                            <Text
                                style={[styles.sectionTitle, { color: theme.subText }]}
                            >
                                WPROWADZIŁ DO SYSTEMU
                            </Text>
                            <View style={styles.authorRow}>
                                <View
                                    style={[
                                        styles.avatar,
                                        { backgroundColor: theme.background_2 },
                                    ]}
                                >
                                    <MaterialIcons
                                        name="verified-user"
                                        size={24}
                                        color={theme.tint}
                                    />
                                </View>
                                <Text
                                    style={[styles.authorName, { color: theme.text }]}
                                >
                                    Jan Nowak{'\n'}
                                    <Text
                                        style={{ fontSize: 13, color: theme.subText }}
                                    >
                                        {new Date(article.addedDate).toLocaleString('pl-PL')}
                                    </Text>
                                </Text>
                            </View>
                        </View>

                        {/* CREATED DATE */}
                        <View style={styles.infoRow}>
                            <Text
                                style={[styles.sectionTitle, { color: theme.subText }]}
                            >
                                Data wytworzenia
                            </Text>

                            <View style={styles.authorRow}>
                                <View
                                    style={[
                                        styles.avatar,
                                        { backgroundColor: theme.background_2 },
                                    ]}
                                >
                                    <MaterialIcons
                                        name="calendar-today"
                                        size={24}
                                        color={theme.tint}
                                    />
                                </View>
                                <Text
                                    style={[styles.authorName, { color: theme.text }]}
                                >
                                    {new Date(article.createdDate).toLocaleString(
                                        'pl-PL'
                                    )}
                                </Text>
                            </View>
                        </View>

                        {/* APPROVED DATE */}
                        {article.approvedDate && (
                            <View style={styles.infoRow}>
                                <Text
                                    style={[styles.sectionTitle, { color: theme.subText }]}
                                >
                                    Zatwierdził do publikacji
                                </Text>

                                <View style={styles.authorRow}>
                                    <View
                                        style={[
                                            styles.avatar,
                                            { backgroundColor: theme.background_2 },
                                        ]}
                                    >
                                        <MaterialIcons
                                            name="verified-user"
                                            size={24}
                                            color={theme.tint}
                                        />
                                    </View>
                                    <Text
                                        style={[styles.authorName, { color: theme.text }]}
                                    >
                                        Jan Nowak{'\n'}
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: theme.subText,
                                            }}
                                        >
                                            {new Date(
                                                article.approvedDate
                                            ).toLocaleString('pl-PL')}
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                )}

                <View style={{ height: 60 }} />
            </View>
        </ScrollView>
    );
}
