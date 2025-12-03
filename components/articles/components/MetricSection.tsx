// app/components/MatrykaSection.tsx
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BaseArticle } from '@/types/Article';
import { Br } from '@/components/Br';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
    article: BaseArticle;
    isOpen: boolean;
    toggle: () => void;
    theme: any;
}

export function MatrykaSection({ article, isOpen, toggle, theme }: Props) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isOpen) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
        } else {
            Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start();
        }
    }, [isOpen]);

    return (
        <View>
            <TouchableOpacity
                onPress={toggle}
                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: theme.border, paddingVertical: 12 }}
            >
                <Text style={{ color: theme.text, fontSize: 15, fontWeight: '800' }}>{('Metryka Wpisu'.toUpperCase())}</Text>
                <MaterialIcons name={isOpen ? 'expand-less' : 'expand-more'} size={28} color={theme.subText} />
            </TouchableOpacity>
                <Br/>
            <Animated.View style={{ opacity: fadeAnim, marginTop: 8 }}>
                {isOpen && (
                    <View style={{ marginVertical: 8 }}>
                        {article.source && (
                            <View style={{ marginBottom: 8 }}>
                                <Text style={{ color: theme.subText, marginBottom:8, fontWeight: '700', fontSize:12 }}>{('Źródło informacji').toUpperCase()}</Text>
                                <View style={{ flexDirection: 'row', marginBottom:8, alignItems: 'center', marginTop: 4 }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                        <MaterialIcons name="edit" size={24} color={theme.tint} />
                                    </View>
                                    <Text style={{ color: theme.text, fontSize:15 }}>{article.source}</Text>
                                </View>
                            </View>
                        )}

                        {article.authorId && (
                            <View style={{ marginBottom: 8 }}>
                                <Text style={{ color: theme.subText, marginBottom:8, fontWeight: '700', fontSize:12 }}>{('WPROWADZIŁ DO SYSTEMU').toUpperCase()}</Text>
                                <View style={{ flexDirection: 'row', marginBottom:8, alignItems: 'center', marginTop: 4 }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                        <MaterialIcons name="verified-user" size={24} color={theme.tint} />
                                    </View>
                                    <Text style={{ color: theme.text, fontSize:15 }}>
                                        Jan Nowak{'\n'}
                                        <Text style={{ fontSize: 13, color: theme.subText }}>
                                            {new Date(article.addedDate).toLocaleDateString('pl-PL', {
                                                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
                                            })}
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        )}

                        {article.addedDate && (
                            <View style={{ marginBottom: 8 }}>
                                <Text style={{ color: theme.subText, marginBottom:8, fontWeight: '700', fontSize:12 }}>{('Zatwierdził do publikacji').toUpperCase()}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                        <MaterialIcons name="verified-user" size={24} color={theme.tint} />
                                    </View>
                                    <Text style={{ color: theme.text, fontSize:1 }}>
                                        Jan Nowak{'\n'}
                                        <Text style={{ fontSize: 13, color: theme.subText }}>
                                            {new Date(article.addedDate).toLocaleDateString('pl-PL', {
                                                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
                                            })}
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                )}
            </Animated.View>
        </View>
    );
}
