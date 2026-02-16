import { INews } from "../utils/types";
import Card from "./Card";

interface IProps {
    list: INews[]
}

export default function CardList({ list }: IProps) {

    return (

        <div className="grid gap-x-[30px] gap-y-[50px] grid-cols-[repeat(auto-fill,minmax(410px,1fr))] grid-rows-[auto]">
            {list && list.map(item => (
                <Card key={item.id} item={item} />
            ))}
        </div>
    )
}