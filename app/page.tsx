import Link from "next/link"
import CardList from "./components/CardList"
import { INews } from "./utils/types"
import { getDateString, getNewsAdmin } from "./utils/utilis"
import HeadingLine from "./components/HeadingLine"
import Card from "./components/Card"
import Image from "next/image"
import HorizontalCardList from "./components/HorizontalCardList"
import SwiperList from "./components/SwiperList"
import ReelsSwiper from "./components/ReelsSwiper"
import VidsSwiper from "./components/VidsSwiper"

export const revalidate = 180

export default async function Home() {

    const data: INews[] = await getNewsAdmin(process.env.TOKEN)

    const hot_news = data ? data.slice(0, 3) : []
    const news = data ? data.slice(0, 6) : []
    const culture_news = data ? data.filter(item => item.category == "Культура").slice(0, 4) : []
    const politics_news = data ? data.filter(item => item.category == "Политика").slice(0, 6) : []
    const sport_news = data ? data.filter(item => item.category == "Спорт").slice(0, 4) : []
    const popular_news = data ? data.sort((a, b) => b.views - a.views).slice(0, 3) : []

    if (data?.length == 0
        || hot_news.length == 0
        || news.length == 0
        || culture_news.length == 0
        || politics_news.length < 3
        || sport_news.length < 4
        || popular_news.length == 0) return <div>Нету данных</div>

    return (
        <>
            <main className="py-[30px]">
                <div className="container">
                    <section className="mb-[30px]">
                        <h2 className="text-[16px] md:text-[24px] xl:text-[30px] font-bold relative flex flex-row text-[#343a40] vertical_line my-[20px] px-[20px]">Горячие Новости</h2>
                        <SwiperList list={culture_news} />
                    </section>
                    <section className="pb-[30px] md:pb-[70px]">
                        <h2 className="font-bold     text-[#222] text-center pb-[30px]">Новости</h2>
                        <CardList list={news} />
                        <Link
                            href={'/news/'}
                            className="text-[12px] md:text-[20px] px-[17px] py-[7px] mx-auto mt-[60px] block w-max bg-[#343a40] rounded-[20px] text-white">
                            Показать еще
                        </Link>
                    </section>
                    <section className="pb-[30px]">
                        <HeadingLine link="/news/kultura" title="Культура" />
                        <div className="grid gap-x-[30px] gap-y-[30px] md:gap-y-[50px] grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] grid-rows-[auto]">
                            <Card item={culture_news[0]} />
                            <Card item={culture_news[1]} />
                            <Card item={culture_news[2]} />
                            <div className="xl:block 2xl:hidden">
                                <Card item={culture_news[3]} />
                            </div>

                        </div>
                    </section>
                </div>
                <section className="bg-[#343a40] py-[15px] md:py-[30px] h-[379px] md:h-[450px] xl:h-[468px]">
                    <div className="container" style={{ height: "100%" }}>
                        <Link href={""} className="block border-b border-white pb-[10px] mb-[20px] md:mb-[30px]">
                            <h3 className="font-bold text-[17px] md:text-[30px] text-white leading-tight">Видео</h3>
                        </Link>
                        <VidsSwiper />
                    </div>
                </section>
                <div className="container">
                    <section className="pb-[30px] md:pb-[70px] pt-[30px]">
                        <HeadingLine link="/news/politika" title="Политика" />
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 grid-rows-[auto] gap-x-[20px] gap-y-[25px] mb-[30px]">
                                <div className="sm:col-span-2 xl:row-span-2">
                                    <Link href={`news/detail/${politics_news[0].id}/`}>
                                        <article className="w-full">
                                            <div className="relative rounded-[10px] overflow-hidden mb-[5px] md:mb-[10px]">
                                                <span
                                                    className="absolute block top-0 left-0 text-white bg-[#295480] rounded-br-[20px] font-medium text-[12px] md:text-[17px] px-[32px] py-[4px]">
                                                    {politics_news[0].category}
                                                </span>
                                                <Image
                                                    unoptimized
                                                    width={0}
                                                    height={0}
                                                    className="w-full h-[218px] sm:h-[500px] object-cover"
                                                    src={politics_news[0].preview}
                                                    alt={politics_news[0].title} />
                                                <time
                                                    dateTime={politics_news[0].created_at.split('T')[0]}
                                                    className="absolute bottom-0 right-0 text-white bg-[#295480] rounded-tl-[20px] font-medium text-[12px] md:text-[17px] px-[10px] py-[4px]">
                                                    {getDateString(politics_news[0].created_at)}
                                                </time>
                                            </div>
                                            <div className="flex flex-col">
                                                <h3
                                                    className="mb-[15px] text-[#212529] text-[14px] md:text-[30px] font-bold short_desc">
                                                    {politics_news[0].title}
                                                </h3>
                                                <p className="text-[#495057] text-[13px] md:text-[24px] font-medium long_desc">{politics_news[0].desc}</p>
                                            </div>
                                        </article>
                                    </Link>
                                </div>
                                <div className="xl:col-start-3">
                                    <Card item={politics_news[1]} />
                                </div>
                                <div className="xl:col-start-3 xl:row-start-2">
                                    <Card item={politics_news[2]} />
                                </div>
                            </div>
                            <div className="xl:grid gap-x-[30px] gap-y-[50px] hidden grid-cols-[repeat(auto-fill,minmax(320px,1fr))] grid-rows-[auto] ">
                                {politics_news.slice(3, 7).map((item, index) => (
                                    <Card key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="pb-[30px]">
                        <HeadingLine link="/news/sport" title="Спорт" />
                        <div className="grid sm:grid-cols-3 xl:grid-cols-4 grid-rows-[auto] gap-2">
                            <div className="sm:col-span-2 xl:col-span-1">
                                <Card item={sport_news[0]} />
                            </div>
                            <div className="sm:col-span-1 xl:col-span-2">
                                <Card item={sport_news[1]} />
                            </div>
                            <div className="col-span-1">
                                <Card item={sport_news[2]} />
                            </div>
                            <div className="sm:col-span-2 xl:col-span-1 block xl:hidden">
                                <Card item={sport_news[3]} />
                            </div>
                        </div>
                    </section>
                </div>
                <section className="bg-[#343a40] py-[30px] h-[630px]">
                    <div className="container" style={{ height: "100%" }}>
                        <Link href={""} className="block border-b border-white pb-[10px] mb-[20px]">
                            <h3 className="font-bold text-[30px] text-white leading-tight">Reels</h3>
                        </Link>
                        <ReelsSwiper />
                    </div>
                </section>
                <div className="container">
                    <section className="pt-[50px]">
                        <h2 className="text-[16px] md:text-[24px] xl:text-[30px] font-bold text-center pb-[50px] text-[#222]">Популярное за неделю</h2>
                        <HorizontalCardList list={popular_news} />
                    </section>
                    <section className="pt-[100px]">
                        <HeadingLine title="Лента Новостей" link="/news/" />
                        <HorizontalCardList list={hot_news} />
                        <Link
                            href={'/news/'}
                            className="text-[20px] px-[17px] py-[7px] mx-auto mt-[60px] block w-max bg-[#343a40] rounded-[20px] text-white">
                            Показать еще
                        </Link>
                    </section>
                </div>
            </main>
        </>
    );
}
