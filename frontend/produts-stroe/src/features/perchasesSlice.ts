import { createSlice } from "@reduxjs/toolkit"
import { createPerchas, getPurchase } from './api/perchasesAsyncThunk.api';
import { Customers } from "./customersSlice";

export interface Perchase {
    _id: string,
    customerId: Customers,
    products: string[]
    date: Date | null
}

interface PerchasesState {
    perchase: Perchase;
    loading: boolean | null;
    error: string | undefined | null;
    success: string | null;
}

const initialState: PerchasesState = {
    perchase: {
        _id: '',
        customerId: {
            _id: '',
            firstName: '',
            lastName: '',
            city: '',
            purchases: []
        },
        products: [],
        date: null
    },
    loading: false,
    error: null,
    success: null,
}


export const perchasesSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder
            .addCase(createPerchas.pending, (state) => {
                state.loading = true
            })
            .addCase(createPerchas.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = action.payload.message
            })
            .addCase(createPerchas.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

        builder
            .addCase(getPurchase.pending, (state) => {
                state.loading = true
            })
            .addCase(getPurchase.fulfilled, (state, action) => {
                state.loading = false
                state.perchase = action.payload
            })
            .addCase(getPurchase.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default perchasesSlice.reducer