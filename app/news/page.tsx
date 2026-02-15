import NewsCard from "../components/NewsCard"
import { INewsObject } from "../utils/types"
import { getNews } from "../utils/utilis"
import NewsInfiniteScroll from "./components/NewsInfiniteScroll"

export const revalidate = 180

export default async function News() {
    const news: INewsObject | null = await getNews()

    return (
        <div className="grid grid-cols-3">
            {news && news.results.map(item => (
                <NewsCard key={item.id} news={item} />
            ))}
            <NewsInfiniteScroll />
        </div>
    )
}