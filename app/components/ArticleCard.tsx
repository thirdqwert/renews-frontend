import { IArticle } from "../utils/types"

interface IProps {
    article: IArticle
}

export default function ArticleCard({ article }:IProps) {

    return (
        <div className="border border-amber-600 my-2 w-max">
            <h2>{article.title}</h2>
            <p>{article.id}</p>
            <p>{article.created_at}</p>
        </div>
    )
}