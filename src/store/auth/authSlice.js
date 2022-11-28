import { createSlice } from "@reduxjs/toolkit";
import { register } from "./authActions";

let initialState = {
    loading: false,
    userInfo: null, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: null, // for monitoring the registration process.
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset(state) {
            state.loading = false
            state.error = false
            state.success = false
        },
        setUserInfo(state, payload) {
            state.userInfo = payload
        },
    },
    extraReducers: (builder) => {
        builder
            //Register
            .addCase(register.pending, (state) => {
                state.loading = true
                state.error = null
                state.success = null
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = payload
            })
            .addCase(register.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

    },
})

export const { reset, setUserInfo } = authSlice.actions

export default authSlice.reducer;