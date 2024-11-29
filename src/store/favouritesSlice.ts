import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/types/IProduct";

interface FavouritesState {
  favourites: IProduct[];
}

// Функция для безопасного доступа к sessionStorage (только в браузере)
const getInitialFavourites = (): IProduct[] => {
  if (typeof window !== "undefined") {
    return JSON.parse(sessionStorage.getItem("favourites") || "[]");
  }
  return []; // Пустой массив на сервере
};

// Начальная загрузка из sessionStorage:
const initialState: FavouritesState = {
  favourites: getInitialFavourites(),
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    // Редьюсер добавления в избранное:
    addToFavourites: (state, action: PayloadAction<IProduct>) => {
      // Добавляем товар в избранное, только если его там ещё нет
      const exists = state.favourites.some(
        (product) => product.id === action.payload.id
      );
      if (!exists) {
        state.favourites.push(action.payload);

        // Сохраняем в sessionStorage (только в браузере)
        if (typeof window !== "undefined") {
          sessionStorage.setItem(
            "favourites",
            JSON.stringify(state.favourites)
          );
        }
      }
    },
    // Редьюсер удаления из избранного:
    removeFromFavourites: (state, action: PayloadAction<number>) => {
      state.favourites = state.favourites.filter(
        (product) => product.id !== action.payload
      );

      // Обновляем sessionStorage (только в браузере)
      if (typeof window !== "undefined") {
        sessionStorage.setItem("favourites", JSON.stringify(state.favourites));
      }
    },
  },
});

export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
