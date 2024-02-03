import { createAsyncThunk } from "@reduxjs/toolkit"
import { createEntity, getAllEntity } from "../../utils/utils"
import { AddProductFunctionObject } from "../../types/globalTypes"

export const getAllProduts = createAsyncThunk('products/getAllProduts', async () => {
    const {data} = await getAllEntity('http://localhost:8000/products/getAllProducts')
    return data
})
export const addProduct = createAsyncThunk('products/addProduts', async ({productData, headers}: AddProductFunctionObject ) => {
    const {data} = await createEntity('http://localhost:8000/products/addProduct', productData, headers)
    console.log(data);
    return data
})