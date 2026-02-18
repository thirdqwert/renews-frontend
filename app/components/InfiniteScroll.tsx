"use client"

import { useEffect, useState } from "react"
import CardList from "./CardList"
import { useInView } from "react-intersection-observer"
import { getNews } from "../utils/utilis"
import { INews } from "../utils/types"

interface IProps {
    params: {
        category?: string,
        subcategory?: string
    }
}
export default function InfiniteScroll({ params }: IProps) {
    const { category, subcategory } = params

    const [list, setList] = useState<INews[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(2)
    const { ref, inView } = useInView({})

    useEffect(() => {
        const getData = async () => {
            if (inView && hasMore) {
                try {
                    const data = await getNews(page, category, subcategory, undefined )

                    if (data.statusText == "Not Found") {
                        setHasMore(false)
                        setIsLoading(false)
                        return
                    }

                    setPage(page + 1)
                    setList([...list, ...data.results])
                    setIsLoading(false)
                } catch (error) {
                    throw error
                }
            }
        }
        getData()
    }, [inView, list])

    return (
        <div>
            {list && <CardList list={list} />}
            {isLoading && <div className="bg-red-400">Загрузка</div>}
            {hasMore && <div ref={ref} />}
        </div>
    )
}