import { Br } from "@/src/components/Br";
import { EmptyState } from "@/src/components/EmptyState";
import { Colors } from "@/src/constants/theme";
import { useSelectedBipStore } from "@/src/hooks/use-selected-bip";
import { apiRequest } from "@/src/services/api/client";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Dimensions, Platform, ScrollView, StyleSheet, useColorScheme, View, Text } from "react-native";
import RenderHTML from "react-native-render-html";

interface Props {
    type: 'accessibility' | 'privacy';
}
export default function AgreementScreen({ type }: Props) {
    const selectedBip = useSelectedBipStore((s) => s.selectedBip);
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const [content, setContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const width = Dimensions.get('window').width;

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            setLoading(true);
            setContent(null);
            try {
                const data = await apiRequest<string>(`/api/v1/${type}`);
                if (!cancelled && data) {
                    setContent((data as any).content);
                }
            } catch (e) {
                console.error('Failed to load accessibility declaration:', e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => { cancelled = true; };
    }, [selectedBip]);

    const source = useMemo(() => ({ html: content ?? '' }), [content]);

    const tagsStyles = useMemo(() => ({
        p: {
            color: theme.text, fontSize: 16, lineHeight: 22,
        },
        span: { color: theme.text, fontSize: 16 },
        strong: { fontWeight: '700' as const, color: theme.text },
        em: { fontStyle: 'italic' as const, color: theme.text },
        a: { color: theme.tint },
        li: { color: theme.text, fontSize: 16 },
        img: { marginVertical: 10 },
        h1: { color: theme.text },
        ul: { marginBottom: 8 },
        h2: {
            color: theme.tint,
            fontSize: 22,
            fontWeight: 'bold' as const,
            marginTop: 15,
            marginBottom: 8,
        },
        h3: { color: theme.tint, fontSize: 16, fontWeight: '600' as const, marginBottom: 5 },
    }), [theme]);

    if (loading) {
        return (

            <View style={styles.centered}>
                <ActivityIndicator size="large" color={theme.subText} />
            </View>
        );
    }

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: theme.background }]}
            contentContainerStyle={styles.content}
            automaticallyAdjustContentInsets={true}
        >
            {content ? (
                <>
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            color: theme.text,
                            marginBottom: 10
                        }}
                    >{type == 'accessibility' ? 'Deklaracja dostępności' : 'Polityka prywatności'}
                    </Text>
                    <Br />
                    <RenderHTML
                        contentWidth={width}
                        source={source}
                        ignoredDomTags={['table']}
                        tagsStyles={tagsStyles}
                        enableExperimentalMarginCollapsing={true}
                        defaultTextProps={{ selectable: true }}
                        baseStyle={{ color: theme.text }}
                        enableCSSInlineProcessing={true}
                    />
                </>
            ) :
                <EmptyState />
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingTop: Platform.OS == 'android' ? 10 : 120
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});