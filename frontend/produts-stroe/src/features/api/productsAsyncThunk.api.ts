import { createAsyncThunk } from "@reduxjs/toolkit"
import { createEntity, getAllEntity } from "../../utils/utils"
import { AddProductFunctionObject } from "../../types/globalTypes"

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

export const addProduct = createAsyncThunk('products/addProduts', async ({ productData, headers }: AddProductFunctionObject) => {
    try {
        const { data, response } = await createEntity('http://localhost:8000/products/addProduct', productData, headers)
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