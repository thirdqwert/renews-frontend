import CardList from "@/app/components/CardList"
import Header from "@/app/components/Header"
import InfiniteScroll from "@/app/components/InfiniteScroll"
import { INews, INewsObject } from "@/app/utils/types"
import { getNews } from "@/app/utils/utilis"

export const revalidate = 180

interface IProps {
    params: {
        category: string
    }
}

export default async function NewsCategory({ params }: IProps) {
    const { category } = await params
    const news: INewsObject = await getNews(1, category, '', { next: { revalidate: 180 } })

    return (
        <>
            <Header params={{ categoryBy: category }} />
            <div className="container">
                <CardList list={news.results} />
                <InfiniteScroll params={{ category: category }} />
            </div>
        </>
    )
}