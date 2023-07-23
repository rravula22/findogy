// store.js
import { configureStore } from '@reduxjs/toolkit';
import cookieSlice from './reducers/cookieSlice';

const store = configureStore({
  reducer: {
    cookie: cookieSlice,
  },
});

export default store;
