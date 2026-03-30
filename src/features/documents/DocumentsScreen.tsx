
// app/webview/[slug].tsx
import { Colors } from '@/src/constants/theme';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@/src/hooks/use-theme-colors';
import { formatFileSize } from '@/src/features/articles/components/AttachmentList';
import { Document } from '@/src/types/Article';
import { attachmentExamples } from '@/src/constants/data_example';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { getFileIcon } from '@/src/utils/attachement';
import { Br } from '@/src/components/Br';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import { showMessage } from 'react-native-flash-message';
import { storage } from '@/src/services/storage/asyncStorage';
import { EmptyState } from '@/src/components/EmptyState';
import { apiRequest } from '@/src/services/api/client';
import FileItem from '@/src/components/buttons/ItemButton';


export default function DocumentsScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { t } = useTranslation();
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);

  const { theme } = useAppTheme();
  const [attachmnets, setAttachments] = useState<Document[]>([])
  const [refreshing, setRefreshing] = useState(false);

  const params = useLocalSearchParams<{ q?: string }>();

  const searchText = params?.q?.toLowerCase() || "";

  const filteredAttachments = attachmnets.filter((attachement) => {
    if (!searchText) {
      return true;
    }
    return attachement.fileName.toLowerCase().includes(searchText);
  });

  const loadFiles = async () => {
    if (selectedBip == null) {
      setAttachments(attachmentExamples);
      return;
    }
    if (selectedBip.url == '') {
      setAttachments([]);
      return;
    }
    const saved_files = await storage.get<Document[]>(`${selectedBip.id}/documents`);
    if (!saved_files) {
      setAttachments([]);
      return;
    }
    setAttachments(saved_files);
    return;
  }

  useEffect(() => {
    loadFiles();
  }, [slug]);

  const handleRefresh = async () => {
    setRefreshing(true);
    const updateFiles = async () => {
      if (!selectedBip) return;
      const documents = await apiRequest<Document[]>('/api/v1/document/list', {}, selectedBip);
      if (documents) {
        storage.remove(`${selectedBip.id}/documents`);
        storage.set<Document[]>(`${selectedBip.id}/documents`, documents)
      }
    }
    await updateFiles();
    await loadFiles();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000)

  };

  const renderAttachment = ({ item }: { item: Document }) => {
    return (
      <FileItem
        key={item.id}
        name={`${item.fileName}.${item.extension}`}
        details={
          `${item.fileSize
            ? `${t('size')}: ${formatFileSize(item.fileSize)}` :
            ''}, ${item.extension && `${t('format')}: ${item.extension}, `}${item.language ?
              t('language') + ': ' + item.language :
              ''}`}
        iconBackground={theme.background}
        style={{ backgroundColor: theme.background_2 }}
        leftIconName={getFileIcon(item.extension)}
        rightIconName='chevron-right'
        onPress={() => router.push(`./documents/${item.fileName}.${item.extension}`)}
      />
    )
  }

  return (
    <>
      <Stack.Screen
        options={filteredAttachments.length > 0 ? {
          headerSearchBarOptions: {
            headerIconColor: theme.icon,
            tintColor: theme.tint,
            textColor: theme.text,
            hintTextColor: theme.tint,
            placeholder: t('find'),
            onChangeText: (event) => {
              router.setParams({
                q: event.nativeEvent.text,
              });
            },
          },
        } : {}}
      />
      <Animated.FlatList
        style={{ padding: 20 }}
        data={filteredAttachments}
        itemLayoutAnimation={LinearTransition}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.tint}
          />
        }
        ListEmptyComponent={
          <EmptyState
            iconName='download'
            onRefresh={handleRefresh}
            loading={refreshing}
            title={t('empty_list_downloads_title')}
            description={t('empty_list_downloads_desc')}
          />
        }
        renderItem={renderAttachment}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentInsetAdjustmentBehavior={'automatic'}
      />

    </>
  );
}
