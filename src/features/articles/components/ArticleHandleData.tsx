// app/components/MatrykaSection.tsx
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Br } from '@/src/components/Br';
import { Article } from '@/types/Article';
import { useTranslation } from 'react-i18next';
import FileItem from '@/src/components/buttons/ItemButton';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
    article: Article;
    theme: any;
}

export function HandleDataSection({ article, theme }: Props) {
    const { t } = useTranslation();
    return (
        <View>
            <Br></Br>
            <View style={{ marginTop: 8 }}>
                <View style={{ marginVertical: 8, gap: 10 }}>
                    {article.resolutionNumber && (
                        <FileItem
                            name={article.resolutionNumber}
                            style={{ backgroundColor: theme.background_2 }}
                            iconBackground={theme.background}
                            leftIconName="view-list"
                            details={t('resolution_number')}
                            disabled
                        />
                    )}

                    {article.resolutionDate && (
                        <FileItem
                            name={new Date(article.resolutionDate.date!).toLocaleDateString('pl-PL', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                            style={{ backgroundColor: theme.background_2 }}
                            iconBackground={theme.background}
                            leftIconName="calendar-month"
                            details={t('resolution_date')}
                            disabled
                        />
                    )}

                    {article.resolutionSubject && (
                        <FileItem
                            name={article.resolutionSubject}
                            style={{ backgroundColor: theme.background_2 }}
                            iconBackground={theme.background}
                            leftIconName="format-quote"
                            details={t('resolution_subject')}
                            disabled
                        />
                    )}

                    {article.resolutionText && (
                        <FileItem
                            name={article.resolutionText}
                            style={{ backgroundColor: theme.background_2 }}
                            iconBackground={theme.background}
                            leftIconName="done"
                            details={t('resolution_text')}
                            disabled
                        />
                    )}

                </View>

            </View>
        </View>
    );
}
