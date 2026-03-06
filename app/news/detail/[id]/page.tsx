import { getDateString, getNews, getNewsDetail } from "@/app/utils/utilis"
import { ErrorRes, INews, INewsObject } from "@/app/utils/types"
import Image from "next/image"
import Link from "next/link"
import BackButton from "@/app/components/BackButton"
import HeadingLine from "@/app/components/ui/HeadingLine"
import HorizontalCardList from "@/app/components/HorizontalCardList"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import DetailContent from "../components/DetailContent"

export const revalidate = 180

interface IProps {
    params: {
        id: string
    }
}

export default async function NewsDetail({ params }: IProps) {
    const { id } = await params
    
    const [footer_news, news] = await Promise.all([
        getNews(1, '', '', { next: { revalidate: 180 } }, undefined),
        getNewsDetail(id, { next: { revalidate: 180 } })
    ]);

    if ("statusText" in news) return (
        <>
            <Header />
            <div>Данные не найдены</div>
        </>
    )

    return (
        <>

            <Header />
            <main className="py-[30px]">
                <div className="container">
                    <article className="pb-[70px] md:pb-[100px] xl:pb-[200px]">
                        <BackButton />
                        <div className="flex flex-row gap-[20px] items-end">
                            <Link href={`/news/${news.categery_slug}`}><span className="text-[11px] md:text-[19px] lg:text-[24px] text-[#295480] font-medium">{news.category}</span></Link>
                            <time
                                dateTime={news.created_at.split('T')[0]}
                                className="text-[11px] text-[#6c757d] md:text-[19px] lg:text-[24px] font-medium">
                                {getDateString(news.created_at)}
                            </time>
                        </div>
                        <h2
                            className="text-[13px] md:text-[22px] lg:text-[32px] text-[#212529] font-bold my-[15px] md:my-[20px] pl-[10px] md:pl-[20px] vertical_line">
                            {news.title}
                        </h2>
                        <Image
                            unoptimized
                            width={0}
                            height={0}
                            src={news.main_image}
                            alt={news.short_title}
                            className="w-full max-h-[600px] h-full rounded-[20px] object-cover mb-[15px] md:mb-[30px]"
                        />
                        <p className="text-[12px] md:text-[20px] lg:text-[25px] text-[#495057] font-medium">{news.desc}</p>
                        <br />
                        <DetailContent content={news.content} />
                    </article>
                    <HeadingLine title="Лента новостей" link="/news/" />
                    <HorizontalCardList list={footer_news.results.slice(0, 3)} />
                </div>
            </main>
            <Footer />
        </>
    )
}