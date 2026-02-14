"use client"

import { INews, INewsObject } from "@/app/utils/types";
import { useState } from "react";
import { getNews, updateData } from "../../utils/utilis";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsCard from "@/app/components/NewsCard";



export default function NewsInfiniteScroll() {
    const [news, setNews] = useState<INews[]>([])
    const [pageCount, setPageCount] = useState(2)
    const [hasMore, setHasMore] = useState(true)

    const updateNews = () => {
        updateData(getNews, pageCount, news, setNews, setPageCount, setHasMore)
    }

    return (
        <div>
            {<InfiniteScroll
                dataLength={news.length}
                next={updateNews}
                hasMore={hasMore}
                loader={<div>Загрузка</div>}
            >

                {news && news.map(item => (
                    <NewsCard key={item.id} news={item} />
                ))}
            </InfiniteScroll>}


        </div>
    )
}