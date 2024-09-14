import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEntity } from "../../utils/utils";
import { Headers } from "../../types/globalTypes";
import { Auth } from "../authSlice";

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

export const loadUserDataFromLocalStorage = (): Auth | null => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (user && token) {
        try {
            const parsedUser = JSON.parse(user);
            // Ensure the parsedUser is valid and follows the expected structure
            return { ...parsedUser, token } as Auth;
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return null; // Return null if parsing fails
        }
    }

    return null; // Return null if user or token is missing
};


export const setProfileImage = createAsyncThunk('auth/setProfileImage', async (entity: Entity) => {
    try {
        const { data, response } = await createEntity(entity.endPoint, entity.formData, entity.headers)
        if (data) {

            // Save user data to local storage
            localStorage.setItem('user', JSON.stringify(data.user));
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