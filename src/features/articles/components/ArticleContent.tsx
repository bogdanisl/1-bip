import { Br } from '@/src/components/Br';
import { Skeleton } from '@/src/components/skeleton';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import {
  defaultTableStylesSpecs,
  HTMLTable,
  tableModel,
  useHtmlTableProps,
} from '@native-html/table-plugin';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import type { CustomRendererProps } from 'react-native-render-html';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';

interface Props {
  content: string;
  theme: any;
}

const TABLE_TAG_PATTERN = '(?:table|thead|tbody|tfoot|tr|td|th|colgroup|col)';

function normalizeBackendHtml(html: string, baseUrl?: string) {
  let normalized = html;

  if (baseUrl) {
    normalized = normalized.replace(/<img\s+src="\/(?!\/)/gi, `<img src="${baseUrl}/`);
  }

  // Remove deleted diff wrappers around structural table tags.
  const removeDeletedStructuralTags = new RegExp(
    `<span[^>]*text-decoration\\s*:\\s*line-through[^>]*>\\s*(<\\/?${TABLE_TAG_PATTERN}\\b[^>]*>)\\s*<\\/span>`,
    'gi'
  );

  // Unwrap inserted/neutral spans around structural table tags.
  const unwrapStructuralTags = new RegExp(
    `<span[^>]*>\\s*(<\\/?${TABLE_TAG_PATTERN}\\b[^>]*>)\\s*<\\/span>`,
    'gi'
  );

  // Broken editor diffs sometimes nest duplicated table/tr wrappers one after another.
  const dedupeTableStarts = /<table\b[^>]*>\s*(<table\b[^>]*>)/gi;
  const dedupeRowStarts = /<tr\b[^>]*>\s*(<tr\b[^>]*>)/gi;

  let previous = '';

  while (previous !== normalized) {
    previous = normalized;
    normalized = normalized
      .replace(removeDeletedStructuralTags, '')
      .replace(unwrapStructuralTags, '$1')
      .replace(dedupeTableStarts, '$1')
      .replace(dedupeRowStarts, '$1');
  }

  return normalized;
}

function estimateTableHeight(stats: { numOfRows: number; numOfColumns: number; numOfChars: number }) {
  const { numOfRows, numOfColumns, numOfChars } = stats;
  const rowHeight = numOfColumns >= 5 ? 48 : 42;
  const textExpansion = Math.min(160, Math.ceil(numOfChars / 45) * 8);
  const minHeight = numOfColumns >= 5 ? 180 : 140;

  return Math.max(minHeight, numOfRows * rowHeight + textExpansion + 24);
}

function ArticleTableRenderer(props: CustomRendererProps<any> & { theme: any }) {
  const { theme } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const baseTableProps = useHtmlTableProps(props);
  const skeletonHeight = estimateTableHeight(baseTableProps);
  const previousOnLoadEnd = baseTableProps.webViewProps?.onLoadEnd;

  const tableProps = {
    ...baseTableProps,
    tableStyleSpecs: {
      ...defaultTableStylesSpecs,
      outerBorderColor: theme.border,
      tdBorderColor: theme.border,
      thBorderColor: theme.border,
      trOddBackground: theme.background_2,
      trEvenBackground: theme.background,
      trOddColor: theme.text,
      trEvenColor: theme.text,
      thOddBackground: theme.background_2,
      thEvenBackground: theme.background_2,
      thOddColor: theme.text,
      thEvenColor: theme.text,
      linkColor: theme.tint,
      fontFamily: 'sans-serif',
    },
    webViewProps: {
      ...baseTableProps.webViewProps,
      onLoadEnd: (event: any) => {
        setIsLoaded(true);
        previousOnLoadEnd?.(event);
      },
    },
  };

  return (
    <View style={[styles.tableWrapper, { backgroundColor: theme.background }]}>
      <HTMLTable
        {...tableProps}
        WebView={WebView}
        style={[tableProps.style, styles.tableContainer]}
      />

      {!isLoaded ? (
        <View pointerEvents="none" style={[styles.tableSkeletonOverlay, { backgroundColor: theme.background }]}>
          <Skeleton width="100%" height={skeletonHeight} borderRadius={0} theme={theme} />
        </View>
      ) : null}
    </View>
  );
}

export function ArticleContent({ content, theme }: Props) {
  const { width } = useWindowDimensions();
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);

  const normalizedHtml = useMemo(
    () => normalizeBackendHtml(content, selectedBip?.url),
    [content, selectedBip?.url]
  );

  const renderers = useMemo(
    () => ({
      table: (props: any) => <ArticleTableRenderer {...props} theme={theme} />,
    }),
    [theme]
  );

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: theme.border,
        paddingBottom: 12,
        marginBottom: 16,
      }}
    >
      <Br />
      <RenderHTML
        WebView={WebView}
        contentWidth={width}
        source={{ html: normalizedHtml }}
        renderers={renderers}
        customHTMLElementModels={{
          table: tableModel,
        }}
        renderersProps={{
          img: {
            enableExperimentalPercentWidth: true,
          },
          table: {},
        }}
        tagsStyles={{
          p: { color: theme.text, fontSize: 16, lineHeight: 22 },
          span: { color: theme.text, fontSize: 16 },
          strong: { fontWeight: '700', color: theme.text },
          em: { fontStyle: 'italic', color: theme.text },
          a: { color: theme.tint },
          li: { color: theme.text, fontSize: 16, lineHeight: 22 },
          img: { marginVertical: 10 },
          table: {
            marginVertical: 12,
            backgroundColor: theme.background,
          },
          th: {
            color: theme.text,
            fontWeight: '700',
            padding: 8,
            borderColor: theme.border,
            backgroundColor: theme.background,
          },
          td: {
            color: theme.text,
            padding: 8,
            borderColor: theme.border,
          },
        }}
        enableExperimentalMarginCollapsing
        defaultTextProps={{
          selectable: true,
        }}
        baseStyle={{ color: theme.text }}
        enableCSSInlineProcessing
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tableWrapper: {
    position: 'relative',
    marginVertical: 12,
    overflow: 'hidden',
  },
  tableContainer: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  tableSkeletonOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
