import type { MetadataRoute } from "next";
import { getNewsAdmin } from "./_utils/utilis";
import { INews, INewsObject } from "./_utils/types";

export const revalidate = 3600

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${BASE_URL}/news`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/search`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/contacts`,
            lastModified: new Date(),
            changeFrequency: "never",
            priority: 0.5,
        },
    ];
    try {
        const news: INews[] = await getNewsAdmin();
        const dynamicPages: MetadataRoute.Sitemap = news.map((item) => ({
            url: `${BASE_URL}/news/detail/${item.id}`,
            lastModified: new Date(item.created_at),
            images: [item.preview],
            changeFrequency: "monthly",
            priority: 0.8,
        }));
        return [...staticPages, ...dynamicPages];
    } catch (error) {
        console.error("Sitemap: не удалось получить новости", error);
        return staticPages;
    }
}
