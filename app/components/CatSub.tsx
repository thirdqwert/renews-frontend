"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { ICategory } from "../utils/types"
import { Navigation } from "swiper/modules"
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import arrowDown from "../../public/images/Arrow 10.svg"
import 'swiper/css';
import 'swiper/css/navigation';
import SelectUI from "./ui/SelectUI";


interface IProps {
    categories: ICategory[],
    params: {
        categoryBy?: string | undefined,
        subcategoryBy?: string | undefined
    }
}

export default function CatSub({ categories, params, }: IProps) {
    const { categoryBy, subcategoryBy } = params
    const router = useRouter()
    const pathname = usePathname()
    const news = pathname.split("/")[1]
    const currentCategory = categoryBy && categories.find(category => category.slug == categoryBy)
    const currentSubcategory = currentCategory && subcategoryBy && currentCategory.subcategories.find(subcategory => subcategory.slug == subcategoryBy)
    const categoriesOption = [{ value: "", label: "Всё" }, ...categories.map(category => { return { value: category.slug, label: `${category.title}`, } })]
    const subcategoriesOptions = currentCategory &&  [{ value: "", label: "Всё" }, ...currentCategory.subcategories.map(subcategory => { return { value: subcategory.slug, label: `${subcategory.title}`, } })]


    const selectCategory = (option: { value: string, label: string }) => {
        router.push(`/news/${option.value}`)
    }
    const selectSubcategory = (option: { value: string, label: string }) => {
        router.push(`/news/${categoryBy}/${option.value}`)
    }
    return (
        <>
            {/* <div className="relative px-[50px] hidden md:block">
                <button className="prev p-5 absolute z-10 left-0 rotate-180 top-1/2 -translate-y-1/2 cursor-pointer">
                    <Image src={arrowDown} alt="" />
                </button>
                <button className="next p-5 absolute z-10 right-0 top-1/2 -translate-y-1/2 cursor-pointer">
                    <Image src={arrowDown} alt="" className="text-black" />
                </button>
                <Swiper
                    className="w-full h-full"
                    slidesPerView={4}
                    spaceBetween={20}
                    navigation={{
                        prevEl: '.prev',
                        nextEl: '.next',
                    }}
                    modules={[Navigation]}
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 20 },
                        640: { slidesPerView: 3, spaceBetween: 20 },
                        1024: { slidesPerView: 4, spaceBetween: 20 },
                        1536: { slidesPerView: 5, spaceBetween: 20 },
                    }}
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
            </div> */}
            {categoryBy && (
                <div className="relative max-w-[23.7%] w-full">
                    <div className="hidden md:flex flex-col w-full flex-wrap gap-[10px] top-0 left-0">
                        {currentCategory && currentCategory.subcategories.map(subcategory => (
                            <Link
                                href={`/news/${currentCategory.slug}/${subcategory.slug}`}
                                key={subcategory.id}
                                className={"block py-[6px] px-[20px] bg-[#343a40] text-white rounded-[20px] " + (subcategoryBy == subcategory.slug && "active_button")}
                            >
                                {subcategory.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}