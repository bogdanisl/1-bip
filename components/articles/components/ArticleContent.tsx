// app/components/ArticleContent.tsx
import React from 'react';
import { View, Text } from 'react-native';


interface Props {
    content: string;
    theme: any;
}

export function ArticleContent({ content, theme }: Props) {
    var he = require('he');

    return (
        <View style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: theme.border,
            paddingVertical: 12,
            marginBottom: 16
        }}>
            <Text style={{ color: theme.text, fontSize: 16 }}>
                {`${he.decode(content)}` || 'Treść artykułu niedostępna.'}
            </Text>
        </View>
    );
}
