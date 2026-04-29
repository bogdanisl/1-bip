import { EmptyState } from '@/src/components/EmptyState';
import { useChangeRegisterList } from '@/src/hooks/use-change-register';
import { useAppTheme } from '@/src/hooks/use-theme-colors';
import { ChangeRegisterEntry } from '@/src/types/ChangeRegister';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { ChangeRegisterCard } from './components/ChangeRegisterCard';

export default function ChangeRegisterScreen() {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  const {
    items,
    isLoading,
    isRefreshing,
    isLoadingMore,
    hasMore,
    error,
    refresh,
    loadMore,
  } = useChangeRegisterList();

  const maxWidth = width > 900 ? 860 : width - 32;

  return (
    <>
      <Animated.FlatList
        data={isLoading ? [] : items}
        keyExtractor={(item, index) => isLoading ? `skeleton-${index}` : `${(item as ChangeRegisterEntry).id}-${index}`}
        renderItem={({ item }) => (
          <View style={[styles.itemWrap, { width: maxWidth, alignSelf: 'center' }]}>
            <ChangeRegisterCard item={item} theme={theme} />
          </View>
        )}
        contentContainerStyle={[
          styles.content,
          {
            backgroundColor: theme.background,
          },
        ]}
        style={{ backgroundColor: theme.background }}
        refreshControl={(
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor={theme.tint}
            colors={[theme.tint]}
          />
        )}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              iconName={error ? 'error-outline' : 'history'}
              title={error ? t('change_register.error_title') : t('change_register.empty_title')}
              description={error ? t('change_register.error_description') : t('change_register.empty_description')}
              onRefresh={refresh}
            />
          ) : (
            <View style={{ flex: 1, minHeight: '60%', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={'large'} color={theme.text} />
            </View>
          )
        }
        ListFooterComponent={
          !isLoading && items.length > 0 ? (
            <View style={[styles.footer, { width: maxWidth, alignSelf: 'center' }]}>
              {isLoadingMore ? (
                <ActivityIndicator size={30} style={{ marginVertical: 6 }} />
              ) : null}

              {!hasMore &&
                <Text style={[styles.endText, { color: theme.subText }]}>
                  {t('change_register.end_of_list')}
                </Text>
              }
            </View>
          ) : null
        }
        onEndReached={loadMore}
        showsVerticalScrollIndicator
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
    paddingHorizontal: 16,
    gap: 14,
  },
  headerBox: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    marginBottom: 4,
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'Poppins-Bold',
  },
  headerDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
  },
  itemWrap: {
    marginTop: 10,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  loadMoreButton: {
    minWidth: 210,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  loadMoreText: {
    fontSize: 13,
    letterSpacing: 1,
    fontFamily: 'Poppins-Bold',
  },
  endText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});
