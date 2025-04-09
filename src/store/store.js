import { configureStore } from '@reduxjs/toolkit';
import chatHistorySlice from '../store/features/chatHistorySlice'
import companySlice from '../store/features/companySlice'
import chatSlice from '../store/features/chatSlice'

export const store = configureStore({
  reducer: {
    chatHistorySlice:chatHistorySlice,
    companySlice:companySlice,
    chatSlice:chatSlice,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
devTools: true,
});
