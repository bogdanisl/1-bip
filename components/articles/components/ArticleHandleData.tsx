// app/components/MatrykaSection.tsx
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Br } from '@/components/Br';
import { Article } from '@/types/Article';
import { useTranslation } from 'react-i18next';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
    article: Article;
    theme: any;
}

export function HandleDataSection({ article, theme }: Props) {
    const { t }= useTranslation();
    return (
        <View>
            <Br></Br>
            <View style={{ marginTop: 8 }}>
                <View style={{ marginVertical: 8 }}>
                    {article.resolutionNumber && (
                        <View style={{ marginBottom: 8 }}>
                            <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>{t('resolution_number').toUpperCase()}</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center', marginTop: 4 }}>
                                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                    <MaterialIcons name='view-list' size={24} color={theme.tint} />
                                </View>
                                <Text style={{ color: theme.text, fontSize: 15 }}>{article.resolutionNumber}</Text>
                            </View>
                        </View>
                    )}

                    {article.resolutionDate && (
                        <View style={{ marginBottom: 8 }}>
                            <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>{t('resolution_date').toUpperCase()}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                    <MaterialIcons name='calendar-month' size={24} color={theme.tint} />
                                </View>
                                <Text style={{ fontSize: 14, color: theme.text }}>
                                    {new Date(article.resolutionDate.date!).toLocaleDateString('pl-PL', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </Text>
                            </View>
                        </View>
                    )}

                    {article.resolutionSubject && (
                        <>
                            <View style={{ marginBottom: 8 }}>
                                <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>{t('resolution_subject').toUpperCase()}</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center', marginTop: 4 }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                        <MaterialIcons name='format-quote' size={24} color={theme.tint} />
                                    </View>
                                    <Text style={{ color: theme.text, fontSize: 15 }}>
                                        {article.resolutionSubject}
                                    </Text>
                                </View>
                            </View>
                        </>
                    )}

                    {article.resolutionText && (
                        <View style={{ marginBottom: 8 }}>
                                <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>{t('resolution_text').toUpperCase()}</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center', marginTop: 4 }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                        <MaterialIcons name='done' size={24} color={theme.tint} />
                                    </View>
                                    <Text style={{ color: theme.text, fontSize: 15 }}>
                                        {article.resolutionText}
                                    </Text>
                                </View>
                            </View>
                    )}


                </View>

            </View>
        </View>
    );
}
