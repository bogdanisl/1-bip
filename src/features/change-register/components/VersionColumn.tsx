import { Article } from '@/src/types/Article';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ArticleContent } from '../../articles/components/ArticleContent';
import { ArticleHeaderDiff } from './ArticleHeaderDiff';
import { SectionBadge } from './SectionBadge';

interface Props {
  article: Article;
  badge: string;
  dateLabel: string | null;
  variant: 'archive' | 'current';
  theme: any;
  /**
   * Pass the other version here to enable diff rendering on title, subtitle
   * and content. Only meaningful for the "current" column.
   */
  compareWith?: Article;
  /** Pre-computed HTML diff string for the content (optional). */
  diffContent?: string;
}

export function VersionColumn({
  article,
  badge,
  dateLabel,
  variant,
  theme,
  compareWith,
  diffContent,
}: Props) {
  return (
    <View style={styles.column}>
      <View style={[styles.labelRow, { borderBottomColor: theme.border }]}>
        <SectionBadge label={badge} variant={variant} theme={theme} />
        {dateLabel ? (
          <Text style={[styles.date, { color: theme.subText }]}>
            {dateLabel}
          </Text>
        ) : null}
      </View>

      <View style={styles.pad}>
        <ArticleHeaderDiff
          article={article}
          theme={theme}
          compareWith={compareWith}
        />
        <ArticleContent
          content={diffContent ?? article.content ?? ''}
          theme={theme}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  date: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    flexShrink: 1,
    marginLeft: 8,
    textAlign: 'right',
  },
  pad: {
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 16,
  },
});