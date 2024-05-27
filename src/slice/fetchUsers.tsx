import { createAsyncThunk } from '@reduxjs/toolkit';

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export const fetchUsers = createAsyncThunk<User[]>(
    'users/fetchUsers',
    async () => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetch('https://reqres.in/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            return data.data; 
        } catch (error) {
            throw error;
        }
    }
);
