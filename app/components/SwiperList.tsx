"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { INews } from "../utils/types";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { getDateString } from "../utils/utilis";
import Image from "next/image";
import Link from "next/link";
import swipperArrow from "../../public/images/swipperArrow.svg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
interface IProps {
    list: INews[];
}

export default function SwiperList({ list }: IProps) {
    return (
        <>
            <div className="relative">
                <button className="prev_hot_news hidden md:flex items-center justify-center absolute z-10 left-[0] top-1/2 -translate-y-1/2 cursor-pointer md:h-[50px] md:w-[50px]">
                    <Image src={swipperArrow} alt="" />
                </button>
                <button className="next_hot_news hidden md:flex items-center justify-center absolute z-10 right-[0] rotate-180 top-1/2 -translate-y-1/2 cursor-pointer md:h-[50px] md:w-[50px]">
                    <Image src={swipperArrow} alt="" />
                </button>
                <Swiper
                    className="rounded-[20px] overflow-hidden h-[218px] sm:h-[350px] lg:h-[500px] xl:h-[600px]"
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation={{
                        nextEl: ".next_hot_news",
                        prevEl: ".prev_hot_news",
                    }}
                    pagination={true}
                    modules={[Autoplay, Navigation, Pagination]}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                >
                    {list.map((item) => (
                        <SwiperSlide
                            key={item.id}
                            className="rounded-[20px] overflow-hidden relative"
                        >
                            <Link href={`/news/detail/${item.id}`}>
                                <Image
                                    unoptimized
                                    width={0}
                                    height={0}
                                    className="block h-full w-full align-middle object-cover"
                                    src={item.preview}
                                    alt={item.short_title}
                                />
                                <div
                                    className="absolute top-0 right-0 left-0 bottom-0 h-full w-full"
                                    style={{
                                        background:
                                            "linear-gradient(180deg,rgba(0, 0, 0, 0) 47%, rgba(0, 0, 0, 0.66) 74%, rgba(0, 0, 0, 0.9) 100%)",
                                    }}
                                />
                                <article className="absolute bottom-[35px] px-[5px] md:px-[32px] lg:px-[48px] xl:px-[80px]">
                                    <h3 className="text-[11px] md:text-[19px] lg:text-[25px] xl:text-[35px] text-white font-bold short_title">
                                        {item.title}
                                    </h3>
                                    <div className="flex flex-row gap-[30px] items-end">
                                        <span className="text-[9px] md:text-[16px] lg:text-[20px] text-white font-medium">
                                            {item.category}
                                        </span>
                                        <time
                                            className="text-[9px] md:text-[16px] lg:text-[20px] text-white font-medium"
                                            dateTime={
                                                item.created_at.split("T")[0]
                                            }
                                        >
                                            {getDateString(item.created_at)}
                                        </time>
                                    </div>
                                </article>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
