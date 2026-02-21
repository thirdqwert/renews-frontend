import { getNews } from "../utils/utilis"
import CardList from "../components/CardList"
import InfiniteScroll from "../components/InfiniteScroll"
import { INewsObject } from "../utils/types"

export const revalidate = 180

export default async function News() {
    const news: INewsObject = await getNews(1, '', '', { next: { revalidate: 180 } })

    return (
        <>
            <main className="pt-[50px]">
                <div className="container">
                    <CardList list={news.results} />
                    <InfiniteScroll params={{}} />
                </div>
            </main>
        </>
    )
}