"use client"

import { useEffect, useState } from "react"
import { getCategories, getNews } from "../../utils/utilis"
import { ICategory, INewsObject } from "@/app/utils/types"
import NewsCard from "@/app/components/NewsCard"

export default function NewsFilter() {
    const [categories, setCategories] = useState<ICategory[] | null>([])
    const [news, setNews] = useState<INewsObject | null>(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const [categories_data, news_data] = await Promise.all([
                    getCategories(),
                    getNews()
                ])
                setCategories(categories_data)
                setNews(news_data)
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
                {news ? (
                    news.results.map(item => (
                        <NewsCard key={item.id} news={item} />
                    ))
                ) : <div>Loading</div>}
            </div>
        </div>
    )
}