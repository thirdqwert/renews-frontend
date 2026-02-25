"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getReels } from "../utils/utilis";
import { IReelsObject } from "../utils/types";
import swipperArrow from "../../public/images/swipperArrow.svg"
import play from "../../public/images/play.svg"
import 'swiper/css';
import 'swiper/css/navigation';
import Link from "next/link";
import Loader from "./Loader";


export default function ReelsSwiper() {
    const [reels, setReels] = useState<IReelsObject | null>(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getReels(undefined)
                setReels(data)
            } catch (error) {
                throw error
            }
        }
        getData()
    }, [])

    return (
        reels ? (
            <div className="relative">
                <button className="prev_vids hidden md:block absolute z-10 -left-[0] top-1/2 -translate-y-1/2 cursor-pointer">
                    <Image src={swipperArrow} alt="" />
                </button>
                <button className="next_vids hidden md:block absolute z-10 -right-[0] rotate-180 top-1/2 -translate-y-1/2 cursor-pointer">
                    <Image src={swipperArrow} alt="" />
                </button>
                <div className="px-[0] md:px-[50px]">
                    <Swiper
                        loop={true}
                        spaceBetween={30}
                        navigation={{
                            prevEl: '.prev_reels',
                            nextEl: '.next_reels',
                        }}
                        breakpoints={{
                            320: { slidesPerView: 1.05, spaceBetween: 10 },
                            640: { slidesPerView: 1.2, spaceBetween: 10 },
                            768: { slidesPerView: 2, spaceBetween: 10 },
                            1024: { slidesPerView: 3, spaceBetween: 10 },
                            1536: { slidesPerView: 4, spaceBetween: 30 },
                        }}
                        modules={[Navigation]}
                    >
                        {reels.results.map((reel, i) => (
                            <SwiperSlide key={reel.id}>
                                <Link href={`/news/reels?current=${i}`} className="relative block h-[500px] rounded-[10px] overflow-hidden">
                                    <Image unoptimized width={0} height={0} src={reel.image} alt={reel.title} className="w-full h-full object-cover" />
                                    <Image src={play} alt="" className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2" />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        ) : (
            <div className="flex flex-row items-center justify-center min-h-full w-full">
                <Loader />
            </div>
        )
    )
}