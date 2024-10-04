import { createSlice } from "@reduxjs/toolkit"
import { createPerchas } from './api/perchasesAsyncThunk.api';

export interface Perchases {
    _id: string,
    customerId: string,
    procuts: string[]
    date: Date
}

interface PerchasesState {
    perchases: Perchases[];
    loading: boolean | null;
    error: string | undefined | null;
    success: string | null;
}

const initialState: PerchasesState = {
    perchases: [],
    loading: false,
    error: null,
    success: null,
}


export const perchasesSlice = createSlice({
    name: 'products',
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

        // builder
        //     .addCase(getAllProduts.pending, (state) => {
        //         state.loading = true
        //     })
        //     .addCase(getAllProduts.fulfilled, (state, action) => {
        //         state.loading = false
        //         state.perchases = action.payload
        //     })
        //     .addCase(getAllProduts.rejected, (state, action) => {
        //         state.loading = false
        //         state.error = action.error.message
        //     })
    }
})

export default perchasesSlice.reducer