"use client"

import { useRouter } from 'next/navigation'
import Image from "next/image"
import Arrow from "../../public/images/Arrow 10.svg"

export default function BackButton() {
    const router = useRouter()

    return (
        <div className="flex flex-row gap-[15px] items-center pb-[35px] md:pb-[55px] cursor-pointer">
            <Image src={Arrow} alt="Uазад" className="rotate-180" />
            <span onClick={() => router.back()} className="text-[15px] md:text-[18px] lg:text-[24px] text-[#3c4879] font-bold">Назад к списку</span>
        </div>

    )
}