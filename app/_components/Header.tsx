"use client";
import { useParams, usePathname } from "next/navigation";
import { getCategories } from "../_utils/utilis";
import { useEffect, useState } from "react";
import { ICategory } from "../_utils/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import ExchangeRate from "./ExchangeRate";
import arrowDown from "../../public/images/downArrow.svg";
import arrowRight from "../../public/images/arrowRight.svg";
import homeIcon from "../../public/images/homeIcon.svg";
import newsIcon from "../../public/images/newsIcon.svg";
import contactsIcon from "../../public/images/contactsIcon.svg";
import blueArrowDown from "../../public/images/blueArrowDown.svg";
import CloseIcon from "../../public/images/close.svg";
import BurgerIcon from "../../public/images/burger.svg";
import SearchIcon from "../../public/images/search.svg";
import "swiper/css";
import "swiper/css/navigation";

const categoriesLinks = [
    { name: "Главная", slug: "", breakpoint: "" },
    { name: "Новости мира", slug: "novosti-mira", breakpoint: "" },
    { name: "Новости страны", slug: "novosti-strany", breakpoint: "" },
    {
        name: "Происшествия",
        slug: "proisshestviya",
        breakpoint: "hidden 4xl:block",
    },
    { name: "Спорт", slug: "sport", breakpoint: "hidden 5xl:block" },
    { name: "Экономика", slug: "ekonomika", breakpoint: "hidden 6xl:block" },
    { name: "Культура", slug: "kultura", breakpoint: "hidden 7xl:block" },
];

