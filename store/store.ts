/**
 * store.ts — конфігурація Redux store.
 *
 * Підключені reducer-и:
 *   favorites — улюблені картки (favoritesSlice)
 *
 * RootState і AppDispatch експортуються для типізації
 * useSelector і useDispatch в компонентах.
 */

import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;