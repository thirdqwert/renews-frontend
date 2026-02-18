import CardList from "@/app/components/CardList"
import Header from "@/app/components/Header"
import InfiniteScroll from "@/app/components/InfiniteScroll"
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
    const news = await getNews(1, category, subcategory, { next: { revalidate: 180 } })

    return (
        <>
            <Header params={{ categoryBy: category, subcategoryBy: subcategory }} />
            <div className="container">
                <CardList list={news.results} />
                <InfiniteScroll params={{ category: category, subcategory: subcategory }} />
            </div>
        </>
    )
}