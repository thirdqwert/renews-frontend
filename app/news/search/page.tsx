"use client"

import CardList from "@/app/components/CardList";
import Header from "@/app/components/Header";
import { ErrorRes, INewsObject } from "@/app/utils/types";
import { getNews } from "@/app/utils/utilis";
import { SubmitEvent, useEffect, useState } from "react";

export default function Search() {
    const [news, setNews] = useState<INewsObject | null>(null)
    const [error, setError] = useState(false)
    const [searchBy, setSearchBy] = useState("")
    const [inputValue, setInputValue] = useState("")
    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearchBy(inputValue)
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const data: INewsObject | ErrorRes = await getNews(undefined, undefined, undefined, undefined, searchBy)
                console.log(data);

                if ("statusText" in data) {
                    setError(true)
                    return
                }

                setNews(data)
            } catch (error) {
                throw error
            }
        }
        getData()
    }, [searchBy])

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
                        {
                            news && news.results.length > 0 ? <CardList list={news.results} /> : <div>Данные не найдены</div>
                        }
                    </div>
                </div>
            </main>
        </>
    )
}