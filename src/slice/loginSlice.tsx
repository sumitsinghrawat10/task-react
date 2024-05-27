import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ApiError {
    message: string;
}

interface LoginState {
    email: string;
    password: string;
    loading: boolean;
    error: ApiError | null;
}

const initialState: LoginState = {
    email: '',
    password: '',
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'login/loginUser',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://reqres.in/api/login', { email, password });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const apiError: ApiError = {
                    message: error.response.data.error || 'An unknown error occurred',
                };
                return rejectWithValue(apiError);
            } else {
                const apiError: ApiError = {
                    message: 'An unknown error occurred',
                };
                return rejectWithValue(apiError);
            }
        }
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        resetForm: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.email = '';
                state.password = '';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as ApiError;
            });
    },
});

export const { setEmail, setPassword, resetForm } = loginSlice.actions;
export default loginSlice.reducer;
