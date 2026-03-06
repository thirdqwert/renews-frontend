"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICategory } from "../utils/types";
import { Navigation } from "swiper/modules";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import arrowDown from "../../public/images/Arrow 10.svg";
import "swiper/css";
import "swiper/css/navigation";
import SelectUI from "./ui/SelectUI";

interface IProps {
    categories: ICategory[];
    params: {
        categoryBy?: string | undefined;
        subcategoryBy?: string | undefined;
    };
}

export default function CatSub({ categories, params }: IProps) {
    const { categoryBy, subcategoryBy } = params;
    const pathname = usePathname();
    const news = pathname.split("/")[1];
    const currentCategory =
        categoryBy &&
        categories.find((category) => category.slug == categoryBy);

    return (
        <>
            <div className="lg:hidden">
                <h1 className="font-bold text-[24px] pl-[7px] md:text-[18px] text-[#222] relative vertical_line_blue mb-[23px]">
                    {currentCategory && currentCategory.title}
                </h1>
                <div className="relative md:px-[50px] block lg:hidden">
                    <button className="prev hidden md:block py-[5px] px-[10px] md:px-[20px] absolute z-10 left-0 rotate-180 top-1/2 -translate-y-1/2 cursor-pointer">
                        <Image src={arrowDown} alt="" />
                    </button>
                    <button className="next hidden md:block py-[5px] px-[10px] md:px-[20px] absolute z-10 right-0 top-1/2 -translate-y-1/2 cursor-pointer">
                        <Image src={arrowDown} alt="" className="text-black" />
                    </button>
                    <Swiper
                        className="w-full h-full"
                        slidesPerView={4}
                        spaceBetween={20}
                        navigation={{
                            prevEl: ".prev",
                            nextEl: ".next",
                        }}
                        modules={[Navigation]}
                        breakpoints={{
                            0: { slidesPerView: 1.2, spaceBetween: 10 },
                            640: { slidesPerView: 2.2, spaceBetween: 20 },
                        }}
                    >
                        <SwiperSlide>
                            <Link href={`/news/${categoryBy}`}>
                                <h2
                                    className={
                                        "block py-[3px] px-[10px] bg-[#29547f] font-medium text-white text-[15px] md:text-[17px] rounded-[20px] " +
                                        (news == "news" &&
                                            subcategoryBy == undefined &&
                                            "active_subcategory")
                                    }
                                >
                                    Всё
                                </h2>
                            </Link>
                        </SwiperSlide>
                        {currentCategory &&
                            currentCategory.subcategories.map((subcategory) => (
                                <SwiperSlide
                                    key={subcategory.id}
                                    className="w-max"
                                >
                                    <Link
                                        href={`/news/${currentCategory.slug}/${subcategory.slug}/`}
                                        className={
                                            "block py-[3px] px-[10px] bg-[#29547f] font-medium text-white text-[15px] md:text-[17px] rounded-[20px] " +
                                            (subcategoryBy ==
                                                subcategory.slug &&
                                                "active_subcategory")
                                        }
                                    >
                                        {subcategory.title}
                                    </Link>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </div>
            {categoryBy && (
                <div className="relative max-w-[23.7%] w-full hidden lg:block">
                    <div className="flex flex-col w-full flex-wrap sticky top-[15px] left-0 bg-[#343a40] rounded-[20px]">
                        <h3 className="font-bold lg:text-[20px] xl:text-[25px] text-white pt-[11px] pb-[15px] px-[17px]">
                            Все по теме
                        </h3>
                        <div className="w-[98%] mx-auto h-[1px] bg-[rgba(255,255,255,0.5)]" />
                        <div className="lg:py-[20px] xl:py-[15px]">
                            {currentCategory &&
                                currentCategory.subcategories.map(
                                    (subcategory) => (
                                        <Link
                                            href={`/news/${currentCategory.slug}/${subcategory.slug}`}
                                            key={subcategory.id}
                                            className={
                                                "relative block overflow-hidden py-[6px] px-[20px] text-white lg:text-[15px] xl:text-[20px] font-medium px-[25px] py-[8px] " +
                                                (subcategoryBy ==
                                                    subcategory.slug &&
                                                    "active_category")
                                            }
                                        >
                                            <span
                                                className="absolute w-[16px] h-full top-0 bottom-0 left-[-8px] bg-[#4490dd] rounded-[20px]"
                                                style={{
                                                    display:
                                                        subcategoryBy ==
                                                        subcategory.slug
                                                            ? "block"
                                                            : "none",
                                                }}
                                            />
                                            {subcategory.title}
                                        </Link>
                                    ),
                                )}
                        </div>
                        <div className="w-[98%] mx-auto h-[1px] bg-[rgba(255,255,255,0.5)]" />
                        <Link
                            href={`/news/${categoryBy}/`}
                            className="block w-max mx-auto mt-[15px] mb-[30px] xl:text-[19px] lg:text-[16px] font-medium rounded-[20px] bg-[#dbdbdb] px-[25px] py-[8px]"
                        >
                            Сбросить фильтр
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
