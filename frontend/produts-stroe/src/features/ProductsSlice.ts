import { createSlice } from "@reduxjs/toolkit"
import { addProduct, getAllProduts } from "./api/productsAsyncThunk.api"

interface Products {
    _id: string,
    name: string,
    price: number
    quantity: number
    productImg: string,
    category: string[]
}

interface ProdutsState {
    products: Products[];
    loading: boolean;
    error: null | string;
}

const initialState: ProdutsState = {
    products: [],
    loading: false,
    error: null

}



export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllProduts.fulfilled, (state, action) => {
            state.products = action.payload
        })

        builder
        .addCase(addProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products.push(action.payload)
        })
    }
})

export default productsSlice.reducer