// src/hooks/use-article.ts
import { useCallback, useEffect, useState } from 'react';
import { useSelectedBipStore } from './use-selected-bip';
import { apiRequest } from '@/src/services/api/client';
import { Article } from '@/src/types/Article';
import { ArtilcesExample } from '@/src/constants/data_example';



export function useArticle({ id }: { id: number }) {
    const selectedBip = useSelectedBipStore(s => s.selectedBip);

    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadArticle = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        if (!selectedBip) {
            setArticle(ArtilcesExample.find(a => a.id === id) || null);
            setIsLoading(false);
            return;
        }

        try {
            const data = await apiRequest<Article>(`/api/v1/article/read/${id}`, {
                method: 'POST',
            });

            setArticle(data);
        } catch (err: any) {
            setError(err?.message ?? 'Failed to fetch article');
            setArticle(null);
        } finally {
            setIsLoading(false);
        }
    }, [id, selectedBip]);

    
    useEffect(() => {
        loadArticle();
    }, [loadArticle]);

    return {
        article,
        isLoading,
        error,
        reload: loadArticle,
    };
}