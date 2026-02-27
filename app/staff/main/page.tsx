import Link from "next/link";

export default function Staff() {

    return (
        <div className="w-full h-screen flex flex-row items-center justify-center">
            <div className="flex flex-col gap-[10px] max-w-[500px] w-full">
                <Link className="border border-gray-400 block w-full px-[10px] py-[20px]" href="main/images/">Изображение</Link>
                <Link className="border border-gray-400 block w-full px-[10px] py-[20px]" href="main/audios/">Аудио</Link>
                <Link className="border border-gray-400 block w-full px-[10px] py-[20px]" href="main/news/">Новости</Link>
                <Link className="border border-gray-400 block w-full px-[10px] py-[20px]" href="main/reels/">Reels</Link>
                <Link className="border border-gray-400 block w-full px-[10px] py-[20px]" href="main/youtubevids/">YouTubeVids</Link>
            </div>
        </div>
    )
}