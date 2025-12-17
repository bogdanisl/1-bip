// app/components/MatrykaSection.tsx
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Br } from '@/components/Br';
import { Article } from '@/types/Article';
import { useTranslation } from 'react-i18next';
import FileItem from '@/components/buttons/ItemButton';

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
                <View style={{ marginVertical: 8, gap:10 }}>
                    {article.resolutionType && (
                        <FileItem
                            name={article.resolutionType.toUpperCase()}
                            style={{ backgroundColor: theme.background_2 }}
                            iconBackground={theme.background}
                            leftIconName={'format-quote'}
                            details={t('resolution_type')}
                            disabled
                        />
                    )}

                    {article.resolutionPlace && (
                        <FileItem
                            name={article.resolutionPlace.toUpperCase()}
                            style={{ backgroundColor: theme.background_2 }}
                            iconBackground={theme.background}
                            leftIconName="location-on"
                            details={t('resolution_place')}
                            disabled
                        />
                    )}

                    {article.requiredDocuments && (
                        <FileItem
                            name={article.requiredDocuments.toUpperCase()}
                            style={{ backgroundColor: theme.background_2 }}
                            iconBackground={theme.background}
                            leftIconName="file-open"
                            details={t('required_documents')}
                            disabled
                        />
                    )}

                    {article.pickupLocation && (
                        <FileItem
                            name={article.pickupLocation.toUpperCase()}
                            style={{ backgroundColor: theme.background_2 }}
                            iconBackground={theme.background}
                            leftIconName="location-on"
                            details={t('pickup_location')}
                            disabled
                        />
                    )}

                    {article.fees && (
                        <FileItem
                            name={article.fees.toUpperCase()}
                            style={{ backgroundColor: theme.background_2 }}
                            iconBackground={theme.background}
                            leftIconName="monetization-on"
                            details={t('fees')}
                            disabled
                        />
                    )}

                    {article.appealProcedure && (
                        <FileItem
                            name={article.appealProcedure.toUpperCase()}
                            style={{ backgroundColor: theme.background_2 }}
                            iconBackground={theme.background}
                            leftIconName="edit"
                            details={t('appeal_procedure')}
                            disabled
                        />
                    )}

                    {article.comments && (
                        <FileItem
                            name={article.comments.toUpperCase()}
                            style={{ backgroundColor: theme.background_2 }}
                            iconBackground={theme.background}
                            leftIconName="warning"
                            details={t('comments')}
                            disabled
                        />
                    )}

                    {article.legalBasis && (
                        <FileItem
                            name={article.legalBasis.toUpperCase()}
                            style={{ backgroundColor: theme.background_2 }}
                            iconBackground={theme.background}
                            leftIconName="gavel"
                            details={t('legal_basis')}
                            disabled
                        />
                    )}

                    {article.resolutionContent && (
                        <FileItem
                            name={article.resolutionContent.toUpperCase()}
                            style={{ backgroundColor: theme.background_2 }}
                            iconBackground={theme.background}
                            leftIconName="message"
                            details={t('resolution_content')}
                            disabled
                        />
                    )}

                    {article.approvedBy && (
                        <FileItem
                            name={article.approvedBy.toUpperCase()}
                            style={{ backgroundColor: theme.background_2 }}
                            iconBackground={theme.background}
                            leftIconName="verified-user"
                            details={t('acceptedBy')}
                            disabled
                        />
                    )}

                    {article.acceptedBy && (
                        <FileItem
                            name={article.acceptedBy.toUpperCase()}
                            style={{ backgroundColor: theme.background_2 }}
                            iconBackground={theme.background}
                            leftIconName="verified-user"
                            details={t('approvedBy')}
                            disabled
                        />
                    )}

                </View>
            </View>
        </View>
    );
}
