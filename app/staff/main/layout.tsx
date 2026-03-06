"use client";

import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StaffLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    useEffect(() => {
        const token = getCookie("access_token");
        if (!token) {
            router.push("/staff/login/");
        }
    }, []);

    return (
        <>
            <header className="py-[20px] bg-white">
                <div className="container">
                    <nav className="flex flex-orw gap-[20px]">
                        <Link
                            href={"/staff/main"}
                            className="text-[#29547F] font-medium"
                        >
                            Главная
                        </Link>
                        <Link
                            href={"/staff/main/images"}
                            className="text-[#29547F] font-medium"
                        >
                            Изображения
                        </Link>
                        <Link
                            href={"/staff/main/audios"}
                            className="text-[#29547F] font-medium"
                        >
                            Аудио
                        </Link>
                        <Link
                            href={"/staff/main/news"}
                            className="text-[#29547F] font-medium"
                        >
                            Новости
                        </Link>
                        <Link
                            href={"/staff/main/reels"}
                            className="text-[#29547F] font-medium"
                        >
                            Reels
                        </Link>
                        <Link
                            href={"/staff/main/youtubevids"}
                            className="text-[#29547F] font-medium"
                        >
                            YouTubeVids
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="bg-[#8ecee0]">{children}</main>
        </>
    );
}