export default function Header() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [moreCategoriesIsOpen, setMoreCategoriesIsOpen] = useState(false);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [subCategoryIsOpenHeader, setSubCategoryIsOpenHeader] = useState<null | string>(null);
    const params = useParams();
    const pathname = usePathname();
    const news = pathname.split("/")[1];
    const categoryBy = params.category;
    const subcategoryBy = params.subcategory;
    const [subcategoryIsOpenSidebar, setSubcategoryIsOpenSidebar] = useState<string | null>(
        categoryBy?.toString() || null,
    );

    const subCategoriesListHTML = (slug: string) => {
        const currentCateogry = categories.find((category) => category.slug == slug);

        if (currentCateogry) {
            return (
                // <div className="bg-[#2d3236] absolute lg:top-[45px] xl:top-[64px] left-1/2 -translate-x-1/2 flex flex-row w-[95%] flex-wrap flex-row flex-wrap items-start rounded-b-[20px]" onMouseLeave={() => setSubCategoryIsOpenHeader(null)}>
                //     {currentCateogry.subcategories.map(subcategory => (
                //         <Link href={`/news/${currentCateogry.slug}/${subcategory.slug}`} key={subcategory.id} className="text-[13px] md:text-[18px] font-medium text-white px-[30px] py-[20px] hover:bg-[#295480] hover:text-white">{subcategory.title}</Link>
                //     ))}
                // </div>
                <div
                    onMouseLeave={() => setSubCategoryIsOpenHeader(null)}
                    className="flex flex-col absolute lg:top-[45px] xl:top-[64px] left-1/2 -translate-x-1/2 w-full max-w-[1820px] bg-[#343a40] py-[10px] px-[70px] rounded-b-[50px]"
                >
                    <button className="prev_header p-[20px] absolute z-10 left-[20px] rotate-90 top-1/2 -translate-y-1/2 cursor-pointer">
                        <Image src={arrowDown} alt="" />
                    </button>
                    <button className="next_header p-[20px] absolute z-10 right-[20px] -rotate-90 top-1/2 -translate-y-1/2 cursor-pointer">
                        <Image src={arrowDown} alt="" />
                    </button>
                    <Swiper
                        className="w-full h-full"
                        loop={true}
                        slidesPerView={4}
                        spaceBetween={20}
                        navigation={{
                            prevEl: ".prev_header",
                            nextEl: ".next_header",
                        }}
                        modules={[Navigation]}
                    >
                        {currentCateogry &&
                            currentCateogry.subcategories.map((subcategory) => (
                                <SwiperSlide key={subcategory.id}>
                                    <Link
                                        href={`/news/${currentCateogry.slug}/${subcategory.slug}`}
                                        className="block cursor-pointer bg-[#295480] hover:bg-[#f4f6f9] hover:text-[#295480] text-[#f4f6f9] text-[13px] md:text-[18px] font-medium py-[5px] px-[10px] rounded-[20px]"
                                    >
                                        {subcategory.title}
                                    </Link>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            );
        }
    };

    useEffect(() => {
        const getData = async () => {
            const data = await getCategories(undefined);
            setCategories(data);
        };
        getData();
    }, []);

    return (
        <div className="relative">
            {/* Header */}
            <header className="px-[20px] md:px-[50px] py-[15px] md:py-[25px] lg:py-[10px] bg-[#343a40] relative z-20">
                <nav className="flex flex-row justify-between items-center max-w-[1820px] mx-auto">
                    <div className="flex flex-row items-center gap-[40px]">
                        <Link href="/">
                            <div aria-label="Renews" className="md:text-[20px] xl:text-[36px] font-bold">
                                <span className="text-white">RE</span>
                                <span className="text-[#92a8e0]">NEWS</span>
                            </div>
                        </Link>
                        <ul className="hidden lg:flex flex-row gap-[30px]">
                            {categoriesLinks.map((item) => (
                                <li
                                    key={item.slug || "home"}
                                    className={item.breakpoint}
                                    onMouseEnter={() => {
                                        setSubCategoryIsOpenHeader(item.slug);
                                        setMoreCategoriesIsOpen(false);
                                    }}
                                >
                                    <Link
                                        href={`/news/${item.slug}`}
                                        className="text-[13px] md:text-[18px] text-white font-medium"
                                    >
                                        {item.name}
                                    </Link>

                                    {subCategoryIsOpenHeader === item.slug && subCategoriesListHTML(item.slug)}
                                </li>
                            ))}
                            <li
                                // onClick={() => setMoreCategoriesIsOpen(!moreCategoriesIsOpen)}
                                onMouseEnter={() => {
                                    setSubCategoryIsOpenHeader(null);
                                    setMoreCategoriesIsOpen(true);
                                }}
                                className="relative cursor-pointer flex flex-row gap-[5px]"
                            >
                                <span className="text-[13px] md:text-[18px] text-white font-medium">Ёще</span>
                                <Image src={arrowDown} alt="" />
                                {moreCategoriesIsOpen && (
                                    <div
                                        className="absolute z-50 lg:top-[34px] xl:top-[40px] bg-[#343a40] w-[200px] flex flex-col pb-[10px] rounded-b-[10px]"
                                        onMouseLeave={() => setMoreCategoriesIsOpen(false)}
                                    >
                                        <Link
                                            href="/news/nauka"
                                            className="text-[13px] md:text-[18px] text-white font-medium py-[5px] px-[10px] hover:bg-[#295480] hover:text-white"
                                        >
                                            Наука
                                        </Link>
                                        <Link
                                            href="/news/kultura"
                                            className="block 7xl:hidden text-[13px] md:text-[18px] text-white font-medium py-[5px] px-[10px] hover:bg-[#295480] hover:text-white"
                                        >
                                            Культура
                                        </Link>
                                        <Link
                                            href="/news/ekonomika"
                                            className="block 6xl:hidden text-[13px] md:text-[18px] text-white font-medium py-[5px] px-[10px] hover:bg-[#295480] hover:text-white"
                                        >
                                            Экономика
                                        </Link>
                                        <Link
                                            href="/news/sport"
                                            className="block 5xl:hidden text-[13px] md:text-[18px] text-white font-medium py-[5px] px-[10px] hover:bg-[#295480] hover:text-white"
                                        >
                                            Спорт
                                        </Link>
                                        <Link
                                            href="/news/proisshestviya"
                                            className="block 4xl:hidden text-[13px] md:text-[18px] text-white font-medium py-[5px] px-[10px] hover:bg-[#295480] hover:text-white"
                                        >
                                            Происшествия
                                        </Link>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-row items-center gap-[10px]">
                        <Link href={"/news/search/"} className="pr-[0px] md:pr-[10px] md:w-[30px] h-[20px] order-1">
                            <Image width={20} height={20} src={SearchIcon} alt="Поиск" />
                        </Link>
                        <div className="hidden ssm:block">
                            <ExchangeRate />
                        </div>
                        <Image
                            src={BurgerIcon}
                            alt=""
                            className="cursor-pointer md:block lg:hidden order-2"
                            onClick={() => setSidebarIsOpen(true)}
                        />
                    </div>
                </nav>
            </header>
            {/* Sidebar */}
            {sidebarIsOpen && (
                <div
                    onClick={() => setSidebarIsOpen(false)}
                    className="fixed top-0 bottom-0 right-0 left-0 bg-[rgba(29,29,29,0.4)] z-[998]"
                />
            )}
            <div
                className="fixed top-0 right-0 w-full md:w-[290px] z-[999] overflow-y-scroll h-screen bg-[#dbdbdb] translate-x-full cursor-pointer"
                style={{
                    scrollbarWidth: "none",
                    transition: "all 0.1s",
                    transform: sidebarIsOpen ? "translateX(-100%)" : "",
                }}
            >
                <div className="flex flex-col gap-[15px] bg-[#343a40] px-[15px] py-[17px] md:py-[25px]">
                    <div className="flex flex-row justify-between items-center">
                        <Link href={"/"}>
                            <h1 className="text-[20px] font-bold">
                                <span className="text-white">RE</span>
                                <span className="text-[#92a8e0]">NEWS</span>
                            </h1>
                        </Link>
                        <Image
                            onClick={() => setSidebarIsOpen(false)}
                            src={CloseIcon}
                            alt=""
                            className="w-[30px] h-[25px] object-scale-down bg-[#5b5757] rounded-[5px]"
                        />
                    </div>
                    <div className="block ssm:hidden">
                        <ExchangeRate />
                    </div>
                </div>
                <div className="">
                    <h3 className="text-[15px] text-[#9a8f8f] font-medium pl-[30px] pt-[8px]">Навигация</h3>
                    <div className="pl-[30px]">
                        <Link
                            href={"/"}
                            className="flex flex-row gap-[17px] items-center py-[15px]"
                            onClick={() => setSidebarIsOpen(false)}
                        >
                            <Image src={homeIcon} alt="" className="w-[22px] object-scale-down" />
                            <span className="text-[16px] font-medium text-[#212529]">Главная</span>
                        </Link>
                        <Link
                            href={"/news/"}
                            className="flex flex-row gap-[17px] items-center py-[15px]"
                            onClick={() => setSidebarIsOpen(false)}
                        >
                            <Image src={newsIcon} alt="" className="w-[22px] object-scale-down" />
                            <span className="text-[16px] font-medium text-[#212529]">Новости</span>
                        </Link>
                        <Link
                            href={"/contacts/"}
                            className="flex flex-row gap-[17px] items-center py-[15px]"
                            onClick={() => setSidebarIsOpen(false)}
                        >
                            <Image src={contactsIcon} alt="" className="w-[22px] object-scale-down" />
                            <span className="text-[16px] font-medium text-[#212529]">Контакты</span>
                        </Link>
                    </div>
                    <h3 className="text-[15px] text-[#9a8f8f] font-medium pl-[30px]">Категории</h3>
                    <ul className="pt-[27px]">
                        {categories &&
                            categories.map((category) => (
                                <div key={category.id} className="py-[10px] pl-[30px] cursor-pointer pr-[14px]">
                                    <li
                                        className="flex flex-row justify-between items-center"
                                        onClick={() => setSubcategoryIsOpenSidebar(category.slug)}
                                    >
                                        <Link
                                            className="text-[18px] text-[#212529] font-medium"
                                            href={`/news/${category.slug}/`}
                                        >
                                            {category.title}
                                        </Link>
                                        <Image
                                            src={subcategoryIsOpenSidebar == category.slug ? blueArrowDown : arrowRight}
                                            alt=""
                                        />
                                    </li>
                                    {subcategoryIsOpenSidebar == category.slug && (
                                        <ul className="vertical_line_blue flex !flex-col mt-[15px]">
                                            {category.subcategories.map((subcategory) => {
                                                if (category.title != "Реклама")
                                                    return (
                                                        <Link
                                                            key={subcategory.id}
                                                            href={`/news/${category.slug}/${subcategory.slug}/`}
                                                            className="flex flex-row items-center gap-[10px] px-[10px] py-[10px]"
                                                        >
                                                            <span
                                                                className="h-[10px] min-w-[10px] rounded-full"
                                                                style={{
                                                                    background:
                                                                        subcategory.slug == subcategoryBy
                                                                            ? "#29547f"
                                                                            : "#a8a0a0",
                                                                }}
                                                            />
                                                            <span className="text-[18px] text-[#212529] font-medium">
                                                                {subcategory.title}
                                                            </span>
                                                        </Link>
                                                    );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
