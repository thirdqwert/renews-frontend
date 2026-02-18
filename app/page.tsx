import Link from "next/link"
import CardList from "./components/CardList"
import { INews } from "./utils/types"
import { getDateString, getNewsAdmin } from "./utils/utilis"
import HeadingLine from "./components/HeadingLine"
import Card from "./components/Card"
import Image from "next/image"
import HorizontalCardList from "./components/HorizontalCardList"
import Header from "./components/Header"
import SwipperList from "./components/SwipperList"

export const revalidate = 180

export default async function Home() {
    let data: INews[] | null = null

    data = await getNewsAdmin(process.env.TOKEN)


    const hot_news = data ? data.slice(0, 3) : []
    const news = data ? data.slice(0, 6) : []
    const culture_news = data ? data.filter(item => item.category == "Культура").slice(0, 3) : []
    const politics_news = data ? data.filter(item => item.category == "Политика").slice(0, 6) : []
    const sport_news = data ? data.filter(item => item.category == "Спорт").slice(0, 3) : []
    const popular_news = data ? data.sort((a, b) => b.views - a.views).slice(0, 3) : []


    return (
        <>
            <Header params={{}} />
            <main>
                <div className="container">
                    <section className="pb-[30px]">
                        <SwipperList list={culture_news} />
                    </section>
                    <section className="pb-[70px]">
                        <h2 className="font-bold text-[30px] text-[#222] text-center pb-[30px]">Новости</h2>
                        <CardList list={news} />
                        <Link
                            href={'/news/'}
                            className="text-[20px] px-[17px] py-[7px] mx-auto mt-[60px] block w-max bg-[#343a40] rounded-[20px] text-white">
                            Показать еще
                        </Link>
                    </section>
                    <section className="pb-[70px]">
                        <HeadingLine link="/news/kultura" title="Культура" />
                        <CardList list={culture_news} />
                    </section>
                    <section className="pb-[70px]">
                        <HeadingLine link="/news/politika" title="Политика" />
                        <div>
                            <div className="news__1_parent mb-[30px]">
                                <div className="news__1_div1">
                                    <Link href={`news/detail/${politics_news[0].id}/`}>
                                        <article className="w-full">
                                            <div className="relative rounded-[10px] overflow-hidden">
                                                <span
                                                    className="absolute block top-0 left-0 text-white bg-[#295480] rounded-br-[20px] font-medium text-[17px] px-[32px] py-[4px]">
                                                    {politics_news[0].category}
                                                </span>
                                                <Image
                                                    unoptimized
                                                    width={0}
                                                    height={0}
                                                    className="w-full h-[500px] object-cover"
                                                    src={politics_news[0].preview}
                                                    alt={politics_news[0].title} />
                                                <time
                                                    dateTime={politics_news[0].created_at.split('T')[0]}
                                                    className="absolute bottom-0 right-0 text-white bg-[#295480] rounded-tl-[20px] font-medium text-[17px] px-[10px] py-[4px]">
                                                    {getDateString(politics_news[0].created_at)}
                                                </time>
                                            </div>
                                            <div className="flex flex-col">
                                                <h3
                                                    className="my-[15px] text-[#212529] text-[30px] font-bold leading-normal short_desc">
                                                    {politics_news[0].title}
                                                </h3>
                                                <p className="text-[#495057] text-[17px] font-medium long_desc">{politics_news[0].desc}</p>
                                            </div>
                                        </article>
                                    </Link>
                                </div>
                                <div className="news__1_div2">
                                    <Card item={politics_news[1]} />
                                </div>
                                <div className="news__1_div3">
                                    <Card item={politics_news[2]} />
                                </div>
                            </div>
                            <CardList list={politics_news.slice(3, 7)} />
                        </div>
                    </section>
                    <section>
                        <HeadingLine link="/news/sport" title="Спорт" />
                        <div className="news__2_parent">
                            <div className="div1">
                                <Card item={sport_news[0]} />
                            </div>
                            <div className="news__2_div2">
                                <Card item={sport_news[1]} />
                            </div>
                            <div className="news__2_div3">
                                <Card item={sport_news[2]} />
                            </div>
                        </div>
                    </section>
                    <section className="pt-[100px]">
                        <h2 className="text-[30px] font-bold text-center pb-[50px] text-[#222]">Популярное за неделю</h2>
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
                </div >
            </main >
        </>
    );
}
