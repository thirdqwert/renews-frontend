import { getNews } from "../utils/utilis"
import CardList from "../components/CardList"
import InfiniteScroll from "../components/InfiniteScroll"
import Header from "../components/Header"

export const revalidate = 180

export default async function News() {
    const news = await getNews(1, '', '')

    return (
        <>
            <Header params={{}}/>
            <div className="container">
                <CardList list={news.results} />
                <InfiniteScroll params={{}} />
            </div>
        </>
    )
}