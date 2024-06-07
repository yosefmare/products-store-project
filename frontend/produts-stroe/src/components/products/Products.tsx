import { Link } from "react-router-dom"
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllProduts } from "../../features/api/productsAsyncThunk.api";
import Spinner from "../../ui-models/Spinner";
import ProductCard from "./ProductCard";

const Products = () => {
  const products = useAppSelector((state) => state.productsSlice)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllProduts())
    console.log(products.products);
  }, []);

  return (
<div>
  <Spinner visibility={products.loading} />
  <div className="mx-4 sm:mx-12 flex justify-end mt-10">
    <Link to={'/products/AddProduct'} className="bg-sky-600 text-white font-bold text-xl h-12 w-12 rounded-full flex items-center justify-center mx-2 sm:mx-10 active:bg-sky-700">+</Link>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 sm:px-12">
    {
      products.products.map((product) => <ProductCard key={product._id} id={product._id} productImg={product.productImg} name={product.name} price={product.price} />)
    }
  </div>
</div>
  )
}

export default Products
