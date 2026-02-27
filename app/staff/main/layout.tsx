"use client"

import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StaffLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter()

    useEffect(() => {
        const token = getCookie("access_token")
        if (!token) {
            router.push("login/")
        }

    }, [])

    return (

        <>

            <header className="py-[20px]">
                <div className="container">
                    <Link href={"/staff/main"} className="py-[10px] px-[20px] border border-gray-400">Главная</Link>
                </div>
            </header>
            {children}
        </>
    )
}

