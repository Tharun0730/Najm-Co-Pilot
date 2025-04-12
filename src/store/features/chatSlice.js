import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBotResponse = createAsyncThunk(
  'chat/fetchBotResponse',
  async (userInput) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userInput,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const textResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 
      "⚠️ Sorry, I didn’t get that.";

    return {
      user: userInput,
      bot: { response: textResponse },
    };
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [
      { type: 'bot', content: '👋 Hello! Ask me anything and I’ll give you a smart reply!' },
    ],
    status: 'idle',
    error: null,
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({ type: 'user', content: action.payload });
      localStorage.setItem('chatMessages', JSON.stringify(state.messages));  // Save to localStorage
    },
    loadMessages: (state, action) => {
      state.messages = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [
        { type: 'bot', content: '👋 Hello! Ask me anything and I’ll give you a smart reply!' },
      ];
      localStorage.setItem('chatMessages', JSON.stringify(state.messages));  // Clear localStorage as well
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBotResponse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBotResponse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { bot } = action.payload;
        state.messages.push({
          type: 'bot',
          content: bot.response,
        });
        localStorage.setItem('chatMessages', JSON.stringify(state.messages));  // Save to localStorage
      })
      .addCase(fetchBotResponse.rejected, (state) => {
        state.status = 'failed';
        state.messages.push({
          type: 'bot',
          content: "❌ Sorry, something went wrong with the response.",
        });
        localStorage.setItem('chatMessages', JSON.stringify(state.messages));  // Save to localStorage
      });
  },
});

export const { addUserMessage, loadMessages, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
