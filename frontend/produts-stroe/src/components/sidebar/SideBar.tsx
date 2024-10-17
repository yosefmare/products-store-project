import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { getAllProduts } from '../../features/api/productsAsyncThunk.api';
import ProductCard from '../products/ProductCard';
import './style.scss';
import { Link } from 'react-router-dom';
import { userData } from '../../features/api/customersAsyncThunk.api';
import { createPerchas } from '../../features/api/perchasesAsyncThunk.api';
import { getSelectedProductsWithQuantities } from '../../utils/utils';

interface SideBarProps {
    isOpen: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen }) => {
    const addedToCardItems = useAppSelector((state) => state.shoppingCardCounter.itemCount);
    const products = useAppSelector((state) => state.productsSlice.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllProduts());
    }, [dispatch]);

    const quantities =  getSelectedProductsWithQuantities(addedToCardItems, products)

    const totalPrice = quantities.reduce((total, product) => total + product.price * product.quantity, 0);

    localStorage.setItem('customerProducts', JSON.stringify(quantities))

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className='sidebar-content '>
                <div>
                    {quantities.map(product => (
                        <ProductCard
                            key={product._id}
                            productImg={product.productImg}
                            name={product.name}
                            price={product.price}
                            quatity={product.quantity}
                        />
                    ))}
                </div>
            </div>
            <div className='footer'>
                {
                    userData?.customerId
                        ?
                        <Link onClick={() => {
                            if (userData?.customerId) {
                                dispatch(createPerchas({customerId: userData?.customerId, products: quantities}))

                            }
                        }} to={'/purchase/successOrder'} className="btn text-center w-full">Total: ${totalPrice.toFixed(2)}</Link>
                        :
                        <Link to={'/customers/create'} className="btn text-center w-full">Total: ${totalPrice.toFixed(2)}</Link>
                }
            </div>
        </div>
    );
};

export default SideBar;
