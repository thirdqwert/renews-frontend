"use client"
import Image from "next/image";
import USDIcon from "../../public/images/usd.svg"
import RUBIcon from "../../public/images/rub.svg"
import redDown from "../../public/images/redDown.svg"
import greenTop from "../../public/images/greenTop.svg"
import { useEffect, useState } from "react";
import { IExchange } from "../utils/types";

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
        <div className="flex flex-row gap-[20px] w-[378px]">
            <div className="flex flex-row gap-[5px]">
                <Image src={USDIcon} alt="USD"/>
                <span className="text-[24px] text-white font-medium">USD</span>
                <span 
                    className="text-[24px] text-white font-medium">
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
                <Image src={RUBIcon} alt="RUB"/>
                <span className="text-[24px] text-white font-medium">RUB</span>
                <span 
                    className="text-[24px] text-white font-medium">
                    {uzbRub ? uzbRub.Rate : 0}
                </span>
                <Image 
                    width={13} 
                    height={18} 
                    className="object-contain" 
                    src={uzbRub && uzbRub.Diff[0] == "-" ? redDown : greenTop   } 
                    alt=""
                />
            </div>
        </div>
)
}