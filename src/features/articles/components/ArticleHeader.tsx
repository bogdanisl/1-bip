import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Article } from '@/src/types/Article';
import { TranslateButton } from '@/src/components/buttons/TranslateButton';
import { translate } from '@/src/services/translate';

interface Props {
    article: Article;
    theme: any;
    handleTranslate: () => void
    translating: boolean
    translateLabel:string
}

export function ArticleHeader({ article, theme, handleTranslate, translating, translateLabel }: Props) {
    const { t } = useTranslation();
    var he = require('he');

    return (
        <View style={{ marginBottom: 10 }}>
            {/* TITLE */}
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.text, paddingRight: 50 }}>
                {he.decode(article.title)}
            </Text>



            {/* SUBTITLE */}
            {article.subtitle ? (
                <Text style={{ color: theme.subText, marginTop: 8, fontSize: 18 }}>
                    {he.decode(article.subtitle)}
                </Text>
            ) : null}
            {/* VIEWS */}
            <View style={{}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <TranslateButton theme={theme} onPress={handleTranslate} label={translateLabel} loading={translating} />
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="visibility" size={18} color={theme.subText} />
                        <Text style={{ color: theme.subText, marginLeft: 4 }}>
                            {article.views ?? 0}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
