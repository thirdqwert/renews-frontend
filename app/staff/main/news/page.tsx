"use client";

import Pagination from "@/app/staff/components/Paginations";
import { INewsObject } from "@/app/_utils/types";
import { getDateString } from "@/app/_utils/utilis";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function News() {
    const [products, setProducts] = useState<INewsObject | null>(null);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [deleteWindow, setDeleteWindow] = useState<number | null>(null);
    const token = getCookie("access_token");

    const getProducts = async (pageCount: number) => {
        try {
            const params = new URLSearchParams();

            if (pageCount) params.append("page", String(pageCount));

            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/news/?${params.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                setProducts(null);
                setError(true);
                return;
            }
            const data = await res.json();
            console.log(data);

            setProducts(data);
        } catch (error) {
            throw error;
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API}/news/${id}/`, {
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

    useEffect(() => {
        const getData = async () => {
            await getProducts(page);
        };
        getData();
    }, [page]);

    return (
        <div>
            <div className="container">
                <div className="py-[25]">
                    <Link
                        href={"news/create"}
                        className="block ml-auto w-max py-[10px] px-[10px] text-[#29547F] bg-white"
                    >
                        Добавить Новость
                    </Link>
                </div>
                <div className="w-full flex flex-col gap-[20px] py-[25px]">
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
                                            src={product.preview}
                                            alt=""
                                            className="w-[100px] h-[50px] object-cover mb-[10px]"
                                        />
                                        <h3>Название: {product.title}</h3>
                                        <h3>Дата создания: {getDateString(product.created_at)}</h3>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-[20px]">
                                    <button
                                        onClick={() => setDeleteWindow(product.id)}
                                        className="w-max py-[5px] px-[20px] text-white bg-red-500 cursor-pointer"
                                    >
                                        Удалить
                                    </button>
                                    <Link
                                        href={`news/edit/${product.id}`}
                                        className="w-max py-[5px] px-[20px] text-white bg-[#29547F]"
                                    >
                                        Изменить
                                    </Link>
                                </div>
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
