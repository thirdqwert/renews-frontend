"use client"

import { useEffect, useState } from "react"
import { getCategories, getNews, updateData } from "../../utils/utilis"
import { ICategory, INews } from "@/app/utils/types"
import NewsCard from "@/app/components/NewsCard"
import InfiniteScroll from "react-infinite-scroll-component"

export default function NewsFilter() {
    const [categories, setCategories] = useState<ICategory[] | null>([])
    const [news, setNews] = useState<INews[]>([])
    const [pageCount, setPageCount] = useState(2    )
    const [hasMore, setHasMore] = useState(true)

    const updateNews = async () => {
        updateData(getNews, pageCount, news, setNews, setPageCount, setHasMore)
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const [categories_data, news_data] = await Promise.all([
                    getCategories(),
                    getNews()
                ])
                setCategories(categories_data)
                setNews(news_data.results)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    return (
        <div>
            <ul>
                {categories && categories.map(category => (
                    <li key={category.id}>{category.title}</li>
                ))}
                <div>Применить</div>
            </ul>
            <div>
                <InfiniteScroll
                    dataLength={news.length}
                    hasMore={hasMore}
                    next={updateNews}
                    loader={<div>Загрузка</div>}
                >
                    {news && news.map(item => (
                        <NewsCard key={item.id} news={item} />
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    )
}