import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { getAllProduts } from '../../features/api/productsAsyncThunk.api';
import ProductCard from '../products/ProductCard';
import './style.scss';
import { Link } from 'react-router-dom';

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

    const userItems = products.filter(product => addedToCardItems.includes(product._id));

    const quantities = userItems.map(product => ({
        ...product,
        quantity: addedToCardItems.filter(item => item === product._id).length,
    }));

    const totalPrice = quantities.reduce((total, product) => total + product.price * product.quantity, 0);


    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className='sidebar-content '>
                <div>
                {quantities.map(product => (
                    <ProductCard
                        key={product._id}
                        id={product._id}
                        productImg={product.productImg}
                        name={product.name}
                        price={product.price}
                        quatity={product.quantity}
                    />
                ))}
                </div>
            </div>
            <div className='footer'>
                <Link to={'/customers/createCustomer'} className="btn text-center w-full">Total: ${totalPrice.toFixed(2)}</Link>
            </div>
        </div>
    );
};

export default SideBar;
