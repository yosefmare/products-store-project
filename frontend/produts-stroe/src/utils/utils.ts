import axios from 'axios';
import { Products } from '../features/ProductsSlice';
import { Auth } from '../features/authSlice';

export const loadUserDataFromLocalStorage = (): Auth | null => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (user && token) {
        try {
            const parsedUser = JSON.parse(user);
            // Ensure the parsedUser is valid and follows the expected structure
            return { ...parsedUser, token } as Auth;
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return null; // Return null if parsing fails
        }
    }
    return null; // Return null if user or token is missing
};

const getHeaders = () => {
    const { token } = loadUserDataFromLocalStorage() ?? { token: null };
    return token ? { 'authorization': `Bearer ${token}` } : {};
};


export const createEntity = async (path: string, info: any): Promise<any> => {
    try {
        const res = await axios.post(
            path,
            info,
            {
                headers: getHeaders(),
            }
        )
        return res
    } catch (err) {
        console.log(err);
        return {
            error: true,
            message: err instanceof Error ? err.message : 'An unknown error occurred',
            data: null
        };
    }
}

export const updateEntity = async (path: string, info: any): Promise<any> => {
    try {
        const res = await axios.patch(
            path,
            info,
            {
                headers: getHeaders(),
            }
        )
        return res
    } catch (err) {
        console.log(err);
        return {
            error: true,
            message: err instanceof Error ? err.message : 'An unknown error occurred',
            data: null
        };
    }
}

export const deleteEntity = async (path: string): Promise<any> => {
    try {
        const res = await axios.delete(
            path,
            {
                headers: getHeaders(),
            }
        )
        return res
    } catch (err) {
        console.log(err);
        return {
            error: true,
            message: err instanceof Error ? err.message : 'An unknown error occurred',
            data: null
        };
    }
}

export const getAllEntity = async (path: string): Promise<any> => {
    try {
        const res = await axios.get(
            path,
            {
                headers: getHeaders(),
            }
        );
        return res
    } catch (err) {
        console.log(err);
        return {
            error: true,
            message: err instanceof Error ? err.message : 'An unknown error occurred',
            data: null
        };
    }
}

export const getSelectedProductsWithQuantities = (shoppingCardSlice: string[], products: Products[]) => {
    const userItems = products.filter(product => shoppingCardSlice.includes(product._id));

    const selectedProducts = userItems.map(product => ({
        ...product,
        quantity: shoppingCardSlice.filter(item => item === product._id).length,
    }));

    return selectedProducts;
};
