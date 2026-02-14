import NewsCard from "./components/NewsCard"
import { INews, IToken } from "./utils/types"
import { getAdmin, getNewsAdmin } from "./utils/utilis"

export const revalidate = 180

export default async function Home() {

    const access = await getAdmin()
    const news: INews[] | null = await getNewsAdmin(access)
    const news_politics = news && news.filter((item) => item.category.includes("погода"))

    return (
        <div>
            <h2>News</h2>
            {news && news.map(item => (
                <NewsCard key={item.id} news={item} />
            ))}
            <h2>Politcs</h2>
            {news_politics && news_politics.map(item => (
                <NewsCard key={item.id} news={item} />
            ))}
        </div>
    );
}
