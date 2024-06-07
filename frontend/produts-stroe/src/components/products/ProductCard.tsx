import { Link } from "react-router-dom"



type ProductCardProps = {
    id: string
    name: string,
    price: number,
    productImg: string,
}

const ProductCard = ({ name, price, productImg, id }: ProductCardProps) => {


    return (
<div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto flex flex-col sm:flex-row gap-3 bg-white p-4 sm:p-6">
    <div className="w-full sm:w-36 h-36 flex-shrink-0">
        <img className="w-full h-full object-cover" src={productImg} alt="productImg" />
    </div>
    <div className="flex flex-col justify-between">
        <div>
            <div className="font-bold text-xl mb-2 text-gray-900">{name}</div>
            <p className="text-gray-700 text-base">
                ${price}
            </p>
        </div>
        <Link to={`/product/${id}`} className="mt-4 sm:mt-0 self-start sm:self-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Show Product</Link>
    </div>
</div>  
    )
}

export default ProductCard
