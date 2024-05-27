import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from '../slice/signUpSlice';
import loginReducer from '../slice/loginSlice';
import userReducer from '../slice/userSlice';

const store = configureStore({
    reducer: {
        signUp: signUpReducer,
        login: loginReducer,
        users: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


