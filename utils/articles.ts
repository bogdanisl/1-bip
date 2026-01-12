import { ArtilcesExample } from "@/constants/data_example";
import { useSelectedBipStore } from "@/hooks/use-selected-bip";
import { Article, Document } from "@/types/Article";

export const ARTICLE_LIMIT = 40;


export async function fetchArticles(offset: number, limit: number, url: string): Promise<Article[]> {

    try {
        const response = await fetch(`${url}/api/v1/article/list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                offset: offset,
                limit: limit,
            }),
        });
        //console.log(`${url}/api/v1/article/list`)
        //console.log('fetchArticles response: ',response)
        if (!response.ok) {
            throw new Error(`Failed to fetch articles: ${response.status}`);
        }

        const articles = await response.json();
        //console.log('fetchArticles articles: ',articles[0].text?.[1])
        return articles.data as Article[];

    }
    catch (err) {
        console.error('Failed to fetch articles: ', err);
        return [];
    }
}

export async function fetchArticle(id: number, url: string): Promise<Article | null> {
    console.log({url})
    if (url == 'example') {
        const founded = ArtilcesExample.find(article => article.id == id);
        if (founded) {
            return founded;
        } else {
            return null;
        }
    }
    try {
        const response = await fetch(`${url}/api/v1/article/read/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        //console.log('fetchArticles response: ',response)
        if (!response.ok) {
            throw new Error(`Failed to fetch articles: ${response.status}`);
        }
        const articles = await response.json();
        //console.log('fetchArticles articles: ',articles[0].text?.[1])
        //console.log(articles.data)
        return articles.data as Article;

    }
    catch (err) {
        console.error('Failed to fetch articles: ', err);
        return null;
    }
}

export async function fetchDownloads(url: string): Promise<Document[] | null> {
    if (url == '') {
        return null;
    }
    try {
        const response = await fetch(`${url}/api/v1/downloads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        //console.log('fetchArticles response: ',response)
        if (!response.ok) {
            console.warn(`Failed to fetch downloads: ${response.status}`);
            return null;
        }
        const downloads = await response.json();
        //console.log('fetchArticles articles: ',articles[0].text?.[1])
        //console.log(articles.data)
        return downloads.data;
    }
    catch (err) {
        console.error('Failed to fetch articles: ', err);
        return null;
    }
}