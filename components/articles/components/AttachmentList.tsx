// app/components/AttachmentsList.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getFileIcon } from '@/utils/attachement';
import { useTranslation } from 'react-i18next';
import { Attachment } from '@/types/Attachment';
import { Br } from '@/components/Br';

interface Props {
    attachments: Attachment[];
    theme: any;
    slug: string;
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
                    onPress={() => router.push(`/(tabs)/recent/${slug}/${att.name}.${att.extension}`)}
                    style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingRight: 80 }}
                >
                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background_2, justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
                        <MaterialIcons name={getFileIcon(att.extension)} size={24} color={theme.text} />
                    </View>
                    <Text style={{ color: theme.text }}>
                        {att.name}.{att.extension}{'\n'}
                        <Text style={{ fontSize: 13, color: theme.subText }}>
                            {`${t('size')}: ${att.size}, ${t('format')}: ${att.extension}, ${t('language')}: ${att.language}`}
                        </Text>
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
