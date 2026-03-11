import Image from "next/image";
import mail from "../../public/images/email.svg";
import phone from "../../public/images/phone.svg";
import instagramm from "../../public/images/instagramm.svg";
import telegram from "../../public/images/telegram.svg";
import youtube from "../../public/images/youtube.svg";
import facebook from "../../public/images/facebook.svg";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#343a40] py-[30px]">
            <div className="container">
                <nav className="flex flex-col md:flex-row justify-between gap-[60px] border-y-[2px] border-b-[rgba(168,153,153,0.7)] border-t-white py-[20px] md:py-[30px] px-[20px] md:px-[50px]">
                    <div className="flex flex-col gap-[20px] md:gap-[30px]">
                        <Link href={"/"}>
                            <h3 className="text-[30px] md:text-[36px] font-bold">
                                <span className="text-white">RE</span>
                                <span className="text-[#92a8e0]">NEWS</span>
                            </h3>
                        </Link>
                        <ul className="flex flex-row gap-[20px] md:gap-[50px]">
                            <li>
                                <Link className="text-[16px] md:text-[24px] text-white font-medium" href={"/"}>
                                    Главная
                                </Link>
                            </li>
                            <li>
                                <Link className="text-[16px] md:text-[24px] text-white font-medium" href={"/news/"}>
                                    Новости
                                </Link>
                            </li>
                            <li>
                                <Link className="text-[16px] md:text-[24px] text-white font-medium" href={"/contacts/"}>
                                    Контакты
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-[25px] mx-auto text-[14px] font-medium">
                        <div className="flex flex-row items-center gap-[10px] text-white">
                            <Image src={mail} alt="" />
                            <p>renews@gmail.com</p>
                        </div>
                        <div className="flex flex-row items-center gap-[10px] text-white">
                            <Image src={phone} alt="" />
                            <p>(99)666 77-45</p>
                        </div>
                        <div className="flex flex-row items-center gap-[10px] text-white">
                            <p>Контакты</p>
                            <Link href={""}>
                                <Image src={instagramm} alt="" />
                            </Link>
                            <Link href={""}>
                                <Image src={telegram} alt="" />
                            </Link>
                            <Link href={""}>
                                <Image src={youtube} alt="" />
                            </Link>
                            <Link href={""}>
                                <Image src={facebook} alt="" />
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </footer>
    );
}
