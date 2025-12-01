// app/(tabs)/recent/NormalArticlePage.tsx
import React, { useState } from 'react';
import { styles } from '../../assets/styles/article_page_styles'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { NormalArticle } from '@/types/Article';

// Включаем LayoutAnimation на Android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
    article: NormalArticle;
}

export default function NormalArticlePage({ article }: Props) {
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
    const [isMatrykaOpen, setIsMatrykaOpen] = useState(false);

    const toggleMatryka = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsMatrykaOpen(prev => !prev);
    };

    return (
        <ScrollView style={{ backgroundColor: theme.background }}>
            <View style={styles.container}>
                {/* Заголовок + просмотры */}
                <View style={styles.headerSection}>
                    <Text style={[styles.title, { color: theme.text }]}>
                        {article.title || 'Brak tytułu'}
                    </Text>

                    <View style={styles.viewCount}>
                        <MaterialIcons name="visibility" size={18} color={theme.subText} />
                        <Text style={[styles.viewCountText, { color: theme.subText }]}>
                            {article.readCount ?? 0}
                        </Text>
                    </View>
                </View>

                {/* Подзаголовок */}
                {article.subtitle && (
                    <Text style={[styles.subtitle, { color: theme.subText }]}>
                        {article.subtitle}
                    </Text>
                )}

                {/* Основной контент */}
                <View style={[styles.contentSection, { borderTopColor: theme.border, borderBottomColor: theme.border }]}>
                    <Text style={[styles.contentText, { color: theme.text }]}>
                        {article.content || 'Treść artykułu niedostępna.'}
                    </Text>
                </View>


                {(article.categoryId || article.categoryId1 || article.categoryId2 || article.categoryId3) && (
                    <View style={styles.categorySection}>
                        <Text style={[styles.sectionTitle, { color: theme.text, fontSize: 15, fontWeight: 800, marginBottom: 0 }]}>Kategorie</Text>
                        <View style={styles.progressContainer}>
                            <View style={[styles.progressBar]} />
                        </View>
                        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                            <View style={[styles.categoryChip, { backgroundColor: theme.inactive }]}>
                                <Text style={[styles.categoryText, { color: theme.text }]}>Aktualności</Text>
                            </View>
                            <View style={[styles.categoryChip, { backgroundColor: theme.inactive }]}>
                                <Text style={[styles.categoryText, { color: theme.text }]}>Testowa Kategoria 2</Text>
                            </View>
                            <View style={[styles.categoryChip, { backgroundColor: theme.inactive }]}>
                                <Text style={[styles.categoryText, { color: theme.text }]}>Testowa Kategoria 3</Text>
                            </View>

                        </View>
                    </View>
                )}

                {/* Кнопка "Matryka Wpisu" */}
                <TouchableOpacity
                    onPress={toggleMatryka}
                    style={[styles.matrykaHeader, { borderColor: theme.border }]}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.sectionTitle, { color: theme.text, fontSize: 15, fontWeight: 800, marginBottom: 0 }]}>Metryka Wpisu</Text>

                    <MaterialIcons
                        name={isMatrykaOpen ? 'expand-less' : 'expand-more'}
                        size={28}
                        color={theme.subText}
                    />
                </TouchableOpacity>
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar]} />
                </View>
                {/* Сворачиваемый блок */}
                {isMatrykaOpen && (
                    <View style={styles.matrykaContent}>
                        {/* Источник */}
                        {article.source && (
                            <View style={styles.infoRow}>
                                <Text style={[styles.sectionTitle, { color: theme.subText }]}>Źródło informacji</Text>
                                <View style={styles.authorRow}>
                                    <View style={[styles.avatar, { backgroundColor: theme.background_2 }]}>
                                        <MaterialIcons name="edit" size={24} color={theme.tint} />
                                    </View>
                                    <Text style={[styles.authorName, { color: theme.text }]}>{article.source}</Text>
                                </View>
                            </View>
                        )}
                        {/* Автор (wprowadził) */}
                        {article.authorId && (
                            <View style={styles.infoRow}>
                                <Text style={[styles.sectionTitle, { color: theme.subText }]}>WPROWADZIŁ DO SYSTEMU</Text>
                                <View style={styles.authorRow}>
                                    <View style={[styles.avatar, { backgroundColor: theme.background_2 }]}>
                                        <MaterialIcons name="verified-user" size={24} color={theme.tint} />
                                    </View>
                                    <Text style={[styles.authorName, { color: theme.text }]}>
                                        Jan Nowak{'\n'}
                                        <Text style={{ fontSize: 13, color: theme.subText }}>
                                            {new Date(article.addedDate).toLocaleDateString('pl-PL', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        )}

                        {/* Zatwierdzone przez */}
                        {article.addedDate && (
                            <View style={styles.infoRow}>
                                <Text style={[styles.sectionTitle, { color: theme.subText }]}>Zatwierdził do publikacji</Text>
                                <View style={styles.authorRow}>
                                    <View style={[styles.avatar, { backgroundColor: theme.background_2 }]}>
                                        <MaterialIcons name="verified-user" size={24} color={theme.tint} />
                                    </View>
                                    <Text style={[styles.authorName, { color: theme.text }]}>
                                        Jan Nowak{'\n'}
                                        <Text style={{ fontSize: 13, color: theme.subText }}>
                                            {new Date(article.addedDate).toLocaleDateString('pl-PL', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
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

