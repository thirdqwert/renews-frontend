"use client"

import { ICategory } from "@/app/utils/types";
import { getCategories } from "@/app/utils/utilis";
import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { SubmitEvent, useEffect, useState } from "react";

const TipTap = dynamic(
    () => import("../../../components/TipTap"),
    { ssr: false }
);

export default function CreateNews() {
    const [categories, setCategories] = useState<ICategory[] | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
    const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null)
    const [title, setTitle] = useState("")
    const [shortTitle, setShortTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [content, setContent] = useState("")
    const [smallFile, setSmallFile] = useState<File | null>()
    const [file, setFile] = useState<File | null>()
    const token = getCookie("access_token")





    const createProduct = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file || !title || !shortTitle || !file || !smallFile || !content || !desc || !selectedCategory || !selectedSubcategory) return
        console.log(1);
        try {

            const formData = new FormData();
            formData.append("title", title);
            formData.append("short_title", shortTitle);
            formData.append("main_image", file)
            formData.append("preview", smallFile)
            formData.append("content", content)
            formData.append("desc", desc)
            formData.append("category_choose", selectedCategory.toString())
            formData.append("subcategory_choose", selectedSubcategory.toString())

            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/news/`,
                {
                    method: "post",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: formData
                }
            )
            console.log(await res.json());

            console.log(2);

            setTitle("")
            setShortTitle("")
            setFile(null)
            setContent("")
            setDesc("")
            setSelectedCategory(null)
            setSelectedSubcategory(null)
            setSmallFile(null)
            setFile(null)
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    useEffect(() => {
        const getData = async () => {
            const data = await getCategories(undefined)
            setCategories(data)
        }
        getData()
    }, [])


    return (
        <div>
            <div className="container">
                <h2>Новости</h2>
                <form onSubmit={(e) => createProduct(e)} className="my-[10px] p-[30px] w-full border border-gray-400 flex flex-col gap-[20px]">
                    <h2>Добавить Новость</h2>
                    <input
                        type="text"
                        value={title}
                        placeholder="Название Новости"
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px]"
                    />
                    <input
                        type="text"
                        value={shortTitle}
                        placeholder="Короткое название Новости"
                        onChange={(e) => setShortTitle(e.target.value)}
                        className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px]"
                    />
                    <textarea
                        value={desc}
                        placeholder="Описание"
                        onChange={(e) => setDesc(e.target.value)}
                        className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px] h-[400px]"
                    />
                    <TipTap setContent={setContent} />
                    {smallFile && <span>Первью введено</span>}
                    <label htmlFor="previewInput" className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px] cursor-pointer">Выбрать Первью</label>
                    <input
                        type="file"
                        onChange={(e) => setSmallFile(e.target.files?.[0])}
                        id="previewInput"
                        className="hidden"
                    />
                    {file && <span>Главное изображение введено</span>}
                    <label htmlFor="imageInput" className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px] cursor-pointer">Выбрать Главное изображение</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0])}
                        id="imageInput"
                        className="hidden"
                    />
                    <h3>Выбрать категорию</h3>
                    <div className="flex flex-row flex-wrap w-full gap-[10px]">
                        {categories?.map(category => (
                            <div onClick={() => setSelectedCategory(category.id)} key={category.id} className="p-[10px] border border-gray-400 cursor-pointer" style={{ background: category.id == selectedCategory ? "black" : "", color: category.id == selectedCategory ? "white" : "" }}>{category.title}</div>
                        ))}
                    </div>
                    <div className="flex flex-row flex-wrap w-full gap-[10px]">
                        {selectedCategory && categories?.map(category => {
                            if (selectedCategory == category.id)
                                return category.subcategories.map(subcategory => (
                                    <div
                                        onClick={() => setSelectedSubcategory(subcategory.id)}
                                        key={subcategory.id}
                                        className="p-[10px] border border-gray-400 cursor-pointer"
                                        style={{
                                            background: subcategory.id == selectedSubcategory ? "black" : "",
                                            color: subcategory.id == selectedSubcategory ? "white" : ""
                                        }}
                                    >
                                        {subcategory.title}
                                    </div>
                                ))
                        })}
                    </div>
                    <button className="border border-gray-400 p-[10px] cursor-pointer">Создать</button>
                </form>
                <div className="pt-[20px] tiptap" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
        
    )
}