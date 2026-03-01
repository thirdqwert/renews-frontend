"use client"
import { IReelsObject } from "@/app/utils/types"
import { getDateString } from "@/app/utils/utilis"
import { getCookie } from "cookies-next"
import Image from "next/image"
import { SubmitEvent, useEffect, useState } from "react"
import Pagination from "../../components/Paginations"

export default function Reels() {
    const [products, setProducts] = useState<IReelsObject | null>(null)
    const [error, setError] = useState(false)
    const [page, setPage] = useState(1)
    const [title, setTitle] = useState("")
    const [file, setFile] = useState<File | null>()
    const [content, setContent] = useState("")
    const [deleteWindow, setDeleteWindow] = useState<number | null>(null)
    const token = getCookie("access_token")
    
    const getProducts = async (pageCount: number) => {
        try {
            const params = new URLSearchParams()
            if (pageCount) params.append("page", String(pageCount))
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/reels?${params.toString()}`)
            
            if (!res.ok) {
                setProducts(null)
                setError(true)
                return
            }

            const data = await res.json()

            setProducts(data)
        } catch (error) {
            throw error
        }
    }

    const deleteProduct = async (id: number) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API}/reels/${id}/`,
                {
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            getProducts(page)
        } catch (error) {
            throw error
        }
    }

    const createProduct = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file || !title || !content) return
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("image", file)
            formData.append("link", content)

            await fetch(`${process.env.NEXT_PUBLIC_API}/reels/`,
                {
                    method: "post",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: formData
                }
            )

            setTitle("")
            setContent("")
            setFile(null)
            getProducts(1)
        } catch (error) {
            throw error
        }
    }

    const handleCopy = async (link: string) => {
        await navigator.clipboard.writeText(link);
    };
    
    useEffect(() => {
        const getData = async () => {
            await getProducts(page)
        }
        getData()
    }, [page])
    
    return (
        <div className="py-[50px]">
            <div className="container">
                <h2>Reels</h2>
                <form onSubmit={(e) => createProduct(e)} className="my-[10px] p-[30px] w-full max-w-[600px] border border-gray-400 flex flex-col gap-[20px]">
                    <h2>Добавить Reel</h2>
                    <input
                        type="text"
                        value={title}
                        placeholder="Название Reel"
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px]"
                    />
                    <input
                        type="text"
                        value={content}
                        placeholder="Ссылка на Reel"
                        onChange={(e) => setContent(e.target.value)}
                        className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px]"
                    />
                    <label htmlFor="imageInput" className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px] cursor-pointer">Выбрать изображения</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0])}
                        id="imageInput"
                        className="hidden"
                    />
                    <button className="border border-gray-400 p-[10px] cursor-pointer">Создать</button>
                </form>
                <div className="w-full flex flex-col gap-[20px] py-[50px]">
                    {error && <div>Данные не найдены</div>}
                    {products && products.results?.map(product => (
                        <div key={product.id} className="w-full flex flex-col gap-[20px] border border-gray-400 p-[20px]">
                            <div className="flex flex-row justify-between items-end gap-[10px] ">
                                <div className="flex flex-col gap-[5px]">
                                    <Image unoptimized width={0} height={0} src={product.image} alt="" className="w-[100px] h-[50px] object-cover mb-[10px]" />
                                    <h3>Название: {product.title}</h3>
                                    <h3>Дата создания: {getDateString(product.created_at)}</h3>
                                </div>
                                <button onClick={() => handleCopy(product.content)} className="border border-gray-400 px-[10px] py-[5px] cursor-pointer">Скоприровать ссылку</button>
                            </div>
                            <button onClick={() => setDeleteWindow(product.id)} className="w-max py-[5px] px-[20px] border border-gray-400 cursor-pointer">Удалить</button>
                            {deleteWindow == product.id && <div className="flex flex-row gap-[20px]">
                                <span className="border border-gray-400 p-[10px] cursor-pointer" onClick={() => deleteProduct(product.id)}>Да</span>
                                <span className="border border-gray-400 p-[10px] cursor-pointer" onClick={() => setDeleteWindow(null)}>Нет</span>
                            </div>}
                        </div>
                    ))}
                    <Pagination page={page} setPage={setPage}/>
                </div>
            </div>
        </div>
    )
}