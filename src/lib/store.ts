import { configureStore } from '@reduxjs/toolkit';
import emailReducer from '@/features/email/emailSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            email: emailReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];