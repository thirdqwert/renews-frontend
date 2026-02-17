import { INews } from "../utils/types";
import HorizontalCard from "./HorizontalCard";

interface IProps {
    list: INews[]
}

export default function HorizontalCardList({ list }: IProps) {

    return (
        <div className="flex flex-col gap-[30px]">
            {list && list.map(item => (
                <HorizontalCard key={item.id} item={item} />
            ))}
        </div>
    )
}