import { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { addProduct } from '../../features/api/productsAsyncThunk.api';
import Spinner from '../../ui-models/Spinner';
import MessagePopup from '../../ui-models/MessagePopup';
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";


const AddProduct = () => {
    const [modalDisplay, setModalDisplay] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const productsState = useAppSelector((state) => state.productsSlice)
const authSlice = useAppSelector((state) => state.authSlice) 
    const dispatch = useAppDispatch()


    const handleCheckboxChange = (category: string): void => {
        // Check if the category is already selected
        if (selectedCategories.includes(category)) {
            // If yes, remove it
            setSelectedCategories((prevCategories) => prevCategories.filter((c) => c !== category));
        } else {
            // If not, add it
            setSelectedCategories((prevCategories) => [...prevCategories, category]);
        }
    };

    const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);

        /*loop over selected categories  
        and add it to the the form data */
        selectedCategories.forEach((category) => {
            formData.append('category', category)
        })

        dispatch(addProduct({ productData: formData, headers: { 'Authorization': `Bearer ${authSlice.auth?.token}` } }))
        setModalDisplay(true)
        setTimeout(() => {
            setModalDisplay(false)
        }, 1500)
    }

    return (
        <>
            {productsState.error ?
                <MessagePopup
                    icon={<AiFillCloseCircle
                        className="text-3xl"
                    />}
                    message={productsState.error}
                    visibility={modalDisplay}
                />
                :
                <MessagePopup
                    icon={<AiFillCheckCircle
                        className="text-3xl"
                    />}
                    message={productsState.success}
                    visibility={modalDisplay}
                />
            }

            <Spinner visibility={productsState.loading} />
            <form className='form' encType='multipart/form-data' onSubmit={(e) => {
                e.preventDefault();
                handleSubmitForm(e)
            }}>
                <h2 className="text-2xl font-bold text-center">Add Product</h2>
                <div className={modalDisplay ? 'hidden' : 'outline-form-input'}>
                    <input name='name' placeholder='' className='input-form'
                        type="text" />
                    <label htmlFor="price" className='input-form-label'>Product Name</label>
                </div>

                <div className={modalDisplay ? 'hidden' : 'outline-form-input'}>
                    <input name='price' placeholder='' className='input-form' type="number" />
                    <label htmlFor="price" className='input-form-label'>Enter Price</label>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <label htmlFor="file-input" className="btn label-input-file py-2 px-4">
                        <span>Choose Image</span>
                        <input id="file-input" className='hidden' name="file" type="file" onChange={(e) => {
                            if (e.target.files) {
                                setSelectedImage(URL.createObjectURL(e.target.files[0]))
                            }
                        }} />
                    </label>

                    <div className={`${!selectedImage ? 'hidden' : 'block max-w-32 max-h-32 mt-5'}`}>
                        <img className='block' src={selectedImage} alt="Preview Image" />
                    </div>
                </div>

                <div className='flex items-center justify-center gap-3 mt-10'>
                    <label>
                        <input
                            type="checkbox"
                            value='clothing'
                            onChange={() => handleCheckboxChange('clothing')}
                            checked={selectedCategories.includes('clothing')}
                        />
                        Clothing
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value='phones'
                            onChange={() => handleCheckboxChange('machines')}
                            checked={selectedCategories.includes('machines')}
                        />
                        Machines
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value='books'
                            onChange={() => handleCheckboxChange('books')}
                            checked={selectedCategories.includes('books')}
                        />
                        Books
                    </label>
                </div>

                <div className=' flex items-center justify-center'>
                    <button className='btn' type='submit'>Add Product</button>
                </div>
            </form>
        </>
    );
};

export default AddProduct;
