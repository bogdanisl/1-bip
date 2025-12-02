// app/pdf-viewer.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Text,
  Alert,
} from 'react-native';
import { Stack } from 'expo-router/stack';
import * as Sharing from 'expo-sharing';
import { File, Paths } from 'expo-file-system';
import { WebView } from 'react-native-webview';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { useColorScheme } from '@/hooks/use-color-scheme.web';
import { Colors } from '@/constants/theme';
import { useTranslation } from 'react-i18next';

const SUPPORTED_PREVIEW_EXTENSIONS = [
  'pdf',
  'doc', 'docx',
  'xls', 'xlsx',
  'txt',
  'png', 'jpg', 'jpeg', 'webp',
  'webm',
];

const PdfViewerPage = () => {
  const [isSharingLoading, setIsSharingLoading] = useState(false);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useTranslation();
  const themeColors = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
  const { file_uri } = useLocalSearchParams<{ file_uri: string }>();

  const fullUrl = `https://www.bip.alpanet.pl/dokumenty/${file_uri}`;
  const fileName = (file_uri?.split('/').pop() || 'file').split('?')[0];
  const extension = fileName.split('.').pop()?.toLowerCase() || '';

  const isPreviewSupported = SUPPORTED_PREVIEW_EXTENSIONS.includes(extension);

  // Загружаем размер файла для неподдерживаемых типов
  // useEffect(() => {
  //   if (!isPreviewSupported && file_uri) {
  //     fetch(fullUrl, { method: 'HEAD' })
  //       .then(res => {
  //         const size = res.headers.get('content-length');
  //         if (size) {
  //           const bytes = parseInt(size, 10);
  //           const mb = (bytes / (1024 * 1024)).toFixed(2);
  //           setFileSize(`${mb} MB`);
  //         } else {
  //           setFileSize('—');
  //         }
  //       })
  //       .catch(() => setFileSize('—'));
  //   }
  // }, [file_uri, isPreviewSupported]);

  // === Твой шэринг без изменений ===
  const handleShareAndSave = async () => {
    if (!file_uri) return;
    setIsSharingLoading(true);
    const remoteUrl = `https://www.bip.alpanet.pl/dokumenty/${file_uri}`;
    const fileName = (file_uri.split('/').pop() || 'document.pdf').split('?')[0];
    const localUri = new File(Paths.cache, fileName);

    if (localUri.exists) {
      try { localUri.delete(); } catch (err) { console.error(err); }
    }

    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        await Sharing.shareAsync(remoteUrl, { dialogTitle: fileName });
        return;
      }
      const { uri } = await File.downloadFileAsync(remoteUrl, localUri, { idempotent: true });
      await Sharing.shareAsync(uri, {
        dialogTitle: fileName,
        UTI: 'com.adobe.pdf',
        mimeType: 'application/pdf',
      });
    } catch (error: any) {
      console.error('Share/Save failed:', error);
      Alert.alert('Błąd', 'Nie udało się pobrać lub udostępnić pliku');
    } finally {
      setIsSharingLoading(false);
    }
  };

  useEffect(() => {
    if (!file_uri) router.back();
  }, [file_uri]);

  if (!file_uri) return null;

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: fileName,
          headerRight: () => (
            <TouchableOpacity
              disabled={isSharingLoading}
              style={{ height: 34, width: 34, justifyContent: 'center', alignItems: 'center' }}
              onPress={handleShareAndSave}
            >
              {isSharingLoading ? (
                <ActivityIndicator
                  size="small"
                  color={isLiquidGlassAvailable() ? themeColors.text : themeColors.tint}
                />
              ) : (
                <MaterialIcons
                  name={Platform.OS === 'ios' ? 'ios-share' : 'share'}
                  size={24}
                  color={isLiquidGlassAvailable() ? themeColors.text : themeColors.tint}
                  style={{ paddingLeft: 2, paddingBottom: 2 }}
                />
              )}
            </TouchableOpacity>
          ),
        }}
      />

      <SafeAreaView style={styles.container}>
        {isPreviewSupported ? (
          /* WebView — как и было */
          <WebView
            source={{ uri: fullUrl }}
            style={{ flex: 1 }}
            allowsFullscreenVideo
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            renderLoading={() => (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            )}
          />
        ) : (
          /* Экран для неподдерживаемых файлов */
          <View style={styles.unsupportedContainer}>
            <Entypo name="attachment" size={80} color={themeColors.text + '88'} />
            <Text style={[styles.fileName, { color: themeColors.text }]}>
              {fileName}
            </Text>
            <Text style={[styles.fileSize, { color: themeColors.text + 'CC' }]}>
              {fileSize ? `${fileSize}` : ''}
            </Text>
            <Text style={[styles.hint, { color: themeColors.text + '88' }]}>
              {t('preview_not_supported')}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unsupportedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fileName: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
  },
  fileSize: {
    fontSize: 16,
    marginTop: 8,
  },
  hint: {
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
});

export default PdfViewerPage;