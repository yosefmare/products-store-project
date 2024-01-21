import  productsSlice  from './../features/ProductsSlice';
import { configureStore } from '@reduxjs/toolkit'


export const store = configureStore({
    reducer: {
        productsSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch