"use client"

import { useInView } from "react-intersection-observer"
import { getNews } from "../utils/utilis"
import { INews } from "../utils/types"
import { useEffect, useState } from "react"
import Card from "../components/Card"
import CardList from "../components/CardList"


export default function News() {
    const [news, setNews] = useState<INews[]>([])
    const [pageCount, setPageCount] = useState(2)
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const { ref, inView } = useInView({})

    useEffect(() => {
        if (inView && hasMore) {
            const getData = async () => {
                try {
                    setIsLoading(true)

                    const data = await getNews(pageCount)

                    if (data.statusText == "Not Found") {
                        setHasMore(false)
                        setIsLoading(false)
                        return
                    }

                    setPageCount(pageCount + 1)
                    setNews([...news, ...data.results])
                    setIsLoading(false)
                } catch (error) {
                    console.log(error)
                }
            }

            getData()
        }
    }, [inView, news])

    return (
        <>
            <div className="container">
                <CardList list={news} />
                {isLoading && <div className="bg-red-400">Загрузка</div>}
                {hasMore && <div ref={ref} />}
            </div>
        </>
    )
}