import { configureStore } from '@reduxjs/toolkit';

import todoReducer from '@/features/todo/todoSlice';

const store = configureStore({
  reducer: {
    todo: todoReducer
  }
});

// console.log('store', store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
