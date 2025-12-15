import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Platform, UIManager } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Br } from '@/components/Br';
import { Article } from '@/types/Article';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [expanded, setExpanded] = useState(isOpen);
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
        }).start(() => {
            if (!isOpen) {
                setExpanded(false);
            } else {
                setExpanded(true);
            }
        });
    }, [isOpen]);

    useEffect(()=>{
        const setLanguage = async ()=>{
            const saved = await AsyncStorage.getItem('app_language')
            console.log(saved);
            setLang(saved || 'en');
        }
        setLanguage();
        
    },[])

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

            <Br />

            <Animated.View
                style={{
                    height: animatedHeight.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, contentHeight],
                    }),
                    overflow: 'hidden',
                }}
            >
                <View style={{ marginTop: 10 }}>

                    {article.author && (
                        <View style={{ marginBottom: 12 }}>
                            <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>
                                {t('author').toUpperCase()}
                            </Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: theme.background_2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 10,
                                    }}
                                >
                                    <MaterialIcons name="edit" size={24} color={theme.tint} />
                                </View>

                                <Text style={{ color: theme.text, fontSize: 15 }}>{article.author}</Text>
                            </View>
                        </View>
                    )}

                    {article.createdAt && (
                        <View style={{ marginBottom: 12 }}>
                            <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>
                                {t('created_at').toUpperCase()}
                            </Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: theme.background_2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 10,
                                    }}
                                >
                                    <MaterialIcons name="calendar-month" size={24} color={theme.tint} />
                                </View>

                                <Text style={{ fontSize: 14, color: theme.text }}>
                                    {new Date(article.createdAt.date!).toLocaleDateString(lang, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </Text>
                            </View>
                        </View>
                    )}

                    {article.acceptedBy && (
                        <>
                            <View style={{ marginBottom: 12 }}>
                                <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>
                                    {t('acceptedBy').toUpperCase()}
                                </Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            backgroundColor: theme.background_2,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: 10,
                                        }}
                                    >
                                        <MaterialIcons name="person-add-alt-1" size={24} color={theme.tint} />
                                    </View>

                                    <Text style={{ color: theme.text, fontSize: 15 }}>
                                        {article.acceptedBy}
                                        {article.createdAt && (
                                            <Text style={{ fontSize: 13, color: theme.subText }}>
                                                {'\n'}
                                                {new Date(article.createdAt.date!).toLocaleDateString(lang, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </Text>
                                        )}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: 12 }}>
                                <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>
                                    {t('approvedBy').toUpperCase()}
                                </Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            backgroundColor: theme.background_2,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: 10,
                                        }}
                                    >
                                        <MaterialIcons name="verified-user" size={24} color={theme.tint} />
                                    </View>

                                    <Text style={{ color: theme.text, fontSize: 15 }}>
                                        {article.approvedBy || article.acceptedBy}
                                        {article.publishedAt && (
                                            <Text style={{ fontSize: 13, color: theme.subText }}>
                                                {'\n'}
                                                {new Date(article.publishedAt.date!).toLocaleDateString(lang, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </Text>
                                        )}
                                    </Text>
                                </View>
                            </View>
                        </>
                    )}
                </View>
            </Animated.View>
        </View>
    );
}
