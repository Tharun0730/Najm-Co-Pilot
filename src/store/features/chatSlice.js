import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBotResponse = createAsyncThunk(
  'chat/fetchBotResponse',
  async (userInput) => {
    const randomId = Math.floor(Math.random() * 10) + 1;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`);
    const data = await response.json();
    return {
      user: userInput,
      bot: {
        title: data.title,
        body: data.body,
      },
    };
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [
      { type: 'bot', content: '👋 Welcome! Ask anything and I’ll try fetching something fun!' },
    ],
    status: 'idle',
    error: null,
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({ type: 'user', content: action.payload });
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
          content: `📄 <b>${bot.title}</b><br/>${bot.body}`,
        });
      })
      .addCase(fetchBotResponse.rejected, (state) => {
        state.status = 'failed';
        state.messages.push({
          type: 'bot',
          content: "❌ Sorry, I couldn't fetch data right now.",
        });
      });
  },
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;
