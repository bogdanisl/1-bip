import { Article } from "@/types/Article";

export async function fetchArticles(offset:number,limit:number): Promise<Article[]> {
    try{    
        const response = await fetch(`https://www.bip.alpanet.pl/api/v1/article/list`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                offset: offset,
                limit: limit,
            }),
        });
        //console.log('fetchArticles response: ',response)
        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`);
        }
    
        const articles = await response.json();
        //console.log('fetchArticles articles: ',articles[0].text?.[1])
        return articles.data as Article[];
  
    }
    catch(err){
        console.error('Failed to fetch articles: ', err);
        return [];
    }
}

export async function fetchArticle(id:number): Promise<Article | null> {
    try{    
        const response = await fetch(`https://www.bip.alpanet.pl/api/v1/article/read/${id}`, {
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
    catch(err){
        console.error('Failed to fetch articles: ', err);
        return null;
    }
}