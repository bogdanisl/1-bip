import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { NormalArticle } from '@/types/Article';
import { ArticleHeader } from '../components/ArticleHeader';
import { ArticleContent } from '../components/ArticleContent';
import { AttachmentsList } from '../components/AttachmentList';
import { CategoriesSection } from '../components/CategoriesSection';
import { MatrykaSection } from '../components/MetricSection';

interface Props {
    article: NormalArticle;
}

export default function NormalArticlePage({ article }: Props) {
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
    const [isMatrykaOpen, setIsMatrykaOpen] = useState(false);

    if(!article) return null;
    return (
        <ScrollView style={{ backgroundColor: theme.background }}>
            <View style={{ padding: 16 }}>
                <ArticleHeader article={article} theme={theme} />
                <ArticleContent content={article.content ?? ''} theme={theme} />
                {(article.attachments && article.attachments?.length > 0) && <AttachmentsList attachments={article.attachments? article.attachments : []} theme={theme} slug={article.slug} />}
                {(article.categoryId || article.categoryId1 || article.categoryId2 || article.categoryId3) &&
                    <CategoriesSection categories={['Aktualności','Testowa Kategoria 2','Testowa Kategoria 3']} theme={theme} />
                }
                <MatrykaSection article={article} isOpen={isMatrykaOpen} toggle={() => setIsMatrykaOpen(prev => !prev)} theme={theme} />
                <View style={{ height: 60 }} />
            </View>
        </ScrollView>
    );
}
