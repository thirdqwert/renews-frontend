import { INews, INewsObject, IToken } from "./types"
// // добавть обработчкие ошибок 
//   if (!res.ok) {
//     throw new Error("Failed to fetch news")
//   }
export const getAdmin = async () => {
    console.log(`${process.env.NEXT_PUBLIC_API}/login/`);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/login/`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: `${process.env.ADMIN_LOGIN}`, password: `${process.env.ADMIN_PASSWORD}` })
        }
    )
    const data: IToken = await res.json()
    return data.access
}

export const getCategories = async () => {
    console.log(`${process.env.NEXT_PUBLIC_API}/categories/`);
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories/`)
    const categories = await res.json()
    return categories
}

export const getNews = async (pageCount: number = 1): Promise<INewsObject> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/news?page=${pageCount}`)

    if (!res.ok) {
        throw new Error("Failed to fetch news")
    }
    
    const news = await res.json()

    return news
}

export const getArticles = async (pageCount: number = 1) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/articles?page=${pageCount}`)
    const articles = await res.json()
    return articles
}

export const getNewsAdmin = async (access: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/news/`,
        {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access}`
            }
        }
    )
    const news = await res.json()
    return news
}

export const getArticlesAdmin = async (access: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/articles/`,
        {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access}`
            }
        }
    )
    const articles = await res.json()
    return articles
}
