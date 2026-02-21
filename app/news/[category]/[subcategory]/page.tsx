import CardList from "@/app/components/CardList"
import InfiniteScroll from "@/app/components/InfiniteScroll"
import { INewsObject } from "@/app/utils/types"
import { getNews } from "@/app/utils/utilis"

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

    if (news.results.length == 0) return <div>Нету данных</div>

    return (
        <>
            <main className="pt-[50px]">
                <div className="container">
                    <CardList list={news.results} />
                    <InfiniteScroll params={{ category: category, subcategory: subcategory }} />
                </div>
            </main>
        </>
    )
}