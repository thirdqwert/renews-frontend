import { ICategory } from "@/app/_utils/types";
import { getCategories, getNews } from "@/app/_utils/utilis";
import CardList from "@/app/_components/CardList";
import CatSub from "@/app/_components/CatSub";
import InfiniteScroll from "@/app/_components/InfiniteScroll";
import { Metadata } from "next";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

interface IProps {
    params: {
        category: string;
        subcategory: string;
    };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const { category, subcategory } = await params;
    const categories: ICategory[] = await getCategories({
        next: { revalidate: 60 },
    });
    const currentCategory = categories.find((item) => item.slug == category);
    const currentSubcategory =
        currentCategory && currentCategory.subcategories.find((item) => item.slug == subcategory);
    const subcategoryName = currentSubcategory?.title;
    return {
        title: `${subcategoryName} — Новости Узбекистана`,
        description: `Читайте последние новости раздела "${subcategoryName}" на Renews. Актуальные события Узбекистана и мира.`,

        openGraph: {
            title: `${subcategoryName} — Renews`,
            description: `Последние новости раздела "${subcategoryName}".`,
            url: `/news/${currentSubcategory?.slug}`,
            siteName: "Renews",
            images: [{ url: "/images/og-main.jpg" }],
            locale: "ru_RU",
            type: "website",
        },

        alternates: {
            canonical: `/news/${currentCategory?.slug}`,
        },
    };
}

export const revalidate = 60;

export default async function NewsSubcategory({ params }: IProps) {
    const { category, subcategory } = await params;
    const [news, categories] = await Promise.all([
        getNews(1, category, subcategory, { next: { revalidate: 60 } }, undefined),
        getCategories({ next: { revalidate: 60 } }),
    ]);

    if (news.results.length == 0)
        return (
            <>
                <Header />
                <main className="py-[30px] min-h-screen">
                    <div className="max-w-[1760px] w-full mx-auto px-[15px] flex flex-col lg:flex-row gap-[32px]">
                        <CatSub
                            categories={categories}
                            params={{
                                categoryBy: category,
                                subcategoryBy: subcategory,
                            }}
                        />
                    </div>
                </main>
                <Footer />
            </>
        );
    return (
        <>
            <Header />
            <main className="py-[30px] min-h-screen">
                <div className="max-w-[1760px] w-full mx-auto px-[15px] flex flex-col lg:flex-row gap-[32px]">
                    <CatSub
                        categories={categories}
                        params={{
                            categoryBy: category,
                            subcategoryBy: subcategory,
                        }}
                    />
                    <div className="flex flex-col">
                        <CardList list={news.results} />
                        <div className="pb-[30px] md:pb-[50px]" />
                        <InfiniteScroll
                            params={{
                                category: category,
                                subcategory: subcategory,
                            }}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
