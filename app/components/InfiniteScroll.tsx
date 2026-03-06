"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getNews } from "../utils/utilis";
import { INews } from "../utils/types";
import CardList from "./CardList";
import Loader from "./Loader";

interface IProps {
    params: {
        category?: string;
        subcategory?: string;
    };
}
export default function InfiniteScroll({ params }: IProps) {
    const { category, subcategory } = params;

    const [list, setList] = useState<INews[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(2);
    const { ref, inView } = useInView({});

    useEffect(() => {
        const getData = async () => {
            if (inView && hasMore) {
                try {
                    setIsLoading(true);
                    const data = await getNews(
                        page,
                        category,
                        subcategory,
                        undefined,
                        undefined,
                    );

                    if (data.statusText == "Not Found") {
                        setHasMore(false);
                        setIsLoading(false);
                        return;
                    }

                    setPage(page + 1);
                    setList([...list, ...data.results]);
                    setIsLoading(false);
                } catch (error) {
                    throw error;
                }
            }
        };
        getData();
    }, [inView, list]);

    return (
        <>
            {list && <CardList list={list} />}
            {
                <div
                    className={
                        "flex flex-row justify-center py-[30px] " +
                        (isLoading ? "" : "hidden")
                    }
                >
                    <Loader />
                </div>
            }
            {hasMore && <div ref={ref} />}
        </>
    );
}
