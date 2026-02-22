import Image from "next/image"
import { getDateString, getNews, getNewsDetail } from "@/app/utils/utilis"
import { INews, INewsObject } from "@/app/utils/types"
import Link from "next/link"
import BackButton from "@/app/components/BackButton"
import HeadingLine from "@/app/components/HeadingLine"
import HorizontalCardList from "@/app/components/HorizontalCardList"

export const revalidate = 180

interface IProps {
    params: {
        id: number
    }
}

export default async function NewsDetail({ params }: IProps) {
    const { id } = await params


    const footer_news: INewsObject = await getNews(1, '', '', { next: { revalidate: 180 } })
    const news: INews = await getNewsDetail(id, { next: { revalidate: 180 } })
    return (
        <main className="py-[70px]">
            <div className="container">
                <article className="pb-[200px]">
                    <BackButton />
                    <div className="flex flex-row gap-[20px]">
                        <Link href={`/news/${news.categery_slug}`}><span className="text-[24px] text-[#295480] font-medium">{news.category}</span></Link>
                        <time
                            dateTime={news.created_at.split('T')[0]}
                            className="text-[#6c757d] text-[24px] font-medium">
                            {getDateString(news.created_at)}
                        </time>
                    </div>
                    <h2
                        className="text-[32px] text-[#212529] font-bold my-[20px] px-[20px] leading-normal vertical_line">
                        {news.title}
                    </h2>
                    <Image
                        unoptimized
                        width={0}
                        height={0}
                        src={news.preview}
                        alt={news.short_title}
                        className="w-full h-[600px] rounded-[20px] object-cover mb-[30px]"
                    />
                    <p className="text-[25px] text-[#495057] font-medium">{news.desc}</p>
                    <div dangerouslySetInnerHTML={{ __html: news.content }} />
                </article>
                <HeadingLine title="Лента новостей" link="/news/" />
                <HorizontalCardList list={footer_news.results.slice(0,3)} />
            </div>
        </main>
    )
}