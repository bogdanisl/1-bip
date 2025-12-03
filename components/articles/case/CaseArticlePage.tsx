// app/(tabs)/recent/CaseArticlePage.tsx
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
import { CaseArticle } from '@/types/Article';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { getFileIcon } from '@/utils/attachement';
import { ArticleHeader } from '../components/ArticleHeader';
import { CategoriesSection } from '../components/CategoriesSection';
import { MatrykaSection } from '../components/MetricSection';
import { AttachmentsList } from '../components/AttachmentList';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
    article: CaseArticle;
}

export default function CaseArticlePage({ article }: Props) {
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

                {/* HEADER */}
                <ArticleHeader article={article} theme={theme}></ArticleHeader>

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
                {(article.attachments && article.attachments?.length > 0) &&
                    <AttachmentsList
                        attachments={article.attachments ? article.attachments : []}
                        theme={theme} slug={article.slug}
                    />
                }



                {/* CATEGORIES */}
                {(article.categoryId || article.categoryId1 || article.categoryId2 || article.categoryId3) &&
                    <CategoriesSection categories={['Sprawy urzędowe']} theme={theme} />
                }
                <MatrykaSection article={article} isOpen={isMatrykaOpen} toggle={toggleMatryka} theme={theme}></MatrykaSection>
                <View style={{ height: 60 }} />
            </View>
        </ScrollView>
    );
}
