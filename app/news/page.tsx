
import { getNews } from "../utils/utilis"
import { INewsObject } from "../utils/types"
import CardList from "../components/CardList"
import InfiniteScroll from "../components/InfiniteScroll"
import Header from "../components/Header"
import Footer from "../components/Footer"

export const revalidate = 180

export default async function News() {
    const news: INewsObject = await getNews(1, '', '', { next: { revalidate: 180 } }, undefined)

    if (news.results.length == 0) return (
        <>
            <Header />
            <div>Данные не найдены</div>
        </>
    )

    return (
        <>
            <Header />
            <main className="py-[30px] min-h-screen">
                <div className="container">
                    <CardList list={news.results} />
                    <div className="pb-[30px] md:pb-[50px]" />
                    <InfiniteScroll params={{}} />
                </div>
            </main>
            <Footer />
        </>
    )
}