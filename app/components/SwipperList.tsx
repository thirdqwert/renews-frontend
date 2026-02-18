"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { INews } from "../utils/types"
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { getDateString } from "../utils/utilis";
import Link from "next/link";

interface IProps {
    list: INews[]
}


export default function SwipperList({ list }: IProps) {

    return (

        <>
            <Swiper
                className="rounded-[20px] overflow-hidden bg-[#]"
                loop={true}
                spaceBetween={50}
                slidesPerView={1}
                navigation={true}
                pagination={true}
                modules={[Autoplay, Navigation, Pagination]}
            // autoplay={{ delay: 5000, disableOnInteraction: false }}
            >
                {list.map(item => (
                    <SwiperSlide key={item.id} className="max-h-[600px] rounded-[20px] overflow-hidden relative">
                        <Link href={`/news/detail/${item.id}`}>
                            <Image unoptimized width={0} height={0} className="block h-full w-full align-middle object-fill" src={item.preview} alt={item.short_title} />
                            <div
                                className="absolute top-0 right-0 left-0 bottom-0 h-full w-full"
                                style={{ background: "linear-gradient(180deg,rgba(0, 0, 0, 0) 47%, rgba(0, 0, 0, 0.66) 74%, rgba(0, 0, 0, 0.9) 100%)" }} />
                            <article className="absolute bottom-[35px] px-[80px]">
                                <h3 className="text-[35px] text-white font-bold short_title">{item.title}</h3>
                                <div className="flex flex-row gap-[30px]">
                                    <span className="text-[20px] text-white font-medium">{item.category}</span>
                                    <time className="text-[20px] text-white font-medium" dateTime={item.created_at.split('T')[0]}>{getDateString(item.created_at)}</time>
                                </div>
                            </article>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}