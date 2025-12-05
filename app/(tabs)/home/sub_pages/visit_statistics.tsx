// app/webview/[slug].tsx
import { Colors } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, StatusBar, Text, View, useColorScheme, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useTranslation } from 'react-i18next';
import ActivityIndicator from '@/components/ActivityIndicator';

const { height } = Dimensions.get('window');

export default function ChangeRegister() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [loading, setLoading] = useState(true);

  // Map your routes to real BIP URLs (or use dynamic ones from API later)
  const urlMap: Record<string, string> = {
    'office-data': 'https://www.bip.alpanet.pl/dane-urzedu',
    'opening-hours': 'https://www.bip.alpanet.pl/godziny-pracy',
    'positions': 'https://www.bip.alpanet.pl/stanowiska',
    'bank-accounts': 'https://www.bip.alpanet.pl/konta-bankowe',
    'downloads': 'https://www.bip.alpanet.pl/do-pobrania',
    'editors': 'https://www.bip.alpanet.pl/redaktorzy-biuletynu',
    'statistics': 'https://www.bip.alpanet.pl/statystyka-odwiedzin',
    'employee-search': 'https://www.bip.alpanet.pl/wyszukaj-pracownika',
    'change-log': 'https://www.bip.alpanet.pl/rejestr-zmian',
    // Add more as needed
  };

  const url = urlMap[slug] || 'https://www.bip.alpanet.pl/statystyka_odwiedzin';

  useEffect(() => {
    // Optional: log for debugging
    console.log('Opening WebView:', slug, '→', url);
  }, [slug]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.text }}>
      {/* Optional: Show title in header (Expo Router handles it automatically from filename) */}
      {/* Or add a simple header if you want */}
      {/* <View style={{ height: 60, backgroundColor: theme.background_2, justifyContent: 'center', paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: theme.text }}>
          {t(`home.${slug.replace(/-/g, '_')}`) || 'Biuletyn'}
        </Text>
      </View> */}

<WebView
        userAgent='MobileApp'
        pullToRefreshEnabled={true}
        style={styles.webview}
        source={{ uri: url }}
        allowsInlineMediaPlayback={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={[StyleSheet.absoluteFillObject, styles.loader, { backgroundColor: theme.background }]}>
            <ActivityIndicator size={40} />
          </View>
        )}
        allowsBackForwardNavigationGestures={true}
        // iOS + older Android
        // Newer Android fallback

    
        onError={() => {
          Alert.alert(
            'Błąd ładowania',
            'Nie można załadować strony. Sprawdź połączenie.'
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: { justifyContent: 'center', alignItems: 'center' },
  webview: {
    flex: 1,
    paddingTop: 50, // safe-area / status-bar compensation
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8d7da',
  },
  errorText: {
    color: '#721c24',
    fontSize: 16,
    textAlign: 'center',
  },
});