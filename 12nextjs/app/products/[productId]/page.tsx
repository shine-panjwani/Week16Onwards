import axios from "axios"

export default async function Product({ params }: {
    params: {
        productId: string
    }
}) {
    const { productId } = await params;
    const products = await axios.get(`https://dummyjson.com/products/${productId}`)
    const data = products.data
    const {
        id,
        title,
        description,
        category,
        price,
        discountPercentage,
        rating,
        stock,
        tags,
        brand,
        sku,
        weight,
        dimensions: { width, height, depth },
        warrantyInformation,
        shippingInformation,
        availabilityStatus,
        reviews,
        returnPolicy,
        minimumOrderQuantity,
        meta: { createdAt, updatedAt, barcode, qrCode },
        images,
        thumbnail,
    } = data;
    return <div key={id}>
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
            <div className="flex gap-4">
                <img
                    src={images}
                    alt={title}
                    className="w-32 h-32 object-cover rounded"
                />
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <p className="text-gray-500 text-sm">{sku}</p>
                    <p className="text-green-600 font-semibold">{availabilityStatus}</p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-xl font-semibold text-black">${price}</p>
                <p className="text-red-500">Discount: {discountPercentage}%</p>
                <p className="text-yellow-500">Rating:{rating} / 5</p>
            </div>

            {/* Description */}
            <div>
                <h3 className="text-lg font-medium mb-2">Description:</h3>
                <p className="text-gray-700"> {description}</p>
            </div>

            {/* Category & Tags */}
            <div className="space-y-1">
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Brand:</strong> {brand}</p>
                {/* <p><strong>Tags:</strong>{tags}</p> */}
            </div>

            {/* Stock and Order Info */}
            <div className="grid grid-cols-2 gap-4">
                <p><strong>Stock:</strong> {stock}</p>
                <p><strong>Min Order Qty:</strong> {minimumOrderQuantity}</p>
                <p><strong>Weight:</strong> {weight}</p>
                <p><strong>Warranty:</strong> {warrantyInformation} week warranty</p>
            </div>

            {/* Dimensions */}
            <div>
                <h3 className="text-lg font-medium mb-2">Dimensions (W × H × D):</h3>
                <p>{width} × {height} × {depth}</p>
            </div>

            {/* Shipping & Return */}
            <div className="space-y-1">
                <p><strong>Shipping:</strong> {shippingInformation}</p>
                <p><strong>Return Policy:</strong> {returnPolicy}</p>
            </div>


            {/* Meta Info */}
            <div className="text-sm text-gray-500">
                <p><strong>Created:</strong> {createdAt}</p>
                <p><strong>Updated:</strong>{updatedAt}</p>
                <p><strong>Barcode:</strong> {barcode}</p>
                <p><strong>QR Code:</strong></p>
                <img
                    src={qrCode}
                    alt="QR Code"
                    className="w-24 h-24 mt-2"
                />
            </div>
        </div>

    </div>
}