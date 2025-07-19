import axios from "axios"
export default async function Blogs() {
    const products = await axios.get("https://dummyjson.com/products");
    const productData = products.data.products
    // console.log(productData);
    console.log(productData);
    

    return <div>
        Learn Next
        <div className="flex flex-wrap">

            {productData.map((x: any) => {
                return <div key={x.id}>{<Product imgUrl={x.images[0]} title={x.title} price={x.price} brand={x.brand} description={x.description} />}</div>
            })}
        </div>
    </div>
}
interface ProductInterface {
    title: string,
    price: number,
    brand: string,
    description: string,
    imgUrl: string
}
function Product({ title, description, price, brand, imgUrl }: ProductInterface) {
    return<>
    <div className="bg-white shadow-lg rounded-xl p-6 m-4 border border-gray-200 max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-600 mb-4">{description}</p>

        {/* Styled Image */}
        <div className="mb-4">
            <img
                src={imgUrl}
                alt={title}
                className="w-full h-60 object-cover rounded-lg border border-gray-300 shadow-sm"
            />
        </div>

        <h2 className="text-xl font-semibold text-green-600 mb-2">Price: ₹{price}</h2>
        <h3 className="text-lg font-medium text-blue-500">{brand}</h3>
    </div>
</>

}