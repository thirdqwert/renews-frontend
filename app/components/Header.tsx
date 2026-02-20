import Link from "next/link";
import SearchIcon from "../../public/images/search.svg"
import Image from "next/image";
import ExchangeRate from "./ExchangeRate";
export default async function Header() {

    return (
        <header className="px-[50px] py-[30px] bg-[#343a40]">
            <nav className="flex flex-row justify-between items-center">
                <Link href={"/"}>
                    <h1 className="text-[36px] font-bold">
                        <span className="text-white">RE</span><span className="text-[#92a8e0]">NEWS</span>
                    </h1>
                </Link>
                <ul className="flex flex-row gap-[50px]">
                    <li><Link className="text-[24px] text-white font-bold" href={"/"} >Главная</Link></li>
                    <li><Link className="text-[24px] text-white font-bold" href={"/news/"} >Новости</Link></li>
                    <li><Link className="text-[24px] text-white font-bold" href={"/contacts/"} >Контакты</Link></li>
                    <li><Link className="text-[24px] text-white font-bold" href={"/news/"} >Категории</Link></li>            
                </ul>
                <div className="flex flex-row items-center gap-[10px]">
                    <Link href={"/news/search/"} className="pr-[10px] border-r border-white w-[30px] h-[20px]"><Image width={20} height={20} src={SearchIcon} alt="Поиск"/></Link>
                    <ExchangeRate />
                </div>
            </nav>
        </header>
    )
}