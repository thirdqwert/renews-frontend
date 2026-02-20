import Link from "next/link"
import { getCategories } from "../utils/utilis"

export const revalidate = 180

interface IProps {
    params: {
        categoryBy?: string,
        subcategoryBy?: string
    }
}

export default async function CatSubList({ params }: IProps) {
    const { categoryBy, subcategoryBy } = params
    const categories = await getCategories()

    return (
        <header>
            <div className="flex flex-col gap-[20px]">
                <div >
                    <Link href={`/news/`}><h2 className={categoryBy == undefined ? "red_background" : ""}>Всё</h2></Link>
                </div>
                {categories.map(category => (
                    <div key={category.id}>
                        <Link href={`/news/${category.slug}`}><h2 className={category.slug == categoryBy ? "red_background" : ""}>{category.title}</h2></Link>
                        <div className="flex flex-row gap-[10px]">
                            {category.subcategories.map(subcategory => (
                                <Link
                                    key={subcategory.id}
                                    href={`/news/${category.slug}/${subcategory.slug}/`}
                                    className={"border border-gray-400 py-[3px] px-[10px] " + (subcategory.slug == subcategoryBy ? "red_background" : "")}>
                                    <h3>{subcategory.title}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </header>
    )
}