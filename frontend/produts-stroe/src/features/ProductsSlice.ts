import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllEntity } from "../utils/utils"

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

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllProduts.fulfilled, (state, action) => {
            state.products = action.payload
        })
    }
})

export default productsSlice.reducer