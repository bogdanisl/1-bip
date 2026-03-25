import { apiRequest } from '@/src/services/api/client';
import { ChangeRegisterEntry, ChangeRegisterVersionDetail } from '@/src/types/ChangeRegister';
import { useCallback, useEffect, useState } from 'react';
import { useSelectedBipStore } from './use-selected-bip';

const DEFAULT_LIMIT = 20;

const sortByDateDesc = (items: ChangeRegisterEntry[]) =>
  [...items].sort((left, right) => {
    const leftDate = new Date(left.date.replace(' ', 'T')).getTime();
    const rightDate = new Date(right.date.replace(' ', 'T')).getTime();

    return rightDate - leftDate;
  });

export function useChangeRegisterList(limit = DEFAULT_LIMIT) {
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);

  const [items, setItems] = useState<ChangeRegisterEntry[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (nextOffset = 0, append = false) => {
    if (!selectedBip) {
      //setItems([]);
      setHasMore(false);
      setError(null);
      setIsLoading(false);
      setIsRefreshing(false);
      setIsLoadingMore(false);
      return;
    }

    try {
      setError(null);
      const isInitialLoad = !append && nextOffset === 0 && items.length === 0 && !isRefreshing;

      if (append) {
        setIsLoadingMore(true);
      } else if (isInitialLoad) {
        setIsLoading(true);
      }

      const data = await apiRequest<ChangeRegisterEntry[]>('/api/v1/change-register/list', {
        method: 'POST',
        body: {
          limit,
          offset: nextOffset,
        },
      });

      const sorted = sortByDateDesc(data);

      setItems((previous) => append ? sortByDateDesc([...previous, ...sorted]) : sorted);
      setOffset(nextOffset);
      setHasMore(data.length === limit);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to fetch change register');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      setIsLoadingMore(false);
    }
  }, [isRefreshing, items.length, limit, selectedBip]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setHasMore(true);
    await load(0, false);
  }, [load]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || isRefreshing || isLoading || !hasMore) {
      return;
    }

    await load(offset + limit, true);
  }, [hasMore, isLoading, isLoadingMore, isRefreshing, limit, load, offset]);

  useEffect(() => {
    load(0, false);
  }, [load]);

  return {
    items,
    isLoading,
    isRefreshing,
    isLoadingMore,
    hasMore,
    error,
    refresh,
    loadMore,
  };
}

interface UseArticleChangeHistoryOptions {
  articleId: number;
  enabled?: boolean;
}

export function useArticleChangeHistory({
  articleId,
  enabled = false,
}: UseArticleChangeHistoryOptions) {
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);

  const [items, setItems] = useState<ChangeRegisterEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const load = useCallback(async () => {
    if (!enabled || !articleId || Number.isNaN(articleId)) {
      return;
    }

    if (!selectedBip) {
      setItems([]);
      setError(null);
      setHasLoaded(true);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data = await apiRequest<ChangeRegisterEntry[]>(`/api/v1/change-register/article/${articleId}`, {
        method: 'POST',
      });
      setItems(sortByDateDesc(data));
      setHasLoaded(true);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to fetch article history');
      setHasLoaded(true);
    } finally {
      setIsLoading(false);
    }
  }, [articleId, enabled, selectedBip]);

  useEffect(() => {
    if (!enabled || hasLoaded) {
      return;
    }

    load();
  }, [enabled, hasLoaded, load]);

  return {
    items,
    isLoading,
    error,
    hasLoaded,
    reload: load,
  };
}

export function useChangeRegisterVersion(versionId: number) {
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);

  const [version, setVersion] = useState<ChangeRegisterVersionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (!versionId || Number.isNaN(versionId)) {
      setVersion(null);
      setError('Invalid version id');
      setIsLoading(false);
      return;
    }

    if (!selectedBip) {
      setVersion(null);
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiRequest<ChangeRegisterVersionDetail>(`/api/v1/change-register/version/${versionId}`, {
        method: 'POST',
      });

      setVersion(data);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to fetch change register version');
      setVersion(null);
    } finally {
      setIsLoading(false);
    }
  }, [selectedBip, versionId]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    version,
    isLoading,
    error,
    reload: load,
  };
}
