import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";



export const fetchChatHistory = createAsyncThunk(
    "chat/fetchChatHistory",
    async (chatId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`chathistory`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch chat history");
        }
    }
);

const chatHistorySlice = createSlice({
    name: "chatHistory",
    initialState: {
        messageHistory: [],
        messageHistoryLoader: false,
        messageHistoryError: null,
    },
    reducers: {
        
        addMessage: (state, action) => {
            state.messageHistory.push(action.payload);
        },
        clearChatHistory: (state) => {
            state.messageHistory = [];
            state.messageHistoryError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatHistory.pending, (state) => {
                state.messageHistoryLoader = true;
                state.messageHistoryError = null;
            })
            .addCase(fetchChatHistory.fulfilled, (state, action) => {
                state.messageHistoryLoader = false;
                state.messageHistory = action.payload;
            })
            .addCase(fetchChatHistory.rejected, (state, action) => {
                state.messageHistoryLoader = false;
                state.messageHistoryError = action.payload;
            });
    },
});

export const { addMessage, clearChatHistory } = chatHistorySlice.actions;

export default chatHistorySlice.reducer;
