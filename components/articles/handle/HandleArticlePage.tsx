// app/(tabs)/recent/HandleArticlePage.tsx
import React, { useState } from 'react';
import { styles } from '../../../assets/styles/article_page_styles';
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
import { HandleArticle } from '@/types/Article';
import { getFileIcon } from '@/utils/attachement';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ArticleHeader } from '../components/ArticleHeader';
import { CategoriesSection } from '../components/CategoriesSection';
import { MatrykaSection } from '../components/MetricSection';
import { ArticleContent } from '../components/ArticleContent';
import { AttachmentsList } from '../components/AttachmentList';


if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
    article: HandleArticle;
}

export default function HandleArticlePage({ article }: Props) {
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
    const [isMatrykaOpen, setIsMatrykaOpen] = useState(false);
    const { t } = useTranslation();
    const toggleMatryka = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsMatrykaOpen(prev => !prev);
    };

    return (
        <ScrollView style={{ backgroundColor: theme.background }}>
            <View style={styles.container}>

                <ArticleHeader article={article} theme={theme} />


                {/* MAIN CONTENT BLOCK */}
                <View
                    style={[
                        styles.contentSection,
                        {
                            borderTopColor: theme.border,
                        },
                    ]}
                >
                    {/* Regarding section */}
                    {article.regarding && (
                        <View style={styles.infoRow}>
                            <Text style={[styles.sectionTitle, { color: theme.subText }]}>
                                W SPRAWIE
                            </Text>

                            <View style={styles.authorRow}>
                                <View style={[styles.avatar, { backgroundColor: theme.background_2 }]}>
                                    <MaterialIcons name="info-outline" size={24} color={theme.tint} />
                                </View>

                                <Text style={[styles.authorName, { color: theme.text }]}>
                                    {article.regarding}
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Obligates */}
                    {article.obliges && (
                        <View style={[styles.infoRow, { marginTop: 10 }]}>
                            <Text style={[styles.sectionTitle, { color: theme.subText }]}>
                                OBOWIĄZUJE
                            </Text>

                            <View style={styles.authorRow}>
                                <View style={[styles.avatar, { backgroundColor: theme.background_2 }]}>
                                    <MaterialIcons name="gavel" size={24} color={theme.tint} />
                                </View>

                                <Text style={[styles.authorName, { color: theme.text }]}>
                                    {article.obliges}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
                {/* Content */}
                <ArticleContent content={article.content || ''} theme={theme} />

                {(article.attachments && article.attachments?.length > 0) && <AttachmentsList attachments={article.attachments? article.attachments : []} theme={theme} slug={article.slug} />}


                {(article.categoryId || article.categoryId1 || article.categoryId2 || article.categoryId3) &&
                    <CategoriesSection categories={['Uchwały']} theme={theme} />
                }

                <MatrykaSection article={article} isOpen={isMatrykaOpen} toggle={toggleMatryka} theme={theme}></MatrykaSection>

                <View style={{ height: 60 }} />
            </View>
        </ScrollView>
    );
}
