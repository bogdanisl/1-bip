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

export function CaseDataSection({ article, theme }: Props) {
    const { t } = useTranslation();
    return (
        <View>
            <Br></Br>
            <View style={{ marginTop: 8 }}>
                <View style={{ marginVertical: 8 }}>
                    {article.resolutionType && (
                        <View style={{ marginBottom: 8 }}>
                            <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>{t('resolution_type').toUpperCase()}</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center', marginTop: 4 }}>
                                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                    <MaterialIcons name='format-quote' size={24} color={theme.tint} />
                                </View>
                                <Text style={{ color: theme.text, fontSize: 15 }}>{article.resolutionType.toUpperCase()}</Text>
                            </View>
                        </View>
                    )}

                    {article.resolutionPlace && (
                        <View style={{ marginBottom: 8 }}>
                            <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>{t('resolution_place').toUpperCase()}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                    <MaterialIcons name='location-on' size={24} color={theme.tint} />
                                </View>
                                <Text style={{ fontSize: 14, color: theme.text }}>
                                    {article.resolutionPlace.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    )}

                    {article.requiredDocuments && (
                        <>
                            <View style={{ marginBottom: 8 }}>
                                <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>{t('required_documents').toUpperCase()}</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center', marginTop: 4 }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                        <MaterialIcons name='file-open' size={24} color={theme.tint} />
                                    </View>
                                    <Text style={{ color: theme.text, fontSize: 15 }}>
                                        {article.requiredDocuments.toUpperCase()}
                                    </Text>
                                </View>
                            </View>
                        </>
                    )}

                    {article.pickupLocation && (
                        <View style={{ marginBottom: 8 }}>
                            <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>{t('pickup_location').toUpperCase()}</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center', marginTop: 4 }}>
                                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                    <MaterialIcons name='location-on' size={24} color={theme.tint} />
                                </View>
                                <Text style={{ color: theme.text, fontSize: 15 }}>
                                    {article.pickupLocation.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    )}


                    {article.fees && (
                        <View style={{ marginBottom: 8 }}>
                            <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>{t('fees').toUpperCase()}</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center', marginTop: 4 }}>
                                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                    <MaterialIcons name='monetization-on' size={24} color={theme.tint} />
                                </View>
                                <Text style={{ color: theme.text, fontSize: 15 }}>
                                    {article.fees.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                {article.appealProcedure && (
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>{t('appeal_procedure').toUpperCase()}</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center', marginTop: 4 }}>
                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <MaterialIcons name='edit' size={24} color={theme.tint} />
                            </View>
                            <Text style={{ color: theme.text, fontSize: 15 }}>
                                {article.appealProcedure.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                )}

                {article.comments && (
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>{t('comments').toUpperCase()}</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center', marginTop: 4 }}>
                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <MaterialIcons name='warning' size={24} color={theme.tint} />
                            </View>
                            <Text style={{ color: theme.text, fontSize: 15 }}>
                                {article.comments.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                )}
                {article.legalBasis && (
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>{t('legal_basis').toUpperCase()}</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center', marginTop: 4 }}>
                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <MaterialIcons name='gavel' size={24} color={theme.tint} />
                            </View>
                            <Text style={{ color: theme.text, fontSize: 15 }}>
                                {article.legalBasis.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                )}
                {article.resolutionContent && (
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>{t('resolution_content').toUpperCase()}</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center', marginTop: 4 }}>
                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <MaterialIcons name='message' size={24} color={theme.tint} />
                            </View>
                            <Text style={{ color: theme.text, fontSize: 15 }}>
                                {article.resolutionContent.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                )}
                {article.approvedBy && (
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>{t('acceptedBy').toUpperCase()}</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center', marginTop: 4 }}>
                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <MaterialIcons name='verified-user' size={24} color={theme.tint} />
                            </View>
                            <Text style={{ color: theme.text, fontSize: 15 }}>
                                {article.approvedBy.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                )}
                {article.acceptedBy && (
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: '700', fontSize: 12 }}>{t('approvedBy').toUpperCase()}</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center', marginTop: 4 }}>
                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <MaterialIcons name='verified-user' size={24} color={theme.tint} />
                            </View>
                            <Text style={{ color: theme.text, fontSize: 15 }}>
                                {article.acceptedBy.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                )}

            </View>
        </View>
    );
}
