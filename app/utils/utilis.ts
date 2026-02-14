import { IToken } from "./types"

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories/`)
    const categories = await res.json()
    return categories
}

export const getNews = async (pageCount: number = 1) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/news?page=${pageCount}`)
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


export const updateData = async (fetchNew: any, pageCount: any, prevData: any, setData: any, setPageCount: any, setHasMore: any) => {
    try {
        const data = await fetchNew(pageCount)
        setData([...prevData, ...data.results])
        setPageCount(pageCount + 1)
    } catch (error) {
        setHasMore(false)
        console.log(error)
    }
}