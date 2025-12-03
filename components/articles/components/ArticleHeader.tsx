import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NormalArticle, CaseArticle, HandleArticle } from '@/types/Article';
import { useTranslation } from 'react-i18next';

interface Props {
    article: NormalArticle | CaseArticle | HandleArticle;
    theme: any;
}

const getSubTitle = (article: NormalArticle | CaseArticle | HandleArticle, t: any) => {
    switch (article.artTypeId) {
        case 0: return article.subtitle;
        case 1: return `${t('from_day')}: ${article.fromDay}`;
        case 2: return `${t('settle_place')}: ${article.settlePlace}`;
        default: return '';
    }
}

export function ArticleHeader({ article, theme }: Props) {
    const { t } = useTranslation();

    return (
        <View style={{ marginBottom: 12 }}>
            {/* TITLE */}
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: theme.text, lineHeight: 38 }}>
                {article.artTypeId == 0 ? article.title : article.artTypeId == 1 ? article.handleNumber : article.caseType || 'Brak tytułu'}
            </Text>



            {/* SUBTITLE */}
            {getSubTitle(article, t) ? (
                <Text style={{ color: theme.subText, marginTop: 8, fontSize: 18 }}>
                    {getSubTitle(article, t)}
                </Text>
            ) : null}
            {/* VIEWS */}
            <View style={{alignItems:'flex-end'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <MaterialIcons name="visibility" size={18} color={theme.subText} />
                    <Text style={{ color: theme.subText, marginLeft: 4 }}>
                        {article.readCount ?? 0}
                    </Text>
                </View>
            </View>
        </View>
    );
}
