import  productsSlice  from './../features/ProductsSlice';
import  authSlice  from '../features/authSlice';
import { configureStore } from '@reduxjs/toolkit'
import shoppingCardCounter  from './reducers/soppingCard.counte.reducer';
import customersSlice from '../features/customersSlice';


export const store = configureStore({
    reducer: {
        productsSlice,
        authSlice,
        shoppingCardCounter,
        customersSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch