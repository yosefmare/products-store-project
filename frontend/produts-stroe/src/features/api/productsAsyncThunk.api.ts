import { createAsyncThunk } from "@reduxjs/toolkit"
import { createEntity, getAllEntity } from "../../utils/utils"
import { userData } from "./customersAsyncThunk.api";


export const getAllProduts = createAsyncThunk('products/getAllProduts', async () => {
    try {
        const { data, response } = await getAllEntity('http://localhost:8000/products/getAllProducts')
    if (data) {
        console.log(data);
        return data
    } else {
        throw new Error(response.data.message)
    }
    } catch (error) {
        const fetchError = error instanceof Error ? error : new Error('fetch failed')
        throw fetchError
    }
})

export const addProduct = createAsyncThunk('products/addProduts', async ({ formData }: {formData: FormData}) => {
    try {
        const { data, response } = await createEntity('http://localhost:8000/products/addProduct', formData, { 'Authorization': `Bearer ${userData?.token}` })
        if (data) {
            console.log(data);
            return data
        } else {
            throw new Error(response.data.message)
        }
    } catch (error) {
        const fetchError = error instanceof Error ? error : new Error('fetch failed')
        throw fetchError
    }
})