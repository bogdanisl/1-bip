
// app/webview/[slug].tsx
import { Colors } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, StatusBar, Text, View, useColorScheme, StyleSheet, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import { useTranslation } from 'react-i18next';
import ActivityIndicator from '@/components/ActivityIndicator';
import { AttachmentsList } from '@/components/articles/components/AttachmentList';
import { Attachment } from '@/types/Attachment';
import { attachmentExamples } from '@/constants/data_example';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { getFileIcon } from '@/utils/attachement';
import { Br } from '@/components/Br';

const { height } = Dimensions.get('window');

export default function ChangeRegister() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [attachmnets, setAttachments] = useState<Attachment[]>([])

  const params = useLocalSearchParams<{ q?: string }>();

  const searchText = params?.q?.toLowerCase() || "";

  const filteredAttachments = attachmnets.filter((attachement) => {
    if (!searchText) {
      return true;
    }
    return attachement.name.toLowerCase().includes(searchText);
  });

  useEffect(() => {
    setAttachments(attachmentExamples);
  }, [slug]);

  const renderAttachment = ({ item }: { item: Attachment }) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => router.push(`./downloads/${item.name}.${item.extension}`)}
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
          {item.name}.{item.extension}{'\n'}
          <Text style={{ fontSize: 14, color: theme.subText }}>
            {`${t('size')}:\u00A0${(item.size / 1000).toFixed(0)} Kb, ${t('format')}:\u00A0${item.extension}, ${t('language')}:\u00A0${item.language}`}
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
      renderItem={renderAttachment}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      contentInsetAdjustmentBehavior={'automatic'}
    />

  );
}