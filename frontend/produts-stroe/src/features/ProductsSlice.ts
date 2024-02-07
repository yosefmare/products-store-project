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
    showResponseMessage: boolean;
    loading: boolean;
    error: string | undefined | null; 
    success: string;
}

const initialState: ProdutsState = {
    products: [],
    showResponseMessage: false,
    loading: false,
    error: null,
    success: ''
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
                state.error = null
                state.success = action.payload.message
                state.showResponseMessage = true
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.showResponseMessage = true
            })
    }
})

export default productsSlice.reducer