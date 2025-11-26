// app/(tabs)/recent.tsx  (or wherever you place it)
import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '@/assets/styles/recent_index'; // reuse or create new – see below

type RecentItem = {
  id: string;
  resolution: string;        // "Uchwała: 4321a"
  date: string;              // "01.12.2000"
  caseNumber: string;        // "w sprawie 1"
  addedDate: string;         // "2025-11-06"
  addedBy: string;           // "JAN MIŚKIEWICZ"
};

const RecentPage = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Example data – matches your screenshot exactly
  const recentItems: RecentItem[] = [
    {
      id: '1',
      resolution: '4321a',
      date: '01.12.2000',
      caseNumber: '1',
      addedDate: '2025-11-06',
      addedBy: 'JAN MIŚKIEWICZ',
    },
    {
      id: '2',
      resolution: '2187b',
      date: '15.03.2021',
      caseNumber: '45',
      addedDate: '2025-11-05',
      addedBy: 'ANNA KOWALSKA',
    },
    {
      id: '3',
      resolution: '987c',
      date: '22.07.2019',
      caseNumber: '112',
      addedDate: '2025-11-04',
      addedBy: 'PIOTR NOWAK',
    },
    {
      id: '4',
      resolution: '5432d',
      date: '10.10.2023',
      caseNumber: '89',
      addedDate: '2025-11-03',
      addedBy: 'KATARZYNA ZIELIŃSKA',
    },
  ];

  const handleReadMore = (id: string) => {
    if (loadingId === id) return;
    setLoadingId(id);
    setTimeout(() => setLoadingId(null), 1200);
    // Here you would navigate to full document or open modal
    // router.push(`/document/${id}`);
  };

  const renderItem = ({ item }: { item: RecentItem }) => {
    const isLoading = loadingId === item.id;

    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.background_2,
            shadowColor: theme.text,
            marginBottom: 16,
          },
        ]}
      >
        {/* Header – matches your screenshot exactly */}
        <Text style={[styles.recentHeader, { color: theme.text }]}>
          Uchwała: <Text style={{ fontWeight: 'bold' }}>{item.resolution}</Text>, z dnia:{' '}
          <Text style={{ fontWeight: 'bold' }}>{item.date}</Text> w sprawie{' '}
          <Text style={{ fontWeight: 'bold' }}>{item.caseNumber}</Text>
        </Text>

        {/* Added info */}
        <View style={styles.infoRow}>
          <MaterialIcons name="person-add" size={20} color={theme.icon} />
          <Text style={[styles.infoText, { color: theme.text }]}>
            DODANO: {item.addedDate}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="edit" size={20} color={theme.icon} />
          <Text style={[styles.infoText, { color: theme.text }]}>
            WPROWADZIŁ: {item.addedBy}
          </Text>
        </View>

        {/* Progress bar (red line) */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: '#e74c3c' }]} />
        </View>

        {/* Read more button */}
        <TouchableOpacity
          onPress={() => handleReadMore(item.id)}
          style={[styles.readMoreButton, { backgroundColor: theme.tint }]}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={theme.background_2} />
          ) : (
            <Text style={[styles.readMoreText, { color: theme.background_2 }]}>
              CZYTAJ DALEJ
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const ListHeader = () => (
    <Text style={[styles.pageTitle, { color: theme.text }]}>
     
    </Text>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={recentItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RecentPage;