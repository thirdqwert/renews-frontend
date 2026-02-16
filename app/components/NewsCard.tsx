import Image from "next/image"
import { INews } from "../utils/types"


interface IProps {
    news: INews
}

export default function NewsCard({ news }:IProps) {

    return (
        <div className="border border-amber-600 my-2 w-max">
            <Image width={100} height={100} src={news.preview} alt=""/>
            <h2>{news.title}</h2>
            <p>{news.id}</p>
            <p>{news.created_at}</p>
        </div>
    )
}