"use client";

import Link from "next/link";

export default function ErrorPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-white gap-[16px]">
            <span className="text-[120px] font-bold text-secondery leading-none">404</span>
            <p className="text-secondery text-[18px] font-medium">Что-то пошло не так...</p>
            <Link
                href="/"
                className="mt-[8px] text-[15px] font-medium text-white bg-secondery px-[24px] py-[10px] rounded-[8px] hover:opacity-80 transition-opacity"
            >
                На главную
            </Link>
        </main>
    );
}
