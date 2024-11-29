import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";  
import favouritesReducer from "./favouritesSlice"; 

const store = configureStore({
  reducer: {
    products: productsReducer,  // редьюсер для сортировки списка товаров
    favourites: favouritesReducer,  //доп-редьюсер для избранных товаров
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
