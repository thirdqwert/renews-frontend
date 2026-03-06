"use client";

import CardList from "@/app/components/CardList";
import Header from "@/app/components/Header";
import Loader from "@/app/components/Loader";
import { ErrorRes, INews, INewsObject } from "@/app/utils/types";
import { getNews } from "@/app/utils/utilis";
import { SubmitEvent, useEffect, useState } from "react";

export default function Search() {
    const [news, setNews] = useState<INews[]>([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [searchBy, setSearchBy] = useState("");
    const [pageCount, setPageCount] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchBy(inputValue);
    };

    useEffect(() => {
        const getData = async () => {
            if (hasMore) {
                try {
                    setIsLoading(true);
                    const data: INewsObject | ErrorRes = await getNews(
                        pageCount,
                        undefined,
                        undefined,
                        undefined,
                        searchBy,
                    );

                    if ("statusText" in data) {
                        setIsLoading(false);
                        setHasMore(false);
                        setError(true);
                        return;
                    }

                    setIsLoading(false);
                    setNews([...news, ...data.results]);
                } catch (error) {
                    throw error;
                }
            }
        };
        getData();
    }, [pageCount]);

    useEffect(() => {
        const getData = async () => {
            if (hasMore) {
                try {
                    setIsLoading(true);
                    const data: INewsObject | ErrorRes = await getNews(
                        1,
                        undefined,
                        undefined,
                        undefined,
                        searchBy,
                    );

                    if ("statusText" in data) {
                        setIsLoading(false);
                        setHasMore(false);
                        setError(true);
                        return;
                    }

                    setIsLoading(false);
                    setNews(data.results);
                } catch (error) {
                    throw error;
                }
            }
        };
        getData();
    }, [searchBy]);

    return (
        <>
            <Header />
            <main className="py-[30px]">
                <div className="container">
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="mb-[65px]"
                    >
                        <input
                            type="text"
                            placeholder="Поиск..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="outline-0 block w-full py-[10px] md:py-[20px] px-[10px] md:px-[20px] border-b border-[#495057] text-[16px] md:text-[20px] text-[#495057]"
                        />
                    </form>
                    <div>
                        {news && news.length > 0 && <CardList list={news} />}
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
                        {hasMore && !isLoading && news && news.length > 0 && (
                            <button
                                className="mx-auto my-[30px] w-max px-[10px] py-[10px] bg-[#343a40] text-white block w-full cursor-pointer rounded-[5px]"
                                onClick={() => setPageCount(pageCount + 1)}
                            >
                                Показать ёще
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
