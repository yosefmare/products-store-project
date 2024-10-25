import { createAsyncThunk } from '@reduxjs/toolkit';
import { createEntity, getAllEntity } from '../../utils/utils';
import { Products } from '../ProductsSlice';


export const createPerchas = createAsyncThunk('perchases/createPerchas', async (dataOject: { customerId: string, products: Products[] }) => {
    try {
        const { data, response } = await createEntity('http://localhost:8000/purchases/addPurchases', dataOject)
        if (data) {
            console.log(data);
            return data
        } else {
            throw new Error(response.data.message)
        }
    } catch (error) {
        const fetchError = error instanceof Error ? error : new Error('fetch failed')
        throw fetchError
    }
})
export const getPurchase = createAsyncThunk('perchases/getPerchas', async () => {
    try {
        const { data, response } = await getAllEntity(`http://localhost:8000/purchases/getPurchase/670f1bb44e21ffacfdf4fc82`)
        if (data) {
            console.log(data);
            return data
        } else {
            throw new Error(response.data.message)
        }
    } catch (error) {
        const fetchError = error instanceof Error ? error : new Error('fetch failed')
        throw fetchError
    }
})