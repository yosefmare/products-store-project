
type ProductCardProps = {
    name: string,
    price: number
    productImg: string,
}

const ProductCard = ({ name, price, productImg }: ProductCardProps) => {
    return (
        <div className="mx-10 grid grid-rows-3 gap-4 max-h-96 max-w-96 bg-emerald-400">
            <div>
                <img src={productImg} alt="product-img" />
            </div>
            <div>
                <h1>{name}</h1>
                <h2>{price}</h2>
            </div>
            <div>
                <button>
                    +
                </button>
                <span>Counter</span>
                <button>
                    -
                </button>
            </div>
        </div>
    )
}

export default ProductCard
