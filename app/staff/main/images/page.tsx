"use client";

import { IImageObject } from "@/app/utils/types";
import { getDateString } from "@/app/utils/utilis";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { SubmitEvent, useEffect, useState } from "react";
import Pagination from "../../components/Paginations";

export default function Images() {
    const [products, setProducts] = useState<IImageObject | null>(null);
    const [error, setError] = useState(false);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>();
    const [page, setPage] = useState(1);
    const [deleteWindow, setDeleteWindow] = useState<number | null>(null);
    const token = getCookie("access_token");

    const getProducts = async (pageCount: number) => {
        try {
            const params = new URLSearchParams();

            if (pageCount) params.append("page", String(pageCount));

            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/images?${params.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                setProducts(null);
                setError(true);
                return;
            }
            const data = await res.json();

            setProducts(data);
        } catch (error) {
            throw error;
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API}/images/${id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            getProducts(page);
        } catch (error) {
            throw error;
        }
    };

    const createProduct = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file || !title) return;
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("image", file);

            await fetch(`${process.env.NEXT_PUBLIC_API}/images/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            setTitle("");
            setFile(null);
            getProducts(1);
        } catch (error) {
            throw error;
        }
    };

    const handleCopy = async (link: string) => {
        await navigator.clipboard.writeText(link);
    };

    useEffect(() => {
        const getData = async () => {
            await getProducts(page);
        };
        getData();
    }, [page]);

    return (
        <div className="py-[50px]">
            <div className="container">
                <form
                    onSubmit={(e) => createProduct(e)}
                    className="my-[20px] p-[30px] w-full  text-[#29547F] bg-white flex flex-col gap-[20px]"
                >
                    <h2 className="text-center">Добавить Изображения</h2>
                    <input
                        type="text"
                        value={title}
                        placeholder="Название Изображения"
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px]"
                    />
                    <label
                        htmlFor="imageInput"
                        className="px-[20px] py-[10px] border border-gray-400 outline-none rounded-[2px] cursor-pointer"
                    >
                        Выбрать изображения
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0])}
                        id="imageInput"
                        className="hidden"
                    />
                    <button className="text-white bg-[#29547F] p-[10px] cursor-pointer">Создать</button>
                </form>
                <div className="w-full flex flex-col gap-[20px] py-[50px]">
                    {error && <div>Данные не найдены</div>}
                    {products &&
                        products.results?.map((product) => (
                            <div
                                key={product.id}
                                className="w-full flex flex-col gap-[20px] bg-white p-[20px] text-[#29547F]"
                            >
                                <div className="flex flex-row justify-between items-end gap-[10px] ">
                                    <div className="flex flex-col gap-[5px]">
                                        <Image
                                            unoptimized={process.env.NEXT_PUBLIC_DEV === "dev"}
                                            width={0}
                                            height={0}
                                            src={product.image}
                                            alt=""
                                            className="w-[100px] h-[50px] object-cover mb-[10px]"
                                        />
                                        <h3>Название: {product.title}</h3>
                                        <h3>Дата создания: {getDateString(product.created_at)}</h3>
                                    </div>
                                    <button
                                        onClick={() => handleCopy(product.image)}
                                        className="px-[10px] py-[5px] cursor-pointer text-white bg-[#29547F]"
                                    >
                                        Скоприровать ссылку
                                    </button>
                                </div>
                                <button
                                    onClick={() => setDeleteWindow(product.id)}
                                    className="w-max py-[5px] px-[20px] text-white bg-red-500 cursor-pointer"
                                >
                                    Удалить
                                </button>
                                {deleteWindow == product.id && (
                                    <div className="flex flex-row gap-[20px]">
                                        <span
                                            className="border border-gray-400 py-[5px] cursor-pointer w-[100px] text-center"
                                            onClick={() => deleteProduct(product.id)}
                                        >
                                            Да
                                        </span>
                                        <span
                                            className="border border-gray-400 py-[5px] cursor-pointer w-[100px] text-center"
                                            onClick={() => setDeleteWindow(null)}
                                        >
                                            Нет
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    <Pagination page={page} setPage={setPage} />
                </div>
            </div>
        </div>
    );
}
