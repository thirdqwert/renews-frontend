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
    subcategory: string | null
}

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

export interface INewsObject {
    count: number,
    next: null | number,
    previous: null | number,
    results: INews[]
}

// export interface IArticlesObject {
//     count: number,
//     next: null | number,
//     previous: null | number,
//     results: IArticle[]
// }

export interface IToken {
    access: string
}