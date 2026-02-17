import Image from "next/image"
import { INews } from "../utils/types"
import { getDateString } from "../utils/utilis"
import Link from "next/link"

interface IProps {
    item: INews
}
export default function HorizontalCard({ item }: IProps) {

    return (
        <Link href={`/news/${item.id}/`}>
            <article className="flex flex-row gap-[30px]">
                <Image unoptimized width={0} height={0} src={item.preview} alt={item.short_title} className="h-[270px] w-1/2 object-cover rounded-[20px]" />
                <div className="flex flex-col justify-between w-1/2">
                    <div className="flex flex-col gap-[25px]">
                        <h3 className="text-[26px] font-bold text-[#212529] short_title">{item.title}</h3>
                        <p className="text-[#495057] text-[20px] font-medium short_desc">{item.desc}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span className="block text-[20px] text-[#295480] font-medium">{item.category}</span>
                        <time dateTime={item.created_at.split('T')[0]} className="text-[#212529] text-[20px] font-medium">{getDateString(item.created_at)}</time>
                    </div>
                </div>
            </article>
        </Link>
    )
}