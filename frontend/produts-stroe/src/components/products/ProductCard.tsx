import { ReactElement } from "react"

type ProductCardProps = {
    name: string,
    price: number,
    productImg: string,
    quatity: number,
    htmlElements?: {
        updateBtn: ReactElement,
        delateBtn: ReactElement,
        showProduct : ReactElement,
    }
}

const ProductCard = ({
    name,
    price,
    productImg,
    quatity = 0,
    htmlElements = {
        updateBtn: <></>,
        delateBtn: <></>,
        showProduct: <></>,
    } }: ProductCardProps) => {

    const { updateBtn, delateBtn, showProduct} = htmlElements

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto flex flex-col sm:flex-row gap-3 bg-white p-4 sm:p-6 relative">
            <div className="w-full sm:w-36 h-36 flex-shrink-0 relative">
                <img className="w-full h-full object-cover" src={`/${productImg}`} alt="productImg" />
                {quatity > 0 && (
                    <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>
                        {quatity}
                    </span>
                )}
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <div className="font-bold text-xl mb-2 text-gray-900">{name}</div>
                    <p className="text-gray-700 text-base">
                        ${price}
                    </p>
                </div>
                <div className="flex gap-3">
                    {updateBtn}
                    {delateBtn}
                    {showProduct}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
