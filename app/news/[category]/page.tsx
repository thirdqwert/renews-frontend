import CardList from "@/app/components/CardList"
import CatSub from "@/app/components/CatSub"
import InfiniteScroll from "@/app/components/InfiniteScroll"
import { ICategory, INewsObject } from "@/app/utils/types"
import { getCategories, getNews } from "@/app/utils/utilis"

export const revalidate = 180

interface IProps {
    params: {
        category: string
    }
}

export default async function NewsCategory({ params }: IProps) {
    const { category } = await params
    const news: INewsObject = await getNews(1, category, '', { next: { revalidate: 180 } })
    const categories: ICategory[] = await getCategories()

    if (news.results.length == 0) return <div>Нету данных</div>

    return (
        <>
            <main className="pt-[30px]">
                <div className="container">
                    <CatSub categories={categories} params={{categoryBy: category}} />
                    <CardList list={news.results} />
                    <InfiniteScroll params={{ category: category }} />
                </div>
            </main>
        </>
    )
}