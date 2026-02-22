import CardList from "@/app/components/CardList"
import CatSub from "@/app/components/CatSub"
import InfiniteScroll from "@/app/components/InfiniteScroll"
import { ICategory, INewsObject } from "@/app/utils/types"
import { getCategories, getNews } from "@/app/utils/utilis"

export const revalidate = 180

interface IProps {
    params: {
        category: string,
        subcategory: string
    }
}

export default async function NewsSubcategory({ params }: IProps) {
    const { category, subcategory } = await params
    const news: INewsObject = await getNews(1, category, subcategory, { next: { revalidate: 180 } })
    const categories: ICategory[] = await getCategories()

    if (news.results.length == 0) return <div>Нету данных</div>

    return (
        <>
            <main className="pt-[c]">
                <div className="container">
                    <CatSub categories={categories} params={{ categoryBy: category, subcategoryBy: subcategory }} />
                    <CardList list={news.results} />
                    <InfiniteScroll params={{ category: category, subcategory: subcategory }} />
                </div>
            </main>
        </>
    )
}