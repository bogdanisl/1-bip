// app/pdf-viewer.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Text,
  Alert,
} from 'react-native';
import { Stack } from 'expo-router/stack';
import * as Sharing from 'expo-sharing';
import { File, Paths } from 'expo-file-system';
import { WebView } from 'react-native-webview';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { useAppTheme } from '@/src/hooks/use-theme-colors';
import { useTranslation } from 'react-i18next';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';

const SUPPORTED_PREVIEW_EXTENSIONS = [
  'pdf',
  'doc', 'docx',
  'xls', 'xlsx',
  'txt',
  'png', 'jpg', 'jpeg', 'webp',
  'webm',
];

interface Props {
  file?: {
    url: string,
    extension: string,
    name: string
  }
}

const DocumentViewerScreen = ({ file }: Props) => {
  const [isSharingLoading, setIsSharingLoading] = useState(false);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);
  const router = useRouter();
  const { t } = useTranslation();
  const { theme: themeColors } = useAppTheme();
  const { file_uri } = useLocalSearchParams<{ file_uri: string }>();

  const fullUrl = file ? file.url : `${selectedBip?.url}/dokumenty/${file_uri}`;
  const pdfUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fullUrl)}`;
  const fileName = file ? file.name : (file_uri?.split('/').pop() || 'file').split('?')[0];
  const extension = file ? file.extension : fileName.split('.').pop()?.toLowerCase() || '';

  const isPreviewSupported = SUPPORTED_PREVIEW_EXTENSIONS.includes(extension);

  const handleShareAndSave = async () => {
    if (!file_uri && !file) return;
    setIsSharingLoading(true);
    const remoteUrl = `${selectedBip?.url}/dokumenty/${file_uri}`;
    const fileName = file ? file.name : (file_uri.split('/').pop() || 'document.pdf').split('?')[0];
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
      localUri.delete()
      setIsSharingLoading(false);
    }
  };


  useEffect(() => {
    if (!file_uri && !file) router.back();
    //console.log(fullUrl)
  }, [file_uri]);

  if (!file_uri && !file) return null;


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
              <MaterialIcons
                name={Platform.OS === 'ios' ? 'ios-share' : 'share'}
                size={24}
                color={isSharingLoading ? themeColors.border : isLiquidGlassAvailable() ? themeColors.text : themeColors.tint}
                style={{ paddingLeft: 2, paddingBottom: 2 }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={[styles.container, { paddingTop: isLiquidGlassAvailable() ? 70 : 0 }]}>
        {isPreviewSupported ? (
          /* WebView — как и было */
          <WebView
            source={{ uri: Platform.OS == 'android' ? pdfUrl : fullUrl }}
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
      </View>
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

export default DocumentViewerScreen;
