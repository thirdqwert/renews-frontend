import Image from "next/image";
import Arrow from "../../public/images/Arrow 10.svg"
import Link from "next/link";

interface IProps {
    link: string,
    title: string
}

export default function HeadingLine({ link, title }: IProps) {
    return (
        <div className="flex flex-row items-end justify-between border-b border-b-[#343a40] mb-[40px]">
            <h2 className="font-bold text-[30px] text-[#222]">{title}</h2>
            {/* ДОбавь верную ссылку в категорию */}
            <Link href={link} className="flex flex-row items-center gap-[5px]">
                <p className="text-[20px] font-bold text-[#3c4879]">Все новости раздела</p>
                <Image height={15} width={9} src={Arrow} alt=">" />
            </Link>
        </div>

    )
}