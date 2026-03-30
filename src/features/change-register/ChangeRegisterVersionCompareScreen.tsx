import { EmptyState } from '@/src/components/EmptyState';
import { useArticle } from '@/src/hooks/use-article';
import { useChangeRegisterVersion } from '@/src/hooks/use-change-register';
import { useAppTheme } from '@/src/hooks/use-theme-colors';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { VersionColumn } from './components/VersionColumn';
import { diffHtml } from './utils/diff';




export default function ChangeRegisterVersionCompareScreen() {
  const { t, i18n } = useTranslation();
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  const { slug, versionId } = useLocalSearchParams<{
    slug: string;
    versionId: string;
  }>();

  const articleId = Number(slug);
  const parsedVersionId = Number(versionId);

  const {
    article,
    isLoading: isCurrentLoading,
    error: currentError,
    reload: reloadCurrent,
  } = useArticle({ id: articleId });

  const {
    version,
    isLoading: isVersionLoading,
    error: versionError,
    reload: reloadVersion,
  } = useChangeRegisterVersion(parsedVersionId);

  const isLoading = isVersionLoading || isCurrentLoading;
  const error = currentError || versionError;
  const isWide = width >= 980;
  const versionArticle = version?.article ?? null;

  // Diff is only needed for the current-version column
  const contentDiffHtml = useMemo(() => {
    if (!versionArticle?.content || !article?.content) return null;
    return diffHtml(versionArticle.content, article.content);
  }, [versionArticle?.content, article?.content]);

  const archiveBadge = version?.version
    ? `${t('change_register.version')} ${version.version}`
    : t('change_register.archive_badge');


  const date = version?.versionDate?.date ? new Date(version.versionDate.date) : new Date();
  const archiveDate = date.toLocaleDateString(i18n.language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
  const currentDate = new Date().toLocaleDateString(i18n.language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })


  return (
    <>
      <Stack.Screen options={{ title: t('change_register.compare_title'), headerTitleStyle: { color: theme.text } }} />



      <ScrollView
        style={{ backgroundColor: theme.background }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={[styles.loader]}>
            <ActivityIndicator size="large" color={theme.text} />
          </View>
        ) : null}
        {/* ── Error ── */}
        {!isLoading && error ? (
          <View style={styles.stateWrap}>
            <EmptyState
              iconName="error-outline"
              title={t('change_register.compare_error_title')}
              description={t('change_register.compare_error_description')}
              onRefresh={() => {
                reloadCurrent();
                reloadVersion();
              }}
            />
          </View>
        ) : null}

        {/* ── Content ── */}
        {!isLoading && !error && article && versionArticle ? (
          <View style={[styles.grid, isWide && styles.gridWide]}>
            {/* Archive version – top / left, no diff */}
            <VersionColumn
              article={versionArticle}
              badge={archiveBadge}
              dateLabel={archiveDate}
              variant="archive"
              theme={theme}
            />

            {isWide ? (
              <View style={[styles.dividerV, { backgroundColor: theme.border }]} />
            ) : (
              <View style={[styles.dividerH, { backgroundColor: theme.border }]} />
            )}

            {/* Current version – bottom / right, with diff */}
            <VersionColumn
              article={article}
              badge={t('change_register.current_badge')}
              dateLabel={currentDate}
              variant="current"
              theme={theme}
              compareWith={versionArticle}
              diffContent={contentDiffHtml ?? undefined}
            />
          </View>
        ) : null}

        <View style={{ height: 120 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  loader: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {},
  gridWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dividerH: {
    height: 8,
    opacity: 0.4,
  },
  dividerV: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
  },
  stateWrap: {
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
});
