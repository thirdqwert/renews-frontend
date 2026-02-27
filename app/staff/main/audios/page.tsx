"use client"

import { IAudioObject } from "@/app/utils/types"
import { getDateString } from "@/app/utils/utilis"
import { getCookie } from "cookies-next"
import { SubmitEvent, useEffect, useState } from "react"

export default function Audios() {
    const [audios, setAudios] = useState<IAudioObject | null>(null)
    const [title, setTitle] = useState("")
    const [file, setFile] = useState<File | null>()
    const [error, setError] = useState(false)
    const [page, setPage] = useState(1)
    const [deleteWindow, setDeleteWindow] = useState<number | null>(null)
    const token = getCookie("access_token")

    const getAudios = async (pageCount: number) => {
        try {
            const params = new URLSearchParams()

            if (pageCount) params.append("page", String(pageCount))

            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/audios?${params.toString()}`,
                {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            if (!res.ok) {
                setAudios(null)
                setError(true)
                return
            }
            const data = await res.json()

            setAudios(data)
        } catch (error) {
            throw error
        }
    }


    const deleteAudios = async (id: number) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API}/audios/${id}/`,
                {
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            getAudios(page)
        } catch (error) {
            throw error
        }
    }

    const createAudio = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file || !title) return
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("audio", file)

            await fetch(`${process.env.NEXT_PUBLIC_API}/audios/`,
                {
                    method: "post",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: formData
                }
            )

            setTitle("")
            setFile(null)
            getAudios(1)
        } catch (error) {
            throw error
        }
    }

    const handleCopy = async (link: string) => {
        await navigator.clipboard.writeText(link);
    };

    useEffect(() => {
        const getData = async () => {
            await getAudios(page)
        }
        getData()
    }, [page])

    return (
        <div
            className="py-[50px]">
            <div className="container">
                <h2>Аудио</h2>
                <form onSubmit={(e) => createAudio(e)} className="my-[10px] p-[30px] w-full max-w-[600px] border border-gray-400 flex flex-col gap-[20px]">
                    <h2>Добавить Аудио</h2>
                    <input
                        type="text"
                        value={title}
                        placeholder="Название Аудио"
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px]"
                    />
                    <label htmlFor="audioInput" className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px]">Выбрать аудио</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0])}
                        id="audioInput"
                        className="hidden"
                    />
                    <button className="border border-gray-400 p-[10px]">Создать</button>
                </form>
                <div className="w-full flex flex-col gap-[20px] py-[50px]">
                    {error && <div>Данные не найдены</div>}
                    {audios && audios.results?.map(audio => (
                        <div key={audio.id} className="w-full flex flex-col gap-[20px] border border-gray-400 p-[20px]">
                            <div className="flex flex-row justify-between items-end gap-[10px] ">
                                <div className="flex flex-col gap-[5px]">
                                    <audio controls>
                                        <source src={audio.audio} type="audio/mpeg" />
                                        Ваш браузер не поддерживает аудио.
                                    </audio>
                                    <h3>Название: {audio.title}</h3>
                                    <h3>Дата создания: {getDateString(audio.created_at)}</h3>
                                </div>
                                <button onClick={() => handleCopy(audio.audio)} className="border border-gray-400 px-[10px] py-[5px] cursor-pointer">Скоприровать ссылку</button>
                            </div>
                            <button onClick={() => setDeleteWindow(audio.id)} className="w-max py-[5px] px-[20px] border border-gray-400 cursor-pointer">Удалить</button>
                            {deleteWindow == audio.id && <div className="flex flex-row gap-[20px]">
                                <span className="border border-gray-400 p-[10px] cursor-pointer" onClick={() => deleteAudios(audio.id)}>Да</span>
                                <span className="border border-gray-400 p-[10px] cursor-pointer" onClick={() => setDeleteWindow(null)}>Нет</span>
                            </div>}
                        </div>
                    ))}
                    <div className="flex flex-row gap-[10px]">
                        {page > 1 && <span onClick={() => setPage(page - 1)} className="block py-[5px] px-[10px] border border-gray-400 cursor-pointer">Назад</span>}
                        <span onClick={() => setPage(page + 1)} className="block py-[5px] px-[10px] border border-gray-400 cursor-pointer">Вперед</span>
                    </div>
                </div>
            </div>
        </div>
    )
}