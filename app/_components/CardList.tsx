import { INews } from "../_utils/types";
import Card from "./Card";

interface IProps {
    list: INews[];
}

export default function CardList({ list }: IProps) {
    return (
        <div className="grid gap-x-[30px] gap-y-[30px] md:gap-y-[50px] grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] grid-rows-[auto]">
            {list && list.map((item, index) => <Card key={item.id} item={item} />)}
        </div>
    );
}
