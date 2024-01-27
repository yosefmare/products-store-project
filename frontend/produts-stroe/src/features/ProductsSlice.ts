import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createEntity, getAllEntity } from "../utils/utils"
import { AddProductFunctionObject } from "../types/globalTypes"

interface Products {
    _id: string,
    name: string,
    price: number
    quantity: number
    productImg: string,
    category:string[]
}

interface ProdutsState {
    products: Products[]
}

const initialState: ProdutsState = {
    products: []
}

export const getAllProduts = createAsyncThunk('getAllProduts', async () => {
    const {data} = await getAllEntity('http://localhost:8000/products/getAllProducts')
    return data
})
export const addProduct = createAsyncThunk('addProduts', async ({productData, headers}: AddProductFunctionObject ) => {
    const {data} = await createEntity('http://localhost:8000/products/addProduct', productData, headers)
    console.log(data);
    return data
})

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllProduts.fulfilled, (state, action) => {
            state.products = action.payload
        })
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.products.push(action.payload)
        })
    }
})

export default productsSlice.reducer