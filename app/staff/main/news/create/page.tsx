"use client";

import { ICategory } from "@/app/_utils/types";
import { getCategories } from "@/app/_utils/utilis";
import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";
import { SubmitEvent, useEffect, useState } from "react";

const TipTap = dynamic(() => import("../../../components/TipTap"), {
    ssr: false,
});

export default function CreateNews() {
    const [categories, setCategories] = useState<ICategory[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [shortTitle, setShortTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState<File | null>();
    const token = getCookie("access_token");

    const createProduct = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file || !title || !shortTitle || !file || !content || !desc || !selectedCategory || !selectedSubcategory)
            return;
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("short_title", shortTitle);
            formData.append("main_image", file);
            formData.append("preview", file);
            formData.append("content", content);
            formData.append("desc", desc);
            formData.append("category_choose", selectedCategory.toString());
            formData.append("subcategory_choose", selectedSubcategory.toString());

            await fetch(`${process.env.NEXT_PUBLIC_API}/news/`, {
                method: "POST",
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
            setFile(null);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        const getData = async () => {
            const data = await getCategories(undefined);
            setCategories(data);
        };
        getData();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="py-[20px]">
                    <form
                        onSubmit={(e) => createProduct(e)}
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
                        <TipTap setContent={setContent} content="" />
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
                                        background: category.id == selectedCategory ? "#29547F" : "",
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
                                                    background: subcategory.id == selectedSubcategory ? "#29547F" : "",
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
