interface IProps {
    page: number;
    setPage: (number: number) => void;
}

export default function Pagination({ page, setPage }: IProps) {
    return (
        <>
            <div className="flex flex-row gap-[10px]">
                {page > 1 && (
                    <span
                        onClick={() => setPage(page - 1)}
                        className="block py-[5px] px-[10px]  cursor-pointer text-white bg-[#29547F]"
                    >
                        Назад
                    </span>
                )}
                <span
                    onClick={() => setPage(page + 1)}
                    className="block py-[5px] px-[10px]  cursor-pointer text-white bg-[#29547F]"
                >
                    Вперед
                </span>
            </div>
        </>
    );
}
