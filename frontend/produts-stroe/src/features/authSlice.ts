import { createSlice } from "@reduxjs/toolkit";
import { auth, setProfileImage } from "./api/authAsyncThunk.api";

export interface Auth {
    _id: string,
    userName: string,
    email: string,
    password: string,
    role: string,
    profileImg: string,
    token: string,
    customerId: null | string
}

interface AuthState {
    auth: Auth | null;
    loading: boolean;
    error: string | undefined | null;
    success: string;
}

const initialState: AuthState = {
    auth: null,
    loading: false,
    error: null,
    success: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (billder) => {
        billder.addCase(auth.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = '';
        })
            .addCase(auth.fulfilled, (state, action) => {
                const token = action.payload.token;
                const userinfo = action.payload.user
                const userObj = { ...userinfo, token }
                state.auth = userObj
                state.success = action.payload.message
                state.error = null

            })
            .addCase(auth.rejected, (state, action) => {
                state.auth = null
                state.success = ''
                state.error = action.error.message
            })

        billder
            .addCase(setProfileImage.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = '';
            })
            .addCase(setProfileImage.fulfilled, (state, action) => {
                state.loading = false
                const token = state.auth?.token
                const resUserObj = action.payload.user
                const newUserObj = { ...resUserObj, token }
                state.auth = newUserObj
                state.success = action.payload.message
            })
            .addCase(setProfileImage.rejected, (state, action) => {
                state.loading = false
                state.auth = null
                state.success = ''
                state.error = action.error.message
            })
    }
})

export default authSlice.reducer