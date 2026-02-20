import CardList from "@/app/components/CardList"
import CatSubList from "@/app/components/CatSubList"
import InfiniteScroll from "@/app/components/InfiniteScroll"
import { INewsObject } from "@/app/utils/types"
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
    
    if (news.results.length == 0) return <div>Нету данных</div>
    
    return (
        <>
            <CatSubList params={{ categoryBy: category }} />
            <div className="container">
                <CardList list={news.results} />
                <InfiniteScroll params={{ category: category }} />
            </div>
        </>
    )
}