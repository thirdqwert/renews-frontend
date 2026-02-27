import { INews } from "../utils/types"
import { getDateString } from "../utils/utilis"
import Image from "next/image"
import Link from "next/link"

interface IProps {
    item: INews
}
export default function HorizontalCard({ item }: IProps) {

    return (
        <Link href={`/news/detail/${item.id}/`}>
            <article className="flex flex-col lg:flex-row gap-[15px] lg:gap-[30px]">
                <Image unoptimized width={0} height={0} src={item.preview} alt={item.short_title} className="h-[215px] md:h-[300px] lg:h-[270px] w-full lg:w-1/2 object-cover rounded-[20px]" />
                <div className="flex flex-col justify-between lg:w-1/2 gap-[15px]">
                    <div className="flex flex-col gap-[15px] lg:gap-[22px]">
                        <h3 className="text-[14px] md:text-[24px] lg:text-[20px] xl:text-[26px] font-bold text-[#212529] short_title">{item.title}</h3>
                        <p className="text-[#495057] text-[13px] md:text-[20px] font-medium short_desc">{item.desc}</p>
                    </div>
                    <div className="flex flex-row justify-between items-end">
                        <span className="block text-[12px] md:text-[20px] text-[#295480] font-medium">{item.category}</span>
                        <time dateTime={item.created_at.split('T')[0]} className="text-[#212529] text-[12px] md:text-[20px] font-medium">{getDateString(item.created_at)}</time>
                    </div>
                </div>
            </article>
        </Link>
    )
}