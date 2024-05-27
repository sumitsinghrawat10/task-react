import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ApiError {
    message: string;
}

interface SignUpState {
    email: string;
    password: string;
    loading: boolean;
    error: ApiError | null;
}

const initialState: SignUpState = {
    email: '',
    password: '',
    loading: false,
    error: null,
};

export const signUpUser = createAsyncThunk(
    'signUp/signUpUser',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://reqres.in/api/register', { email, password });
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

const signUpSlice = createSlice({
    name: 'signUp',
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
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.email = '';
                state.password = '';
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as ApiError;
            });
    },
});




export const { setEmail, setPassword, resetForm } = signUpSlice.actions;
export default signUpSlice.reducer;
