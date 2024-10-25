import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEntity } from "../../utils/utils";
import { Headers } from "../../types/globalTypes";

type Entity = {
    endPoint: string,
    formData: FormData,
    headers?: Headers,
}

export const auth = createAsyncThunk('auth/loginAndRegister', async (entity: Entity) => {
    try {
        const { data, response } = await createEntity(entity.endPoint, entity.formData)
        if (data) {
            console.log(data)

            // Save user data to local storage
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);

            return data
        } else {
            throw new Error(response.data.message)
        }
    } catch (error) {
        const fetchError = error instanceof Error ? error : new Error('fetch failed')
        throw fetchError
    }
})




export const setProfileImage = createAsyncThunk('auth/setProfileImage', async (entity: Entity) => {
    try {
        const { data, response } = await createEntity(entity.endPoint, entity.formData)
        if (data) {
            // Save user profileImg to local storage
            let userData = localStorage.getItem('user')
            if (userData) {
                let userDataObj = JSON.parse(userData)
                userDataObj.profileImg = data.user.profileImg
                localStorage.setItem('user', JSON.stringify(userDataObj));
            }
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