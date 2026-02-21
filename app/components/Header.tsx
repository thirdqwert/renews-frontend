"use client"
import Link from "next/link"
import Image from "next/image"
import arrowDown from "../../public/images/downArrow.svg"
import ExchangeRate from "./ExchangeRate";
import SearchIcon from "../../public/images/search.svg"
import { useParams, usePathname } from "next/navigation"
import { getCategories } from "../utils/utilis"
import { useEffect, useState } from "react"
import { ICategory } from "../utils/types"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';


export default function Header() {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [isOpen, setIsOpen] = useState(false)

    const params = useParams()
    const pathname = usePathname()
    const news = pathname.split("/")[1]
    const categoryBy = params.category
    const subcategoryBy = params.subcategory // удали потом систему подкатегорий



    const handleLeave = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 100)
    };

    useEffect(() => {
        const getData = async () => {
            const data = await getCategories()
            setCategories(data)
        }
        getData()
    }, [])

    return (
        <div className="relative">
            <header className="px-[50px] py-[30px] bg-[#343a40] relative z-20">
                <nav className="flex flex-row justify-between items-center">
                    <Link href={"/"}>
                        <h1 className="text-[36px] font-bold">
                            <span className="text-white">RE</span><span className="text-[#92a8e0]">NEWS</span>
                        </h1>
                    </Link>
                    <ul className="flex flex-row gap-[50px]">
                        <li><Link className="text-[24px] text-white font-bold" href={"/"} >Главная</Link></li>
                        <li><Link className="text-[24px] text-white font-bold" href={"/news/"} >Новости</Link></li>
                        <li><Link className="text-[24px] text-white font-bold" href={"/contacts/"} >Контакты</Link></li>
                        <li
                            onClick={() => setIsOpen(!isOpen)}
                            onMouseEnter={() => setIsOpen(true)}
                            className="text-[24px] text-white font-bold flex flex-row items-center gap-[10px] cursor-pointer select-none">
                            <span>Категории</span>
                            <Image src={arrowDown} alt="" />
                        </li>

                    </ul>
                    <div className="flex flex-row items-center gap-[10px]">
                        <Link href={"/news/search/"} className="pr-[10px] border-r border-white w-[30px] h-[20px]"><Image width={20} height={20} src={SearchIcon} alt="Поиск" /></Link>
                        <ExchangeRate />
                    </div>
                </nav>

            </header>
            <div
                onMouseLeave={handleLeave}
                className="flex flex-col absolute bottom-0 right-1/2 translate-x-1/2 max-w-[1070px] w-full bg-[#343a40] py-[30px] px-[70px] rounded-b-[50px]"
                style={{
                    transition: "all 0.1s",
                    zIndex: "2",
                    transform: isOpen ? "translateY(100%)" : ""
                }}
            >
                <button className="prev p-5 absolute z-10 left-5 *:rotate-90 top-1/2 -translate-y-1/2 cursor-pointer">
                    <Image src={arrowDown} alt="" />
                </button>
                <button className="next p-5 absolute z-10 right-5 -rotate-90 top-1/2 -translate-y-1/2 cursor-pointer">
                    <Image src={arrowDown} alt="" />
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
                                className={"block py-[6px] px-[20px] bg-white rounded-[20px] " + (news == "news" && categoryBy == undefined && "active_button")}>
                                Всё
                            </h2>
                        </Link>
                    </SwiperSlide>
                    {categories && categories.map(category => (
                        <SwiperSlide key={category.id}>
                            <Link
                                href={`/news/${category.slug}`}
                                className={"block py-[6px] px-[20px] bg-white rounded-[20px] " + (categoryBy == category.slug && "active_button")}
                            >
                                {category.title}
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* {categoryBy && (
                    <div className="pt-[30px]">
                        <h4 className="text-[30px] font-bold relative flex flex-row text-white category_title_line my-[20px] px-[20px]">Все по теме</h4>
                        <div className="flex flex-row gap-[10px]">
                            {categories.map(category => {
                                if (category.slug == categoryBy) {
                                    return category.subcategories.map(subcategory => (
                                        <Link
                                            href={`/news/${category.slug}/${subcategory.slug}`}
                                            key={subcategory.id}
                                            className={"block py-[6px] px-[20px] bg-white rounded-[20px] " + (subcategoryBy == subcategory.slug && "active_button")}
                                        >
                                            {subcategory.title}
                                        </Link>
                                    ))
                                }
                            })}
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    )
}