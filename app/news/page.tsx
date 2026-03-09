import { getNews } from "../_utils/utilis";
import { INewsObject } from "../_utils/types";
import CardList from "../_components/CardList";
import InfiniteScroll from "../_components/InfiniteScroll";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Все новости Узбекистана",

    description:
        "Читайте все последние новости Узбекистана: политика, спорт, культура и экономика. Обновляется каждый день.",

    openGraph: {
        title: "Все новости — Renews",
        description: "Читайте все последние новости Узбекистана.",
        url: "/news",
        siteName: "Renews",
        images: [
            {
                url: "/images/og-main.jpg",
                width: 1200,
                height: 630,
                alt: "Все новости — Renews",
            },
        ],
        locale: "ru_RU",
        type: "website",
    },

    alternates: {
        canonical: "/news",
    },
};

export const revalidate = 180;

export default async function News() {
    const news: INewsObject = await getNews(1, "", "", { next: { revalidate: 180 } }, undefined);

    if (news.results.length == 0)
        return (
            <>
                <main className="py-[30px] min-h-screen">
                    <div className="container">
                        <h1 className="text-[16px] md:text-[24px] xl:text-[30px] font-bold relative flex flex-row text-[#343a40] vertical_line my-[20px] px-[20px]">
                            Все Новости
                        </h1>
                        <div>Данные не найдены</div>
                    </div>
                </main>
            </>
        );

    return (
        <>
            <main className="py-[30px] min-h-screen">
                <div className="container">
                    <h1 className="text-[16px] md:text-[24px] xl:text-[30px] font-bold relative flex flex-row text-[#343a40] vertical_line my-[20px] px-[20px]">
                        Все Новости
                    </h1>
                    <CardList list={news.results} />
                    <div className="pb-[30px] md:pb-[50px]" />
                    <InfiniteScroll params={{}} />
                </div>
            </main>
        </>
    );
}
