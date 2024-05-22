import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEntity } from "../../utils/utils";

type Entity = {
    endPoint: string,
    formData: FormData
}

export const auth = createAsyncThunk('auth/loginAndRegister', async (entity: Entity) => {
    try {
        const { data, response } = await createEntity(entity.endPoint, entity.formData)
        if (data) {
            console.log(data) 
            return data
        } else {
            throw new Error(response.data.message)
        }
    } catch (error) {
        const fetchError = error instanceof Error ? error : new Error('fetch failed')
        throw fetchError
    }
})