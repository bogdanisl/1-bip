import { Category, CategoryStat, Section } from "@/src/types/Category";


export async function fetchSections(offset: number, limit: number, url: string): Promise<Section[]> {

    try {
        const response = await fetch(`${url}/api/v1/category/list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                offset: offset,
                limit: limit,
            }),
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch sections: ${response.status}`);
        }

        const articles = await response.json();
        return articles.data as Section[];

    }
    catch (err) {
        console.error('Failed to fetch articles: ', err);
        return [];
    }
}

export async function fetchCategory(offset: number, limit: number, url: string, categoryId: number): Promise<Category | null> {

    try {
        const response = await fetch(`${url}/api/v1/category/${categoryId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                offset: offset,
                limit: limit,
            }),
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch sections: ${response.status}`);
        }

        const articles = await response.json();
        return articles.data as Category;

    }
    catch (err) {
        console.error('Failed to fetch category: ', err);
        return null;
    }
}

export async function fetchMostReadCategories(offset: number, limit: number, url: string): Promise<CategoryStat[]> {

    try {
        const response = await fetch(`${url}/api/v1/category/popular`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                offset: offset,
                limit: limit,
            }),
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch categories: ${response.status}`);
        }

        const articles = await response.json();
        return articles.data as CategoryStat[];

    }
    catch (err) {
        console.error('Failed to fetch categories: ', err);
        return [];
    }
}