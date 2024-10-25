import { createAsyncThunk } from "@reduxjs/toolkit"
import { createEntity, getAllEntity, loadUserDataFromLocalStorage, updateEntity } from "../../utils/utils"

export const userData = loadUserDataFromLocalStorage()


export const getAllCustomers = createAsyncThunk('products/getAllCustomers', async () => {
    try {
        const { data, response } = await getAllEntity('http://localhost:8000/customers/getAllCustomers')
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

export const createCustomer = createAsyncThunk('customer/createCustomer', async ({ formData }: {formData: FormData}) => {
    try {
        const { data, response } = await createEntity('http://localhost:8000/customers/addCustomer', formData)
        if (data) {
            // insert customerId to user data in database
            await updateEntity(`http://localhost:8000/users/editProfile/${userData?._id}`, {customerId: data.newEntity._id})
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