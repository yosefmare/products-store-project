import { createAsyncThunk } from "@reduxjs/toolkit"
import { createEntity, getAllEntity, updateEntity } from "../../utils/utils"
import { AddProductFunctionObject } from "../../types/globalTypes"
import { loadUserDataFromLocalStorage } from "./authAsyncThunk.api"

const userData = loadUserDataFromLocalStorage()


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

export const createCustomer = createAsyncThunk('customer/createCustomer', async ({ entityData }: AddProductFunctionObject) => {
    try {
        const { data, response } = await createEntity('http://localhost:8000/customers/addCustomer', entityData)
        if (data) {
            // insert customerId to user data in database
            await updateEntity(`http://localhost:8000/users/editProfile/${userData?._id}`, {customerId: data.newEntity._id}, { 'Authorization': `Bearer ${userData?.token}` })
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