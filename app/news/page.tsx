
import { getCategories, getNews } from "../utils/utilis"
import { ICategory, INewsObject } from "../utils/types"
import CardList from "../components/CardList"
import InfiniteScroll from "../components/InfiniteScroll"
import CatSub from "../components/CatSub"
import Header from "../components/Header"
import Footer from "../components/Footer"

export const revalidate = 180

export default async function News() {
    const news: INewsObject = await getNews(1, '', '', { next: { revalidate: 180 } }, undefined)
    const categories: ICategory[] = await getCategories({ next: { revalidate: 180 } })

    if (news.results.length == 0) return <div>Нету данных</div>


    return (
        <>
            <Header />
            <main className="py-[30px]">
                <div className="container">
                    <CatSub categories={categories} params={{}} />
                    <CardList list={news.results} />
                    <div className="pb-[30px] md:pb-[50px]" />
                    <InfiniteScroll params={{}} />
                </div>
            </main>
            <Footer />
        </>
    )
}