import { createSlice } from "@reduxjs/toolkit";
import { auth } from "./api/authAsyncThunk.api";

interface Auth {
        _id: string,
        userName: string,
        email: string,
        password: string,
        role: string,
        profileImg?: string,
        token: string
    }

interface AuthState {
    auth: Auth[];
    loading: boolean;
    error: string | undefined | null;
    success: string;
}

const initialState: AuthState = {
    auth: [],
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
        })
            .addCase(auth.fulfilled, (state, action) => {
                const token = action.payload.token;
                const userinfo = action.payload.user
                const userObj = {...userinfo, token}
                state.auth = userObj
                state.success = action.payload.message
                state.error = null
                
            })
            .addCase(auth.rejected, (state, action) => {
                state.success = ''
                state.error = action.error.message
            })
    }
})

export default authSlice.reducer