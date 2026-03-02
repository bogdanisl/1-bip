// app/components/ArticleContent.tsx
import { Br } from '@/src/components/Br';
import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';


interface Props {
    content: string;
    theme: any;
}

export function ArticleContent({ content, theme }: Props) {
    const { width } = useWindowDimensions();
    //var he = require('he');
    //const decoded = he.decode(content || '');
    const transformedIMG = content.replaceAll('<img src="', `<img src="${'https://www.bip.alpanet.pl/'}`)
    //console.log(content);

    return (
        <View
            style={{
                borderBottomWidth: 1,
                borderColor: theme.border,
                paddingVertical: 12,
                marginBottom: 16
            }}
        >
            <Br/>
            <RenderHTML
                contentWidth={width}
                source={{ html: transformedIMG }}
                ignoredDomTags={['table']}
                tagsStyles={{
                    p: { color: theme.text, fontSize: 16, lineHeight: 22 },
                    span: { color: theme.text, fontSize: 16 },
                    strong: { fontWeight: '700', color: theme.text },
                    em: { fontStyle: 'italic', color: theme.text },
                    a: { color: theme.tint },
                    li: { color: theme.text, fontSize: 16 },
                    img: { marginVertical: 10 }
                }}
                enableExperimentalMarginCollapsing={true}
                defaultTextProps={{
                    selectable: true
                }}
                baseStyle={{ color: theme.text }}
                enableCSSInlineProcessing={true}

            />
        </View>
    );
}
