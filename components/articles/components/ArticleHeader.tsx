import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Article } from '@/types/Article';

interface Props {
    article: Article;
    theme: any;
}

const getSubTitle = (article: Article, t: any) => {
    switch (article.articleType) {
        case 0: return article.subtitle;
        case 1: return `${t('from_day')}: ${article.resolutionDate?.date}`;
        case 2: return `${t('settle_place')}: ${article.resolutionPlace}`;
        default: return '';
    }
}

export function ArticleHeader({ article, theme }: Props) {
    const { t } = useTranslation();
    var he = require('he');

    return (
        <View style={{ marginBottom: 12 }}>
            {/* TITLE */}
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: theme.text, lineHeight: 38 }}>
                {he.decode(article.title)}
            </Text>



            {/* SUBTITLE */}
            {article.subtitle? (
                <Text style={{ color: theme.subText, marginTop: 8, fontSize: 18 }}>
                    {he.decode(article.subtitle)}
                </Text>
            ) : null}
            {/* VIEWS */}
            <View style={{alignItems:'flex-end'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <MaterialIcons name="visibility" size={18} color={theme.subText} />
                    <Text style={{ color: theme.subText, marginLeft: 4 }}>
                        {article.views ?? 0}
                    </Text>
                </View>
            </View>
        </View>
    );
}
