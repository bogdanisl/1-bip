import { useCallback, useEffect, useState } from 'react';
import { Article } from '@/src/types/Article';
import { useSelectedBipStore } from './use-selected-bip';
import { ArticlesListExample } from '@/src/constants/data_example';
import { apiRequest } from '../services/api/client';

const DEFAULT_LIMIT = 10;

interface UseArticlesOptions {
  categoryId?: string;
  initialLimit?: number; // for top N articles
}

export function useArticles({ initialLimit = DEFAULT_LIMIT }: UseArticlesOptions = {}) {
  const selectedBip = useSelectedBipStore(s => s.selectedBip);

  const [articles, setArticles] = useState<Article[]>([]);
  const [offset, setOffset] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (nextOffset = 0, append = false, limit = DEFAULT_LIMIT) => {

    if (!selectedBip) {
      setArticles(ArticlesListExample.slice(0, limit));
      setHasMore(false);
      setIsLoading(false);
      return;
    }

    try {
      append ? setIsLoadingMore(true) : setIsLoading(true);
      const data = await apiRequest<Article[]>(`/api/v1/article/list`, {
        body: {
          nextOffset,
          limit,
        }
      });
      setArticles(prev => append ? [...prev, ...data] : data);
      setOffset(nextOffset);
      setHasMore(data.length === limit);
    } catch (err: any) {
      setError(err?.message ?? 'Unknown error');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
      setIsRefreshing(false);
    }
  }, [selectedBip]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setHasMore(true);
    await load(0, false, initialLimit);
  }, [load, initialLimit]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || isRefreshing || !hasMore) return;
    load(offset + DEFAULT_LIMIT, true);
  }, [offset, hasMore, isLoadingMore, isRefreshing, load]);

  useEffect(() => {
    load(0, false, initialLimit);
  }, [selectedBip, initialLimit, load]);

  return {
    articles,
    isLoading,
    isRefreshing,
    isLoadingMore,
    hasMore,
    error,
    refresh,
    loadMore,
  };
}