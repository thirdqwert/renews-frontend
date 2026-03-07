"use client";

import { ICategory, INews } from "@/app/utils/types";
import { getCategories, getNewsDetail } from "@/app/utils/utilis";
import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";
import React, { SubmitEvent, useEffect, useState } from "react";

const TipTap = dynamic(() => import("../../../../components/TipTap"), {
    ssr: false,
});

export default function EditNews({ params }: any) {
    // @ts-expect-error херня с некстом
    const { id } = React.use(params);

    const [categories, setCategories] = useState<ICategory[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [shortTitle, setShortTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [content, setContent] = useState("");
    const [smallFile, setSmallFile] = useState<File | null>();
    const [file, setFile] = useState<File | null>();
    const token = getCookie("access_token");

    const editProduct = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (title) formData.append("title", title);
            if (shortTitle) formData.append("short_title", shortTitle);
            if (file) formData.append("main_image", file);
            if (smallFile) formData.append("preview", smallFile);
            if (content) formData.append("content", content);
            if (selectedCategory) formData.append("desc", desc);
            if (selectedCategory) formData.append("category_choose", selectedCategory.toString());
            if (selectedSubcategory) formData.append("subcategory_choose", selectedSubcategory.toString());
            console.log(formData.values());

            await fetch(`${process.env.NEXT_PUBLIC_API}/news/${id}/`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            setTitle("");
            setShortTitle("");
            setFile(null);
            setContent("");
            setDesc("");
            setSelectedCategory(null);
            setSelectedSubcategory(null);
            setSmallFile(null);
            setFile(null);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        const getData = async () => {
            const [news_data, categories_data] = await Promise.all([
                getNewsDetail(id, undefined),
                getCategories(undefined),
            ]);
            console.log(news_data.content);

            setCategories(categories_data);
            setTitle(news_data.title);
            setShortTitle(news_data.short_title);
            setDesc(news_data.desc);
            setContent(news_data.content);
        };
        getData();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="py-[20px]">
                    <form
                        onSubmit={(e) => editProduct(e)}
                        className="w-full flex flex-col gap-[20px] bg-white p-[20px] text-[#29547F]"
                    >
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
                        <TipTap setContent={setContent} content={content} />
                        {smallFile && <span>Первью введено</span>}
                        <label
                            htmlFor="previewInput"
                            className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px] cursor-pointer"
                        >
                            Выбрать Первью
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setSmallFile(e.target.files?.[0])}
                            id="previewInput"
                            className="hidden"
                        />
                        {file && <span>Главное изображение введено</span>}
                        <label
                            htmlFor="imageInput"
                            className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px] cursor-pointer"
                        >
                            Выбрать Главное изображение
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files?.[0])}
                            id="imageInput"
                            className="hidden"
                        />
                        <h3>Выбрать категорию</h3>
                        <div className="flex flex-row flex-wrap w-full gap-[10px]">
                            {categories?.map((category) => (
                                <div
                                    onClick={() => setSelectedCategory(category.id)}
                                    key={category.id}
                                    className="p-[10px] border border-gray-400 cursor-pointer"
                                    style={{
                                        background: category.id == selectedCategory ? "black" : "",
                                        color: category.id == selectedCategory ? "white" : "",
                                    }}
                                >
                                    {category.title}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-row flex-wrap w-full gap-[10px]">
                            {selectedCategory &&
                                categories?.map((category) => {
                                    if (selectedCategory == category.id)
                                        return category.subcategories.map((subcategory) => (
                                            <div
                                                onClick={() => setSelectedSubcategory(subcategory.id)}
                                                key={subcategory.id}
                                                className="p-[10px] border border-gray-400 cursor-pointer"
                                                style={{
                                                    background: subcategory.id == selectedSubcategory ? "black" : "",
                                                    color: subcategory.id == selectedSubcategory ? "white" : "",
                                                }}
                                            >
                                                {subcategory.title}
                                            </div>
                                        ));
                                })}
                        </div>
                        <button className="border border-gray-400 p-[10px] cursor-pointer">Создать</button>
                    </form>
                    <div className="py-[30px]">
                        {content && (
                            <div className="border tiptap bg-[#e9e8e8]" dangerouslySetInnerHTML={{ __html: content }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
