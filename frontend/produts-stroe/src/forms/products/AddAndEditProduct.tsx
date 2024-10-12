import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { addProduct, editProduct } from '../../features/api/productsAsyncThunk.api';
import Spinner from '../../ui-models/Spinner';
import MessagePopup from '../../ui-models/MessagePopup';
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { submitproductForms } from '../functions/forms.submite';
import { getAllEntity } from '../../utils/utils';
import { Products } from '../../features/ProductsSlice';
import { useParams } from 'react-router-dom';

const AddAndEditProduct = ({ title }: { title: string }) => {
    const [modalDisplay, setModalDisplay] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [product, setProduct] = useState<Products | null>(null);
    const { id } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();
    const productsState = useAppSelector((state) => state.productsSlice);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await getAllEntity(`http://localhost:8000/products/getProduct/${id}`);
                if (data) {
                    setProduct(data);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        getProduct();
    }, [id]);

    // Set initial selected categories when product data changes
    useEffect(() => {
        if (product && product.category?.length > 0) {
            setSelectedCategories(product.category);
        }
    }, [product]);

    useEffect(() => {
        if (productsState.success || productsState.error) {
            setModalDisplay(true);
            setTimeout(() => {
                setModalDisplay(false);
            }, 2000);
        }
    }, [productsState.success, productsState.error]);

    const handleCheckboxChange = (category: string): void => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories((prevCategories) => prevCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories((prevCategories) => [...prevCategories, category]);
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Conditionally submit the form based on whether it's editing or adding a product
        if (id) {
            submitproductForms(e, editProduct, dispatch, selectedCategories, id);
        } else {
            submitproductForms(e, addProduct, dispatch, selectedCategories);
        }
    };

    return (
        <>
            {productsState.error ? (
                <MessagePopup
                    icon={<AiFillCloseCircle className="text-3xl" />}
                    message={productsState.error}
                    visibility={modalDisplay}
                />
            ) : (
                <MessagePopup
                    icon={<AiFillCheckCircle className="text-3xl" />}
                    message={productsState.success ? productsState.success : ''}
                    visibility={modalDisplay}
                />
            )}

            <Spinner visibility={productsState.loading || false} />

            <form
                className="form"
                encType="multipart/form-data"
                onSubmit={handleFormSubmit}
            >
                <h2 className="form-title">{title}</h2>

                {/* Name Input */}
                <div className={modalDisplay ? 'hidden' : 'outline-form-input'}>
                    <input
                        required
                        value={product?.name ?? ''}
                        name="name"
                        placeholder="Product Name"
                        className="input-form"
                        type="text"
                        onChange={(e) => setProduct({ ...product!, name: e.target.value })}
                    />
                    <label htmlFor="name" className="input-form-label">Product Name</label>
                </div>

                {/* Price Input */}
                <div className={modalDisplay ? 'hidden' : 'outline-form-input'}>
                    <input
                        required
                        value={product?.price ?? ''}
                        name="price"
                        placeholder="Enter Price"
                        className="input-form"
                        type="number"
                        onChange={(e) => setProduct({ ...product!, price: parseFloat(e.target.value) })}
                    />
                    <label htmlFor="price" className="input-form-label">Enter Price</label>
                </div>

                {/* Image Selection */}
                <div className="flex flex-col items-center justify-center">
                    <label htmlFor="file-input" className="btn label-input-file py-2 px-4">
                        <span>Choose Image</span>
                        <input
                            id="file-input"
                            className="hidden"
                            name="file"
                            type="file"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setSelectedImage(URL.createObjectURL(e.target.files[0]));
                                }
                            }}
                        />
                    </label>

                    {/* Image Preview */}
                    <div className="block max-w-32 max-h-32 mt-5">
                        <img
                            className="block"
                            src={selectedImage || (product ? `/${product.productImg}` : '')}
                            alt="Preview"
                        />
                    </div>
                </div>

                {/* Categories Selection */}
                <div className="flex items-center justify-center gap-3 mt-10">
                    <label>
                        <input
                            type="checkbox"
                            value="clothing"
                            onChange={() => handleCheckboxChange('clothing')}
                            checked={selectedCategories.includes('clothing')}
                        />
                        Clothing
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="machines"
                            onChange={() => handleCheckboxChange('machines')}
                            checked={selectedCategories.includes('machines')}
                        />
                        Machines
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="books"
                            onChange={() => handleCheckboxChange('books')}
                            checked={selectedCategories.includes('books')}
                        />
                        Books
                    </label>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-center">
                    <button className="btn" type="submit">
                        Save Product
                    </button>
                </div>
            </form>
        </>
    );
};

export default AddAndEditProduct;
