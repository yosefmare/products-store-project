import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { getAllProduts } from '../../features/api/productsAsyncThunk.api';
import ProductCard from '../products/ProductCard';
import './style.scss';

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

    return (
        <div className={`sidebar-content sidebar ${isOpen ? 'open' : ''}`}>
            <div>
                {userItems.map(product => (
                    <ProductCard
                        key={product._id}
                        id={product._id}
                        productImg={product.productImg}
                        name={product.name}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default SideBar;
