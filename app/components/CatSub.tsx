"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { ICategory } from "../utils/types"
import { Navigation } from "swiper/modules"
import Image from "next/image";
import Link from "next/link";
import arrowDown from "../../public/images/Arrow 10.svg"
import 'swiper/css';
import 'swiper/css/navigation';
import { usePathname } from "next/navigation";


interface IProps {
    categories: ICategory[],
    params: {
        categoryBy?: string | undefined,
        subcategoryBy?: string | undefined
    }
}

export default function CatSub({ categories, params }: IProps) {
    const { categoryBy, subcategoryBy } = params
    const pathname = usePathname()
    const news = pathname.split("/")[1]
    return (
        <>
            <h3 className="font-bold text-[30px] text-[#222] mb-[15px] vertical_line px-[20px] leading-normal">Категории</h3>
            <div className="relative px-[50px]">
                <button className="prev p-5 absolute z-10 left-0 rotate-180 top-1/2 -translate-y-1/2 cursor-pointer">
                    <Image src={arrowDown} alt="" />
                </button>
                <button className="next p-5 absolute z-10 right-0 top-1/2 -translate-y-1/2 cursor-pointer">
                    <Image src={arrowDown} alt="" className="text-black" />
                </button>
                <Swiper
                    className="w-full h-full"
                    loop={true}
                    slidesPerView={4}
                    spaceBetween={20}
                    navigation={{
                        prevEl: '.prev',
                        nextEl: '.next',
                    }}
                    modules={[Navigation]}
                >
                    <SwiperSlide>
                        <Link
                            href={`/news/`}>
                            <h2
                                className={"block py-[6px] px-[20px] bg-[#343a40] text-white text-[20px] rounded-[20px] " + (news == "news" && categoryBy == undefined && "active_button")}>
                                Всё
                            </h2>
                        </Link>
                    </SwiperSlide>
                    {categories.map(category => (
                        <SwiperSlide key={category.id} className="w-max">
                            <Link
                                href={`/news/${category.slug}`}
                                className={"block py-[6px] px-[20px] bg-[#343a40] text-white text-[20px] rounded-[20px] " + (categoryBy == category.slug && "active_button")}
                            >
                                {category.title}
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {categoryBy && (
                <div className="pt-[15px]">
                    <h4 className="text-[30px] font-bold relative flex flex-row text-[#343a40] vertical_line my-[20px] px-[20px]">Все по теме</h4>
                    <div className="flex flex-row gap-[10px]">
                        <Link
                            href={`/news/${categoryBy}/`}
                            className={"block py-[6px] px-[20px] bg-[#343a40] text-white rounded-[20px] " + (subcategoryBy == undefined && "active_button")}
                        >
                            Всё
                        </Link>
                        {categories.map(category => {
                            if (category.slug == categoryBy) {
                                return category.subcategories.map(subcategory => (
                                    <Link
                                        href={`/news/${category.slug}/${subcategory.slug}`}
                                        key={subcategory.id}
                                        className={"block py-[6px] px-[20px] bg-[#343a40] text-white rounded-[20px] " + (subcategoryBy == subcategory.slug && "active_button")}
                                    >
                                        {subcategory.title}
                                    </Link>
                                ))
                            }
                        })}
                    </div>
                </div>
            )}
            <div className="w-full h-[1px] bg-[#343a40] mt-[15px] mb-[65px]"></div>
        </>
    )
}