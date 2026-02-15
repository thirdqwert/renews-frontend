"use client"

import { useEffect, useState } from "react"
import { getCategories, getNews } from "../../utils/utilis"
import { ICategory, INews } from "@/app/utils/types"
import NewsCard from "@/app/components/NewsCard"
import { useInView } from "react-intersection-observer"

export default function NewsFilter() {
    const [categories, setCategories] = useState<ICategory[] | null>([])
    const [news, setNews] = useState<INews[]>([])
    const [pageCount, setPageCount] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const { ref, inView } = useInView({})

    useEffect(() => {
        const getData = async () => {
            try {
                const [categories_data, news_data] = await Promise.all([
                    getCategories(),
                    getNews()
                ])
                setCategories(categories_data)
                setPageCount(pageCount + 1)
                setNews(news_data.results)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        if (inView && hasMore) {
            const getData = async () => {
                try {
                    const data = await getNews(pageCount)
                    setPageCount(pageCount + 1)
                    setNews([...news, ...data.results])
                } catch (error) {
                    setHasMore(false)
                    console.log(error)
                }
            }

            getData()
        }
    }, [inView, news])

    return (
        <div>
            <ul>
                {categories && categories.map(category => (
                    <li key={category.id}>{category.title}</li>
                ))}
                <div>Применить</div>
            </ul>
            <div>
                <div className="grid grid-cols-3">
                    {news && news.map(item => (
                        <NewsCard key={item.id} news={item} />
                    ))}
                </div>
                {hasMore && <div ref={ref}>Загрузка</div>}
            </div>
        </div>
    )
}