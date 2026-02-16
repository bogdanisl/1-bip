import { useCallback, useEffect, useState } from 'react';
import { fetchArticles } from '@/src/services/api/articles';
import { Article } from '@/src/types/Article';
import { useSelectedBipStore } from './use-selected-bip';
import { ArticlesListExample } from '@/src/constants/data_example';
import { ARTICLE_LIMIT } from '@/src/services/api/articles';

export function useArticles(categoryId?: string) {
  const selectedBip = useSelectedBipStore((s) => s.selectedBip);

  const [articles, setArticles] = useState<Article[]>([]);
  const [offset, setOffset] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const load = useCallback(
    async (nextOffset = 0, append = false) => {
      if (!selectedBip) {
        setArticles(ArticlesListExample);
        setHasMore(false);
        return;
      }

      if (!selectedBip.url) {
        setArticles([]);
        setHasMore(false);
        return;
      }

      append ? setIsLoadingMore(true) : setIsLoading(true);

      const data = await fetchArticles(nextOffset, ARTICLE_LIMIT, selectedBip.url);

      setArticles((prev) =>
        append ? [...prev, ...data] : data
      );

      setOffset(nextOffset);
      setHasMore(data.length === ARTICLE_LIMIT);

      setIsLoading(false);
      setIsLoadingMore(false);
      setIsRefreshing(false);
    },
    [selectedBip]
  );

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setHasMore(true);
    await load(0, false);
  }, [load]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || isRefreshing || !hasMore) return;
    load(offset + ARTICLE_LIMIT, true);
  }, [offset, hasMore, isLoadingMore, isRefreshing, load]);

  useEffect(() => {
    load(0, false);
  }, [selectedBip]);

  return {
    articles,
    isLoading,
    isRefreshing,
    isLoadingMore,
    hasMore,
    refresh,
    loadMore,
  };
}
