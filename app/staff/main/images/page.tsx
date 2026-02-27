"use client"

import { IImageObject } from "@/app/utils/types"
import { getDateString } from "@/app/utils/utilis"
import { getCookie } from "cookies-next"
import Image from "next/image"
import { SubmitEvent, useEffect, useState } from "react"

export default function Images() {
    const [images, setImages] = useState<IImageObject | null>(null)
    const [error, setError] = useState(false)
    const [title, setTitle] = useState("")
    const [file, setFile] = useState<File | null>()
    const [page, setPage] = useState(1)
    const [deleteWindow, setDeleteWindow] = useState<number | null>(null)
    const token = getCookie("access_token")

    const getImages = async (pageCount: number) => {
        try {
            const params = new URLSearchParams()

            if (pageCount) params.append("page", String(pageCount))

            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/images?${params.toString()}`,
                {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            if (!res.ok) {
                setImages(null)
                setError(true)
                return
            }
            const data = await res.json()

            setImages(data)
        } catch (error) {
            throw error
        }
    }


    const deleteImage = async (id: number) => {
        try {
            console.log(`${process.env.NEXT_PUBLIC_API}/images/${id}/`);

            await fetch(`${process.env.NEXT_PUBLIC_API}/images/${id}/`,
                {
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            getImages(page)
        } catch (error) {
            throw error
        }
    }

    const createImage = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file || !title) return
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("image", file)

            await fetch(`${process.env.NEXT_PUBLIC_API}/images/`,
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
            getImages(1)
        } catch (error) {
            throw error
        }
    }

    const handleCopy = async (link: string) => {
        await navigator.clipboard.writeText(link);
    };

    useEffect(() => {
        const getData = async () => {
            await getImages(page)
        }
        getData()
    }, [page])

    return (
        <div
            className="py-[50px]">
            <div className="container">
                <h2>Изображения</h2>
                <form onSubmit={(e) => createImage(e)} className="my-[10px] p-[30px] w-full max-w-[600px] border border-gray-400 flex flex-col gap-[20px]">
                    <h2>Добавить Изображения</h2>
                    <input
                        type="text"
                        value={title}
                        placeholder="Название Изображения"
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px]"
                    />
                    <label htmlFor="imageInput" className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px]">Выбрать изображения</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0])}
                        id="imageInput"
                        className="hidden"
                    />
                    <button className="border border-gray-400 p-[10px]">Создать</button>
                </form>
                <div className="w-full flex flex-col gap-[20px] py-[50px]">
                    {error && <div>Данные не найдены</div>}
                    {images && images.results?.map(image => (
                        <div key={image.id} className="w-full flex flex-col gap-[20px] border border-gray-400 p-[20px]">
                            <div className="flex flex-row justify-between items-end gap-[10px] ">
                                <div className="flex flex-col gap-[5px]">
                                    <Image unoptimized width={0} height={0} src={image.image} alt="" className="w-[100px] h-[50px] object-cover mb-[10px]" />
                                    <h3>Название: {image.title}</h3>
                                    <h3>Дата создания: {getDateString(image.created_at)}</h3>
                                </div>
                                <button onClick={() => handleCopy(image.image)} className="border border-gray-400 px-[10px] py-[5px] cursor-pointer">Скоприровать ссылку</button>
                            </div>
                            <button onClick={() => setDeleteWindow(image.id)} className="w-max py-[5px] px-[20px] border border-gray-400 cursor-pointer">Удалить</button>
                            {deleteWindow == image.id && <div className="flex flex-row gap-[20px]">
                                <span className="border border-gray-400 p-[10px] cursor-pointer" onClick={() => deleteImage(image.id)}>Да</span>
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