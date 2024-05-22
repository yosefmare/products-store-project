import  productsSlice  from './../features/ProductsSlice';
import  authSlice  from '../features/authSlice';
import { configureStore } from '@reduxjs/toolkit'


export const store = configureStore({
    reducer: {
        productsSlice,
        authSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch