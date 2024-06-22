import { MdShoppingCart } from "react-icons/md";
import { useAppSelector } from "../../app/hooks/hooks";

const ShoppingCard = () => {
    const shoppingCardSlice = useAppSelector((state) => state.shoppingCardCounter.itemCount)

    return (
        <div className='ml-4 relative'>
            <MdShoppingCart size={30} />
            <span className={
                shoppingCardSlice.length !== 0 ?
                    'absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'
                    :
                    ''
            }>
                {
                shoppingCardSlice.length === 0
                ?
                ''
                :
                shoppingCardSlice.length
                }
            </span>
        </div>
    );
};

export default ShoppingCard;