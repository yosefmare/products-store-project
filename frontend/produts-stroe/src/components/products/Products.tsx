import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { getAllProduts } from "../../features/api/productsAsyncThunk.api";
import Spinner from "../../ui-models/Spinner";
import ProductCard from "./ProductCard";
import { loadUserDataFromLocalStorage } from "../../features/api/authAsyncThunk.api";

const Products = () => {
  const products = useAppSelector((state) => state.productsSlice);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState({ searchByInputFilled: '', searchBySelectFilled: '' });

  useEffect(() => {
    dispatch(getAllProduts());
  }, [dispatch]);

  const userRole = loadUserDataFromLocalStorage();

  const filteredProducts = products.products.filter(product => {
    const inputMatch = product.name.toLowerCase().includes(searchTerm.searchByInputFilled.toLowerCase());
    const selectMatch = searchTerm.searchBySelectFilled === '' || product.category.some(cat => cat.toLowerCase() === searchTerm.searchBySelectFilled.toLowerCase());
    return inputMatch && selectMatch;
  });

  return (
    <div>
      <Spinner visibility={products.loading} />
      <div className="flex justify-between items-center mx-4 sm:mx-12 mt-10">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm.searchByInputFilled}
          onChange={(e) => setSearchTerm({ ...searchTerm, searchByInputFilled: e.target.value, searchBySelectFilled: '' })}
          className="ml-14 p-2 border border-gray-300 rounded-lg w-1/2 sm:w-1/4 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-800"
        />
        {
          userRole?.role === 'admin' ? (
            <Link to={'/products/AddProduct'} className="btn font-bold text-xl h-12 w-12 rounded-full flex items-center justify-center mx-2 sm:mx-10">+</Link>
          ) : (
            <select
              onChange={(e) => setSearchTerm({ ...searchTerm, searchBySelectFilled: e.target.value, searchByInputFilled: '' })}
              className="ml-14 p-2 border border-gray-300 rounded-lg w-1/2 sm:w-1/4 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-800"
              value={searchTerm.searchBySelectFilled}
            >
              <option value="">Select Category</option>
              <option value="books">Books</option>
              <option value="machines">Machines</option>
              <option value="clothing">Clothing</option>
            </select>
          )
        }
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 sm:px-12 mt-5">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            productImg={product.productImg}
            name={product.name}
            price={product.price}
            quatity={0}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
