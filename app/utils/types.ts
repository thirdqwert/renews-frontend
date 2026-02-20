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

export interface INewsObject {
    count: number,
    next: null | number,
    previous: null | number,
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
