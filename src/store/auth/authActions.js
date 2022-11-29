import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '../../services/AuthService'

export const register = createAsyncThunk(
    'user/register',
    async ({ name, email, password, password_confirmation }, { rejectWithValue }) => {
        try {
            const response = await AuthService.register(name, email, password, password_confirmation)
            return response.data.message
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(email, password)
            return response
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const isTokenValid = createAsyncThunk(
    'user/getUserDetails',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await AuthService.isTokenValid()
            return response
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
