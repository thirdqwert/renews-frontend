"use client"

import { IArticle } from "@/app/utils/types";
import { useState } from "react";
import { getArticles, updateData } from "../../utils/utilis";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "@/app/components/ArticleCard";


export default function ArticlesInfiniteScroll() {
    const [articles, setArticles] = useState<IArticle[]>([])
    const [pageCount, setPageCount] = useState(2)
    const [hasMore, setHasMore] = useState(true)

    const updateNews = () => {
        updateData(getArticles, pageCount, articles, setArticles, setPageCount, setHasMore)
    }

    return (
        <div>
            {<InfiniteScroll
                dataLength={articles.length}
                next={updateNews}
                hasMore={hasMore}
                loader={<div>Загрузка</div>}
            >

                {articles && articles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </InfiniteScroll>}


        </div>
    )
}