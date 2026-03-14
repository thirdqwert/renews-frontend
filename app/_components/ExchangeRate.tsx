"use client";
import { useEffect, useState } from "react";
import { IExchange } from "../_utils/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import USDIcon from "../../public/images/usd.svg";
import RUBIcon from "../../public/images/rub.svg";
import redDown from "../../public/images/redDown.svg";
import greenTop from "../../public/images/greenTop.svg";
import "swiper/css";

export default function ExchangeRate() {
    const [uzbUsd, setUzbUsd] = useState<IExchange | null>(null);
    const [uzbRub, setUzbRub] = useState<IExchange | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const [usdRes, rubRes] = await Promise.all([
                    fetch("https://cbu.uz/ru/arkhiv-kursov-valyut/json/USD/"),
                    fetch("https://cbu.uz/ru/arkhiv-kursov-valyut/json/RUB/"),
                ]);
                const [usdData, rubData] = await Promise.all([usdRes.json(), rubRes.json()]);
                setUzbUsd(usdData[0]);
                setUzbRub(rubData[0]);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    return (
        <>
            {/* для маленький экранов */}
            <div className="flex ssm:hidden flex-row gap-[10px] justify-end">
                <div className="flex flex-row gap-[5px]  rounded-[5px]">
                    <Image src={USDIcon} alt="USD" className="h-[17px] w-[17px]" />
                    <span className="text-[14px] text-white font-medium">USD</span>
                    <span className="text-[14px] text-white font-medium">{uzbUsd ? uzbUsd.Rate.split('.')[0] : 0}</span>
                    <Image
                        width={10}
                        height={14}
                        className="object-contain"
                        src={uzbUsd && uzbUsd.Diff[0] == "-" ? redDown : greenTop}
                        alt=""
                    />
                </div>
                <div className="flex flex-row gap-[5px]  rounded-[5px]">
                    <Image src={RUBIcon} alt="RUB" className="h-[17px] w-[17px]" />
                    <span className="text-[14px] text-white font-medium">RUB</span>
                    <span className="text-[14px] text-white font-medium">{uzbRub ? uzbRub.Rate.split('.')[0] : 0}</span>
                    <Image
                        width={10}
                        height={14}
                        className="object-contain"
                        src={uzbRub && uzbRub.Diff[0] == "-" ? redDown : greenTop}
                        alt=""
                    />
                </div>
            </div>
            {/* для больших экранов */}
            <div className="hidden ssm:block h-[21px] xl:h-[30px] w-max">
                <Swiper
                    className="h-full w-full"
                    direction={"vertical"}
                    loop={true}
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                >
                    <SwiperSlide>
                        <div className="flex flex-row gap-[5px] items-center">
                            <Image src={USDIcon} alt="USD" className="w-[17px] h-[17px] md:w-[23px] md:h-[23px]" />
                            <span className="text-[14px] md:text-[16px] xl:text-[24px] text-white font-normal">
                                USD
                            </span>
                            <span className="text-[14px] md:text-[16px] xl:text-[24px] text-white font-normal">
                                {uzbUsd ? uzbUsd.Rate.split('.')[0] : 0}
                            </span>
                            <Image
                                className="object-contain w-[10px] h-[14px] md:w-[11px] lg:h-[15px] xl:w-[14px] xl:h-[19px]"
                                src={uzbUsd && uzbUsd.Diff[0] == "-" ? redDown : greenTop}
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex flex-row gap-[5px] items-center">
                            <Image src={RUBIcon} alt="RUB" className="w-[17px] h-[17px] md:w-[23px] md:h-[23px]" />
                            <span className="text-[14px] md:text-[16px] xl:text-[24px] text-white font-normal">
                                RUB
                            </span>
                            <span className="text-[14px] md:text-[16px] xl:text-[24px] text-white font-normal">
                                {uzbRub ? uzbRub.Rate.split('.')[0] : 0}
                            </span>
                            <Image
                                className="object-contain w-[10px] h-[14px] md:w-[11px] lg:h-[15px] xl:w-[14px] xl:h-[19px]"
                                src={uzbRub && uzbRub.Diff[0] == "-" ? redDown : greenTop}
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}
