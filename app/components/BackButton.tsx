"use client"

import Image from "next/image"
import Arrow from "../../public/images/Arrow 10.svg"
import { useRouter } from 'next/navigation'

export default function BackButton() {
    const router = useRouter()

    return (
        <div className="flex flex-row gap-[15px] items-center pb-[55px] cursor-pointer">
            <Image src={Arrow} alt="Uазад" className="rotate-180" />
            <span onClick={() => router.back()} className="text-[24px] text-[#3c4879] font-bold">Назад к списку</span>
        </div>

    )
}