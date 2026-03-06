import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default async function Contacts() {
    return (
        <>
            <Header />
            <main className="py-[30px] min-h-screen">
                <div className="container">
                    <h1 className="text-[16px] md:text-[24px] xl:text-[30px] font-bold relative flex flex-row text-[#343a40] vertical_line px-[20px]">
                        Контакты
                    </h1>
                    <div className="flex flex-col xl:flex-row gap-[50px] justify-between pt-[40px] xl:pt-[70px]">
                        <ul className="flex flex-col gap-[20px]">
                            <li className="cursor-pointer font-bold text-black text-[15px] md:text-[25px] lg:text-[29px] xl:text-[32px]">
                                Почта:{" "}
                                <span className="font-medium text-[#295480] text-[15px] md:text-[24px] lg:text-[28px] xl:text-[32px]">
                                    renews@gmail.com
                                </span>
                            </li>
                            <li className="cursor-pointer font-bold text-black text-[15px] md:text-[25px] lg:text-[29px] xl:text-[32px]">
                                Телефон редакции:{" "}
                                <span className="font-medium text-[#295480] text-[15px] md:text-[24px] lg:text-[28px] xl:text-[32px]">
                                    {"(99)444 55-44"}
                                </span>
                            </li>
                            <li className="cursor-pointer font-bold text-black text-[15px] md:text-[25px] lg:text-[29px] xl:text-[32px]">
                                Почта:{" "}
                                <span className="font-medium text-[#295480] text-[15px] md:text-[24px] lg:text-[28px] xl:text-[32px]">
                                    renews@gmail.com
                                </span>
                            </li>
                            <li className="cursor-pointer flex flex-col gap-[10px]">
                                <span className="font-bold text-black text-[15px] md:text-[25px] lg:text-[29px] xl:text-[32px]">
                                    По вопросам рекламы:
                                </span>
                                <span className="font-medium text-[#295480] text-[15px] md:text-[24px] lg:text-[28px] xl:text-[32px]">
                                    {"(99)666 77-45"}
                                </span>
                                <span className="font-medium text-[#295480] text-[15px] md:text-[24px] lg:text-[28px] xl:text-[32px]">
                                    {"(99)666 77-45"}
                                </span>
                            </li>
                        </ul>
                        <ul className="flex flex-col gap-[20px]">
                            <li className="cursor-pointer font-bold text-black text-[15px] md:text-[25px] lg:text-[29px] xl:text-[32px]">
                                Telegram:{" "}
                                <Link
                                    href={""}
                                    className="font-medium text-[#295480] text-[15px] md:text-[24px] lg:text-[28px] xl:text-[32px]"
                                >
                                    t.me/renews
                                </Link>
                            </li>
                            <li className="cursor-pointer font-bold text-black text-[15px] md:text-[25px] lg:text-[29px] xl:text-[32px]">
                                Instagram:{" "}
                                <Link
                                    href={""}
                                    className="font-medium text-[#295480] text-[15px] md:text-[24px] lg:text-[28px] xl:text-[32px]"
                                >
                                    instagram.com/renews.com
                                </Link>
                            </li>
                            <li className="cursor-pointer font-bold text-black text-[15px] md:text-[25px] lg:text-[29px] xl:text-[32px]">
                                Facebook:{" "}
                                <Link
                                    href={""}
                                    className="font-medium text-[#295480] text-[15px] md:text-[24px] lg:text-[28px] xl:text-[32px]"
                                >
                                    Facebook.com/renews.com
                                </Link>
                            </li>
                            <li className="cursor-pointer font-bold text-black text-[15px] md:text-[25px] lg:text-[29px] xl:text-[32px]">
                                YouTube::{" "}
                                <Link
                                    href={""}
                                    className="font-medium text-[#295480] text-[15px] md:text-[24px] lg:text-[28px] xl:text-[32px]"
                                >
                                    YouTube.com/renews.com
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
