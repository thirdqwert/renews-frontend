import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/staff",
        },
        sitemap: [
            `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
            `${process.env.NEXT_PUBLIC_SITE_URL}/news-sitemap`,
        ],
        host: process.env.NEXT_PUBLIC_SITE_URL,
    };
}
