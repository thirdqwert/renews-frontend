"use client"
import Image from "next/image";
import USDIcon from "../../public/images/usd.svg"
import RUBIcon from "../../public/images/rub.svg"
import redDown from "../../public/images/redDown.svg"
import greenTop from "../../public/images/greenTop.svg"
import { useEffect, useState } from "react";
import { IExchange } from "../utils/types";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Autoplay } from "swiper/modules";

export default function ExchangeRate() {
    const [uzbUsd, setUzbUsd] = useState<IExchange | null>(null)
    const [uzbRub, setUzbRub] = useState<IExchange | null>(null)

    useEffect(() => {
        const getData = async () => {
            const [usdRes, rubRes] = await Promise.all([
                fetch("https://cbu.uz/ru/arkhiv-kursov-valyut/json/USD/"),
                fetch("https://cbu.uz/ru/arkhiv-kursov-valyut/json/RUB/")
            ])
            const [usdData, rubData] = await Promise.all([
                usdRes.json(),
                rubRes.json()
            ])
            setUzbUsd(usdData[0])
            setUzbRub(rubData[0])
        }
        getData()
    }, [])

    return (
        <>
            {/* <div className="hidden xl:flex flex-row gap-[20px] w-[378px]">
                <div className="flex flex-row gap-[5px]">
                    <Image src={USDIcon} alt="USD" />
                    <span className="text-[24px] text-white font-normal">USD</span>
                    <span
                        className="text-[24px] text-white font-normal">
                        {uzbUsd ? uzbUsd.Rate : 0}
                    </span>
                    <Image
                        width={13}
                        height={18}
                        className="object-contain"
                        src={uzbUsd && uzbUsd.Diff[0] == "-" ? redDown : greenTop}
                        alt=""
                    />
                </div>
                <div className="flex flex-row gap-[5px]">
                    <Image src={RUBIcon} alt="RUB" />
                    <span className="text-[24px] text-white font-normal">RUB</span>
                    <span
                        className="text-[24px] text-white font-normal">
                        {uzbRub ? uzbRub.Rate : 0}
                    </span>
                    <Image
                        width={13}
                        height={18}
                        className="object-contain"
                        src={uzbRub && uzbRub.Diff[0] == "-" ? redDown : greenTop}
                        alt=""
                    />
                </div>
            </div> */}

            <div className="block h-[21px] xl:h-[30px]">
                <Swiper
                    className="h-full w-full"
                    direction={"vertical"}
                    loop={true}
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                >

                    <SwiperSlide>
                        <div className="flex flex-row gap-[5px]">
                            <Image src={USDIcon} alt="USD" />
                            <span className="md:text-[16px] xl:text-[24px] text-white font-normal">USD</span>
                            <span
                                className="md:text-[16px] xl:text-[24px] text-white font-normal">
                                {uzbUsd ? uzbUsd.Rate : 0}
                            </span>
                            <Image
                                width={13}
                                height={18}
                                className="object-contain"
                                src={uzbUsd && uzbUsd.Diff[0] == "-" ? redDown : greenTop}
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex flex-row gap-[5px]">
                            <Image src={RUBIcon} alt="RUB" />
                            <span className="md:text-[16px] xl:text-[24px] text-white font-normal">RUB</span>
                            <span
                                className="md:text-[16px] xl:text-[24px] text-white font-normal">
                                {uzbRub ? uzbRub.Rate : 0}
                            </span>
                            <Image
                                width={13}
                                height={18}
                                className="object-contain"
                                src={uzbRub && uzbRub.Diff[0] == "-" ? redDown : greenTop}
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>

    )
}