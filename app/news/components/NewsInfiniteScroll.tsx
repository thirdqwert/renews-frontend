"use client"

import { INews } from "@/app/utils/types";
import { useEffect, useState } from "react";
import { getNews } from "../../utils/utilis";
import NewsCard from "@/app/components/NewsCard";
import { useInView } from "react-intersection-observer";

export default function NewsInfiniteScroll() {
    const [news, setNews] = useState<INews[]>([])
    const [pageCount, setPageCount] = useState(2)
    const [hasMore, setHasMore] = useState(true)
    const { ref, inView } = useInView({})

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
        <>
            {news && news.map(item => (
                <NewsCard key={item.id} news={item} />
            ))}
            {hasMore && <div ref={ref}>Загрузка</div>}
        </>
    )
}