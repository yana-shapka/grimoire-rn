/**
 * favoritesSlice — Redux slice для керування улюбленими картками.
 *
 * Стан: { items: FavoriteCard[] }
 *
 * Операції:
 *   addFavorite(card)               — додати картку до улюблених
 *   removeFavorite(id)              — видалити картку за id
 *   toggleFavoriteNote({ id, note}) — оновити/очистити нотатку до картки
 *                                     (це "update" операція за умовою HW)
 *
 * Нотатка — персональний коментар юзера до картки в колекції.
 * Приклад: "потрібна для колоди Burn", "продати на наступному турнірі"
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface FavoriteCard {
  id: string;
  name: string;
  imageUrl: string | null;
  type: string;
  rarity: string;
  colors: string[];
  description: string;
  note: string; 
}

interface FavoritesState {
  items: FavoriteCard[];
}



const initialState: FavoritesState = {
  items: [],
};



const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    /**
     * addFavorite — додає картку до улюблених.
     * Ігнорує дублікати (якщо картка вже є за id).
     */
    addFavorite: (state, action: PayloadAction<Omit<FavoriteCard, 'note'>>) => {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push({ ...action.payload, note: '' });
      }
    },

    /**
     * removeFavorite — видаляє картку з улюблених за id.
     */
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    /**
     * toggleFavoriteNote — оновлює нотатку до картки.
     * Якщо нотатка передана — зберігає.
     * Якщо порожній рядок — очищує (toggle логіка).
     */
    toggleFavoriteNote: (
      state,
      action: PayloadAction<{ id: string; note: string }>,
    ) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.note = action.payload.note;
      }
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavoriteNote } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;