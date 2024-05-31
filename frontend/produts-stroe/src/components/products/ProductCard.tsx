import { Link } from "react-router-dom"



type ProductCardProps = {
    id: string
    name: string,
    price: number,
    productImg: string,
}

const ProductCard = ({ name, price, productImg, id }: ProductCardProps) => {


    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg flex mx-10 gap-3">
            <div className=" w-36 h-36">
                <img className="w-full" src={productImg} alt="productImg" />
            </div>
            <div className="px-6 py-4 flex flex-col">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base">
                    ${price}
                </p>
                <Link to={`/product/${id}`} className="btn py-1">show product</Link>
            </div>
        </div>
    )
}

export default ProductCard
