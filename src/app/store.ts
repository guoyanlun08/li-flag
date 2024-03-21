import { configureStore } from '@reduxjs/toolkit';

import userReducer from '@/features/user/userSlice';
import todoReducer from '@/features/todo/todoSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer
  },
  middleware: (getDefaultMiddleware) =>
    // 关闭 可序列化状态检查中间件
    getDefaultMiddleware({
      serializableCheck: false
    })
});

// console.log('store', store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
