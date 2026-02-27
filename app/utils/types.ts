interface IPagination {
    count: number,
    next: null | number,
    previous: null | number,
}

export interface ErrorRes {
    statusText: string
}

export interface INews {
    id: number,
    title: string,
    short_title: string,
    desc: string,
    content: string,
    preview: string,
    created_at: string,
    views: number,
    category: string,
    subcategory: string | null,
    categery_slug: string,
    subcategory_slug: string | null
}

export interface INewsObject extends IPagination {
    results: INews[]
}

export interface ISubcategory {
    id: number,
    category: string,
    title: string,
    slug: string
}

export interface ICategory {
    id: number,
    title: string,
    slug: string,
    subcategories: ISubcategory[]
}

export interface IToken {
    access: string
}

export interface IExchange {
    id: number,
    Rate: string,
    Diff: string
}

export interface IReel {
    id: number,
    title: string,
    image: string,
    content: string,
    created_at: string
}

export interface IReelsObject extends IPagination {
    results: IReel[]
}

export interface IVids {
    id: number,
    title: string,
    image: string,
    link: string,
    created_at: string
}

export interface IVidsObject extends IPagination {
    results: IVids[]
}

export interface IImage {
    id: number,
    title: string,
    image: string,
    created_at: string
}

export interface IImageObject extends IPagination {
    results: IImage[]
}

export interface IAudio {
    id: number,
    title: string,
    audio: string,
    created_at: string
}

export interface IAudioObject extends IPagination {
    results: IAudio[]
}

// export interface IArticlesObject {
//     count: number,
//     next: null | number,
//     previous: null | number,
//     results: IArticle[]
// }


// export interface IArticle {
//     id: number,
//     title: string,
//     short_title: string,
//     desc: string,
//     content: string,
//     preview: string,
//     created_at: string,
//     views: number,
//     category: string,
//     subcategory: string | null
// }
