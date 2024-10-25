import { createAsyncThunk } from "@reduxjs/toolkit"
import { createEntity, deleteEntity, getAllEntity, updateEntity } from "../../utils/utils"


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

export const addProduct = createAsyncThunk('products/addProdut', async ({ formData }: { formData: FormData }) => {
    try {
        const { data, response } = await createEntity('http://localhost:8000/products/addProduct', formData)
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

export const editProduct = createAsyncThunk('products/editProdut', async ({ formData, id }: { formData: FormData, id: string }) => {
    try {
        const { data, response } = await updateEntity(`http://localhost:8000/products/editProduct/${id}`, formData)
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
export const deleteProduct = createAsyncThunk('products/deleteProduts', async ({id}: { id: string }) => {
    try {
        const { data, response } = await deleteEntity(`http://localhost:8000/products/deleteProduct/${id}`)
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