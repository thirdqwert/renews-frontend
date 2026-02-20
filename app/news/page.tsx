import { getNews } from "../utils/utilis"
import CardList from "../components/CardList"
import InfiniteScroll from "../components/InfiniteScroll"
import { INewsObject } from "../utils/types"
import CatSubList from "../components/CatSubList"

export const revalidate = 180

export default async function News() {
    const news: INewsObject = await getNews(1, '', '', { next: { revalidate: 180 } })

    return (
        <>
            <CatSubList params={{}} />
            <div className="container">
                <CardList list={news.results} />
                <InfiniteScroll params={{}} />
            </div>
        </>
    )
}