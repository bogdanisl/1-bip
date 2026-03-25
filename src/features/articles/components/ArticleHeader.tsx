import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Article } from '@/src/types/Article';

interface Props {
    article: Article;
    theme: any;
}

export function ArticleHeader({ article, theme }: Props) {
    const { t } = useTranslation();
    var he = require('he');

    return (
        <View style={{ marginBottom: 10 }}>
            {/* TITLE */}
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.text, paddingRight:50 }}>
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
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <MaterialIcons name="visibility" size={18} color={theme.subText} />
                    <Text style={{ color: theme.subText, marginLeft: 4 }}>
                        {article.views ?? 0}
                    </Text>
                </View>
            </View>
        </View>
    );
}
