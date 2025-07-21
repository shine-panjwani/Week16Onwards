import axios from "axios"
import Link from "next/link"
interface ProductInterface {
    id: number,
    title: string,
    description: string,
    price: number,
    category: string,
    thumbnail: string
}
export default async function Product() {
    const allProducts = await axios.get("https://dummyjson.com/products")
    const products = await allProducts.data.products
    // console.log(products);
    // const {id ,title,description, price,category} = products;
    return (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products.map(
            ({
                id,
                title,
                description,
                thumbnail,
                price,
                category,
            }: ProductInterface) => {
                return (
                    <div
                        key={id}
                        className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={thumbnail}
                            alt={title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 flex flex-col justify-between h-full">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                                <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                                    {description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-500 font-bold italic">{category} </p>
                                    <p className="text-lg font-bold text-green-600">${price}</p>
                                </div>
                                <Link className="bg-green-500  text-white p-2 rounded" href={`/products/${id}`}>View More</Link>
                            </div>
                           
                        </div>
                    </div>
                );
            }
        )}
    </div>
    )
}