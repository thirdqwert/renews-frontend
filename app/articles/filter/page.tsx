"use client"

import { useEffect, useState } from "react"
import { getCategories, getArticles } from "../../utils/utilis"
import { IArticlesObject, ICategory } from "@/app/utils/types"
import ArticleCard from "@/app/components/ArticleCard"


export default function ArticlesFilter() {
    const [categories, setCategories] = useState<ICategory[] | null>([])
    const [articles, setArticles] = useState<IArticlesObject | null>(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const [categories_data, articles_data] = await Promise.all([
                    getCategories(),
                    getArticles()
                ])
                setCategories(categories_data)
                setArticles(articles_data)
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
                {articles ? (
                    articles.results.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))
                ) : <div>Loading</div>}
            </div>
        </div>
    )
}