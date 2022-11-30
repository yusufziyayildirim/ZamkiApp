import { createSlice } from "@reduxjs/toolkit";
import { register, login, isTokenValid, logout } from "./authActions";

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
        setUserInfo(state, { payload }) {
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

            //login
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
                state.success = null
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userToken = payload[0]
                state.userInfo = payload[1]
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.loading = false
                state.userToken = false
                state.error = payload
            })

            //isTokenValid
            .addCase(isTokenValid.pending, (state) => {
                state.loading = true
                state.error = null
                state.success = null
            })
            .addCase(isTokenValid.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userToken = payload[0]
                state.userInfo = payload[1]
            })
            .addCase(isTokenValid.rejected, (state) => {
                state.loading = false
                state.userToken = false
            })

            //logout
            .addCase(logout.pending, (state) => {
                state.loading = true
                state.error = null
                state.success = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false
                state.userInfo = null
                state.userToken = false
                state.error = null
            })
            .addCase(logout.rejected, (state, { payload }) => {
                state.loading = false
                state.userToken = false
                state.error = payload
            })
    },
})

export const selectIsLoggedIn = (state) => state.auth.userToken;
export const { reset, setUserInfo } = authSlice.actions

export default authSlice.reducer;