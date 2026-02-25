"use client"

import { IReelsObject } from "@/app/utils/types"
import { getReels } from "@/app/utils/utilis"
import { useEffect, useState } from "react"
import { Mousewheel, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Script from "next/script"
import Loader from "@/app/components/Loader"
import arrowDown from "../../../public/images/downArrow.svg"
import 'swiper/css';
import 'swiper/css/navigation';
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { InstagramEmbed } from "react-social-media-embed"


export default function Reels() {
    const [reels, setReels] = useState<IReelsObject | null>(null)
    const searchParams = useSearchParams();
    const current = Number(searchParams.get("current"))


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
        <>
            <Script
                src="https://www.instagram.com/embed.js"
                strategy="lazyOnload"
            />

            {reels ? (

                <div className="h-[calc(100vh-74px-246px+200px)] relative w-[500px] py-[20px] mx-auto ">
                    <div className="flex flex-col gap-[20px] absolute top-1/2 -translate-y-1/2 z-10 -right-[100px]">
                        <button className="prev_reels_vertical flex justify-center items-center h-[70px] w-[70px] bg-[#343a40] rotate-180 cursor-pointer rounded-full select-none">
                            <Image src={arrowDown} alt="" />
                        </button>
                        <button className="next_reels_vertical flex justify-center items-center h-[70px] w-[70px] bg-[#343a40] cursor-pointer rounded-full select-none">
                            <Image src={arrowDown} alt="" />
                        </button>
                    </div>
                    <Swiper
                        initialSlide={current >= 0 ? current : 0}
                        className="h-full w-full"
                        direction={'vertical'}
                        modules={[Navigation, Mousewheel]}
                        mousewheel={true}
                        navigation={{
                            prevEl: '.prev_reels_vertical',
                            nextEl: '.next_reels_vertical',
                        }}
                        slidesPerView={1}
                    >
                        {reels.results.map(reel => (
                            <SwiperSlide key={reel.id}>
                                <InstagramEmbed url={reel.content}/>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
            ) : (
                <div className="h-[calc(100vh-74px-246px)] flex items-center justify-center">
                    <Loader />
                </div>
            )}
        </>

    )
}
