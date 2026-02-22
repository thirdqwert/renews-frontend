import { getCategories, getNews } from "../utils/utilis"
import CardList from "../components/CardList"
import InfiniteScroll from "../components/InfiniteScroll"
import { ICategory, INewsObject } from "../utils/types"
import CatSub from "../components/CatSub"

export const revalidate = 180

export default async function News() {
    const news: INewsObject = await getNews(1, '', '', { next: { revalidate: 180 } })
    const categories: ICategory[] = await getCategories()

    if (news.results.length == 0) return <div>Нету данных</div>


    return (
        <>
            <main className="pt-[30px]">
                <div className="container">
                    <CatSub categories={categories} params={{}} />
                    <CardList list={news.results} />
                    <InfiniteScroll params={{}} />
                </div>
            </main>
        </>
    )
}