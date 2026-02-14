import ArticleCard from "../components/ArticleCard"
import { IArticlesObject } from "../utils/types"
import { getArticles } from "../utils/utilis"
import ArticlesInfiniteScroll from "./components/ArticlesInfiniteScroll"

export const revalidate = 180

export default async function Artiles() {
    const news: IArticlesObject | null = await getArticles()

    return (
        <div>
            {news && news.results.map(item => (
                <ArticleCard key={item.id} article={item} />
            ))}
            <ArticlesInfiniteScroll />
        </div>
    )
}