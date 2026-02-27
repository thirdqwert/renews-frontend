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
            <h3 className="lg:!hidden font-bold text-[30px] text-[#222] mb-[15px] vertical_line px-[20px]">Категории</h3>
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
            <div className="block lg:hidden">
                <SelectUI
                    options={categoriesOption}
                    selectOption={selectCategory}
                    selectedOption={{ value: currentCategory ? currentCategory.slug : "", label: currentCategory ? currentCategory.title : "Всё" }}
                />
            </div>
            {categoryBy && (
                <div className="pt-[15px]">
                    <h4 className="text-[30px] font-bold relative flex flex-row text-[#343a40] vertical_line my-[20px] px-[20px]">Все по теме</h4>
                    <div className="hidden md:flex flex-row flex-wrap gap-[10px]">
                        <Link
                            href={`/news/${categoryBy}/`}
                            className={"block py-[6px] px-[20px] bg-[#343a40] text-white rounded-[20px] " + (subcategoryBy == undefined && "active_button")}
                        >
                            Всё
                        </Link>

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
                    <div className="block md:hidden">
                        {
                            currentCategory && subcategoriesOptions && <SelectUI
                                options={subcategoriesOptions}
                                selectOption={selectSubcategory}
                                selectedOption={{ value: currentSubcategory ? currentSubcategory.slug : "", label: currentSubcategory ? currentSubcategory.title : "Всё" }}
                            />
                        }
                    </div>

                </div>
            )}
            <div className="w-full h-[1px] bg-[#343a40] mt-[15px] mb-[65px]"/>
        </>
    )
}