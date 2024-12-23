import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { EmailData } from '@/types/email';

interface EmailState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: EmailState = {
    status: 'idle',
    error: null,
};

export const sendEmail = createAsyncThunk(
    'email/sendEmail',
    async (emailData: EmailData) => {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();
    }
);

const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendEmail.pending, (state : EmailState) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(sendEmail.fulfilled, (state: EmailState) => {
                state.status = 'succeeded';
            })
            .addCase(sendEmail.rejected, (state : EmailState, action: any) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to send email';
            });
    },
});

export const { resetStatus } = emailSlice.actions;
export default emailSlice.reducer;