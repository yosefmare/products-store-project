import { createSlice } from "@reduxjs/toolkit"
import { addProduct, deleteProduct, editProduct, getAllProduts } from "./api/productsAsyncThunk.api"

export interface Products {
    _id: string,
    name: string,
    price: number
    productImg: string,
    category: string[]
}

interface ProdutsState {
    products: Products[];
    showResponseMessage: boolean;
    loading: boolean | null;
    error: string | undefined | null;
    success: string | null;
}

const initialState: ProdutsState = {
    products: [],
    showResponseMessage: false,
    loading: false,
    error: null,
    success: null,
}


export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = action.payload.message
                state.showResponseMessage = true
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.showResponseMessage = true
            })

            builder
            .addCase(editProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = action.payload.message
                state.showResponseMessage = true
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.showResponseMessage = true
            })
            
            builder
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = action.payload.message
                state.showResponseMessage = true
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.showResponseMessage = true
            })

        builder
            .addCase(getAllProduts.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllProduts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(getAllProduts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default productsSlice.reducer