import { useState, useEffect, FormEvent } from 'react';
import { getUserDataFromLocalStorage } from '../../handelers/handelers';
import { useAppDispatch } from '../../app/hooks';
import { addProduct } from '../../features/ProductsSlice';

const AddProduct = () => {
    const [adminToken, setAdminToken] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


    const dispatch = useAppDispatch()

    useEffect(() => {
        const adminInfo = getUserDataFromLocalStorage();
        if (adminInfo) {
            setAdminToken(adminInfo.token.token);
        }
    }, []);

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
        
        /*  loop over selected categories 
        to create a new category array 
        and add it to the the form data */

        selectedCategories.map((category) => {
            formData.append('category', category)
        } ) 

        dispatch(addProduct({ productData: formData, headers: { 'Authorization': `Bearer ${adminToken}` } }))
    }

    return (
        <form encType='multipart/form-data' onSubmit={(e) => {
            e.preventDefault();
            handleSubmitForm(e)
        }}>
            <input name='name' className='border-2 border-green-600' type="text" />
            <input name='price' className='border-2 border-green-600' type="number" />
            <input name='quantity' className='border-2 border-green-600' type="number" />
            <input name='file' className='border-2 border-green-600' type="file" />

            <div className='flex flex-col gap-3'>
                <label>
                    <input
                        type="checkbox"
                        value='clothing'
                        onChange={(e) => handleCheckboxChange(e.target.value)}
                        checked={selectedCategories.includes('clothing')}
                    />
                    Clothing
                </label>
                <label>
                    <input
                        type="checkbox"
                        value='phones'
                        onChange={() => handleCheckboxChange('phones')}
                        checked={selectedCategories.includes('phones')}
                    />
                    Phones
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


            <button type='submit'>Add Product</button>
        </form>
    );
};

export default AddProduct;
