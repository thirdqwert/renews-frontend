import CardList from "@/app/components/CardList"
import Header from "@/app/components/Header"
import InfiniteScroll from "@/app/components/InfiniteScroll"
import { getNews } from "@/app/utils/utilis"

export const revalidate = 180

interface IProps {
    params: {
        category: string
    }
}

export default async function NewsCategory({ params }: IProps) {
    const { category } = await params
    const news = await getNews(1, category, '')

    return (
        <>
            <Header params={{ categoryBy: category  }} />
            <div className="container">
                <CardList list={news.results} />
                <InfiniteScroll params={{ category: category }} />
            </div>
        </>
    )
}