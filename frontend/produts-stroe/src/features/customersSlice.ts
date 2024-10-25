import { createSlice } from "@reduxjs/toolkit"
import { createCustomer, getAllCustomers } from "./api/customersAsyncThunk.api"
import { loadUserDataFromLocalStorage } from "../utils/utils";

export interface Customers {
    _id: string,
    firstName: string,
    lastName: string,
    city: string,
    purchases: string[]
}

interface CustomersState {
    customers: Customers[];
    showResponseMessage: boolean;
    loading: boolean;
    error: string | undefined | null;
    success: string;
}

const initialState: CustomersState = {
    customers: [],
    showResponseMessage: false,
    loading: false,
    error: null,
    success: ''
}


export const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder
            .addCase(createCustomer.pending, (state) => {
                state.loading = true
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                let userData = loadUserDataFromLocalStorage();
                if (userData) {
                    const customerId = action.payload.newEntity._id;
                    userData = { ...userData, customerId };
                    localStorage.setItem('user', JSON.stringify(userData));
                }

                state.success = action.payload.message
                state.showResponseMessage = true
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.showResponseMessage = true
            })

        builder
            .addCase(getAllCustomers.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.loading = false
                state.customers = action.payload
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default customersSlice.reducer