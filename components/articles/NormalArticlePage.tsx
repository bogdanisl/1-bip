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
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

// Включаем LayoutAnimation на Android
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}
const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case 'pdf':
            return <MaterialIcons name="picture-as-pdf" size={24} color="#e74c3c" />;
        case 'doc':
        case 'docx':
            return <MaterialIcons name="description" size={24} color="#3498db" />;
        case 'image':
        case 'png':
        case 'jpg':
        case 'webp':
            return <MaterialIcons name="image" size={24} color="#f1c40f" />;
        case 'rar':
        case 'zip':
            return <MaterialIcons name="folder-zip" size={24} color="#9b59b6" />;
        case 'excel':
        case 'xlsx':
            return <MaterialIcons name="grid-on" size={24} color="#2ecc71" />;
        default:
            return <MaterialIcons name="insert-drive-file" size={24} color="#7f8c8d" />;
    }
};

interface Props {
    article: NormalArticle;
}

export default function NormalArticlePage({ article }: Props) {
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
    const [isMatrykaOpen, setIsMatrykaOpen] = useState(false);
    const { t } = useTranslation();
    //console.log(article.attachments)

    const toggleMatryka = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsMatrykaOpen(prev => !prev);
    };
    //const pdfUri = 'https://www.bip.alpanet.pl/dokumenty/Lorem-ipsum-dolor-sit-amet_2.doc';

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

                {article.attachments && article.attachments.length > 0 && (
                    <View>
                        <Text
                            style={[
                                styles.sectionTitle,
                                { color: theme.text, fontSize: 15, fontWeight: '800', marginBottom: 5 },
                            ]}
                        >
                            Dokumenty
                        </Text>

                        <View style={styles.progressContainer}>
                            <View style={[styles.progressBar]} />
                        </View>

                        <View>
                            {article.attachments.map((attachment, index) => (
                                <TouchableOpacity
                                    key={attachment.id}
                                    onPress={() => { router.push(`/(tabs)/recent/${article.slug}/${attachment.name}.${attachment.extension}`) }} style={[styles.authorRow, { marginBottom: 10 }]}>
                                    <View style={[styles.avatar, { backgroundColor: theme.background_2 }]}>
                                        {getFileIcon(attachment.extension)}
                                    </View>
                                    <Text style={[styles.authorName, { color: theme.text }]}>
                                        {attachment.name + '.' + attachment.extension + '\n'}
                                        <Text style={{ fontSize: 13, color: theme.subText }}>
                                            {`${t('size')}: ${attachment.size}, ${t('format')}: ${attachment.extension}, ${t('language')}: ${attachment.language}`}
                                        </Text>
                                    </Text>
                                    {/* <View style={{ flex: 1 }}>
                                        <View style={[{ justifyContent: 'center', alignSelf: 'flex-end' }]}>
                                            <MaterialIcons size={24} name='download' color={theme.tint}></MaterialIcons>
                                        </View>
                                    </View> */}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}


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

