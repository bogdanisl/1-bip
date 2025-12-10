// app/components/AttachmentsList.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getFileIcon } from '@/utils/attachement';
import { useTranslation } from 'react-i18next';
import { Br } from '@/components/Br';
import { Document } from '@/types/Article';

interface Props {
    attachments: Document[];
    theme: any;
    slug: string;
}

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024; // 1 KB = 1024 B
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = bytes / Math.pow(k, i);
    return `${size.toFixed(2)} ${sizes[i]}`;
}


export function AttachmentsList({ attachments, theme, slug }: Props) {
    const { t } = useTranslation();

    return (
        <View>
            <Text style={{ color: theme.text, fontSize: 15, fontWeight: '800', marginBottom: 5 }}>
                {('Dokumenty').toUpperCase()}
            </Text>
            <Br />
            {attachments.map(att => (
                <TouchableOpacity
                    key={att.id}
                    onPress={() => router.push(`./${slug}/${att.fileName}.${att.extension}`)}
                    style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingRight: 80 }}
                >
                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
                        <MaterialIcons name={getFileIcon(att.extension)} size={24} color={theme.text} />
                    </View>
                    <Text style={{ color: theme.text, fontSize: 16 }}>
                        {att.fileName}.{att.extension}
                        {(att.fileSize) && (
                            <Text style={{ fontSize: 13, color: theme.subText }}>
                                {`\n${att.fileSize ? `Rozmiar: ${formatFileSize(att.fileSize)}` : ''}, ${att.language ? t('language') + ': ' + att.language : ''}`}
                            </Text>
                        )}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
