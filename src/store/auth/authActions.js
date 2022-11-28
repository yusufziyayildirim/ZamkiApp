import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '../../services/authService'

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

