import Image from "next/image"
import { INews } from "../utils/types"
import { getDateString } from "../utils/utilis"
import Link from "next/link"

interface IProps {
    item: INews
}


export default function Card({ item }: IProps) {

    return (
        <Link href={`/news/detail/${item.id}/`}>
            <article className="w-full">
                <div className="relative rounded-[10px] overflow-hidden mb-[10px]">
                    <span
                        className="absolute block top-0 left-0 text-white bg-[#295480] rounded-br-[20px] font-medium text-[17px] px-[32px] py-[4px]">
                        {item.category}
                    </span>
                    <Image unoptimized width={0} height={0} className="w-full h-[218px] object-cover" src={item.preview} alt={item.short_title} />
                    <time
                        dateTime={item.created_at.split('T')[0]}
                        className="absolute bottom-0 right-0 text-white bg-[#295480] rounded-tl-[20px] font-medium text-[17px] px-[10px] py-[4px]">
                        {getDateString(item.created_at)}
                    </time>
                </div>
                <div className="flex flex-col">
                    <h3 className="mb-[7px] text-[#212529] text-[20px] font-bold leading-normal short_title">{item.title}</h3>
                    <p className="text-[#495057] text-[17px] font-medium short_desc">{item.desc}</p>
                </div>
            </article>
        </Link>

    )
}