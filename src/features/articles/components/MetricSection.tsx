import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Platform, UIManager } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Br } from '@/src/components/Br';
import { Article } from '@/src/types/Article';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FileItem from '@/src/components/buttons/ItemButton';
import { getDeviceLanguage } from '@/i18n';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
    article: Article;
    isOpen: boolean;
    toggle: () => void;
    theme: any;
}

export function MatrykaSection({ article, isOpen, toggle, theme }: Props) {
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const arrowRotation = useRef(new Animated.Value(0)).current;
    const [lang, setLang] = useState('pl-PL');
    var he = require('he');
    const { t } = useTranslation()
    useEffect(() => {
        const toValue = isOpen ? 1 : 0;

        // Вращение стрелки
        Animated.timing(arrowRotation, {
            toValue,
            duration: 260,
            useNativeDriver: true,
        }).start();

        // Анимация высоты (без useNativeDriver)
        Animated.timing(animatedHeight, {
            toValue: isOpen ? 1 : 0,
            duration: 260,
            useNativeDriver: false,
        }).start();
    }, [isOpen]);

    useEffect(() => {
        const setLanguage = async () => {
            const saved = await AsyncStorage.getItem('app_language')
            //console.log(saved);
            setLang(saved || getDeviceLanguage());
        }
        setLanguage();

    }, [])

    const rotation = arrowRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    // Высота выдвигаемого блока фиксируется вручную (измеряется по вашему наполнению)
    const contentHeight = 350; // Можете отрегулировать

    return (
        <View>
            <TouchableOpacity
                onPress={toggle}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 12,
                }}
            >
                <Text style={{ color: theme.text, fontSize: 15, fontWeight: '800' }}>
                    {t('metric_section').toUpperCase()}
                </Text>

                <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                    <MaterialIcons name="expand-more" size={28} color={theme.subText} />
                </Animated.View>
            </TouchableOpacity>

            <Br theme={theme} />

            <Animated.View
                style={{
                    height: animatedHeight.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, contentHeight],
                    }),
                    overflow: 'hidden',
                }}
            >
                <View style={{ marginTop: 10, gap: 10 }}>

                    {article.author && (

                        <FileItem
                            name={he.decode(article.author)}
                            details={t('author')}
                            iconBackground={theme.background}
                            style={{ backgroundColor: theme.background_2 }}
                            leftIconName={'edit'}
                            disabled
                        />
                    )}

                    {article.createdAt && (
                        <FileItem
                            name={
                                new Date(article.createdAt.date!)
                                    .toLocaleDateString(lang,
                                        {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })
                            }
                            details={t('created_at')}
                            iconBackground={theme.background}
                            style={{ backgroundColor: theme.background_2 }}
                            leftIconName={'calendar-month'}
                            disabled
                        />

                    )}

                    {article.acceptedBy && (
                        <>
                            <FileItem
                                name={he.decode(article.acceptedBy)}
                                details={t('acceptedBy')}
                                iconBackground={theme.background}
                                style={{ backgroundColor: theme.background_2 }}
                                leftIconName={'person-add-alt-1'}
                                disabled
                            />
                            <FileItem
                                name={article.approvedBy ? he.decode(article.approvedBy) : he.decode(article.acceptedBy)}
                                details={t('approvedBy')}
                                iconBackground={theme.background}
                                style={{ backgroundColor: theme.background_2 }}
                                leftIconName={'verified-user'}
                                disabled
                            />
                        </>
                    )}
                </View>
            </Animated.View >
        </View >
    );
}
