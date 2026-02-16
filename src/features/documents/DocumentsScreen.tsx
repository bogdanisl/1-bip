
// app/webview/[slug].tsx
import { Colors } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View, useColorScheme, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { formatFileSize } from '@/src/features/articles/components/AttachmentList';
import { Document } from '@/types/Article';
import { attachmentExamples } from '@/constants/data_example';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { getFileIcon } from '@/utils/attachement';
import { Br } from '@/src/components/Br';
import { useSelectedBipStore } from '@/hooks/use-selected-bip';
import { showMessage } from 'react-native-flash-message';
import { storage } from '@/utils/storage/asyncStorage';


export default function DocumentsScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { t } = useTranslation();
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [attachmnets, setAttachments] = useState<Document[]>([])

  const params = useLocalSearchParams<{ q?: string }>();

  const searchText = params?.q?.toLowerCase() || "";

  const filteredAttachments = attachmnets.filter((attachement) => {
    if (!searchText) {
      return true;
    }
    return attachement.fileName.toLowerCase().includes(searchText);
  });

  useEffect(() => {

    const loadFiles = async () => {
      if (selectedBip == null) {
        setAttachments(attachmentExamples);
        return;
      }
      if (selectedBip.url == '') {
        setAttachments([]);
        return;
      }
      const saved_files = await storage.get<Document[]>(`${selectedBip.id}/downloads`);
      if (!saved_files) {
        setAttachments([]);
        return;
      }
      setAttachments(saved_files);
      return;
    }

    loadFiles();

  }, [slug]);

  const renderAttachment = ({ item }: { item: Document }) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          if (selectedBip == null) {
            showMessage({
              message: t('preview_not_available_example_bip'),
              icon: 'auto',
              type: "warning",
            });
            return;
          }
          router.push(`/(tabs)/home/documents/${item.fileName}.${item.extension}`) //${item.fileName}.${item.extension}
        }}
        style={{
          flexDirection: 'row',

          alignItems: 'center',
          borderRadius: 12,
          paddingRight: 80,
          paddingVertical: 12,
          padding: 16,
          backgroundColor: theme.background_2,
          shadowColor: Colors.light.text,
          shadowOpacity: 0.1,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,

        }}
      >
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
          <MaterialIcons name={getFileIcon(item.extension)} size={24} color={theme.tint} />
        </View>
        <Text style={{ color: theme.text, fontSize: 16 }}>
          {item.fileName}.{item.extension}{'\n'}
          <Text style={{ fontSize: 14, color: theme.subText }}>
            {`${t('size')}:\u00A0${formatFileSize(item.fileSize)}, ${t('format')}:\u00A0${item.extension}, ${t('language')}:\u00A0${item.language}`}
          </Text>
        </Text>
      </TouchableOpacity>
    )
  }

  return (

    <Animated.FlatList
      ListHeaderComponent={() =>
        <>
          <Text style={{ color: theme.text, fontSize: 15, fontWeight: '800', marginBottom: 5 }}>
            {('Dokumenty').toUpperCase()}
          </Text>
          <Br />
        </>
      }
      style={{ padding: 20 }}
      data={filteredAttachments}
      itemLayoutAnimation={LinearTransition}
      ListEmptyComponent={
        <>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, alignContent: 'center' }}>
            {selectedBip?.url == '' ?
              (
                <Text style={{ color: theme.text, textAlign: 'center', fontSize: 18 }}>{t('unsupported_bip', { name: selectedBip.name })}</Text>
              ) : (
                <Text style={{ color: theme.text, textAlign: 'center' }}>{t('empty_list_downloads')}</Text>
              )
            }
          </View>
        </>
      }
      renderItem={renderAttachment}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      contentInsetAdjustmentBehavior={'automatic'}
    />

  );
}