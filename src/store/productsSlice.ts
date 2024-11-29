import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "@/types/IProduct";

//Загружаем серверное API в слайсе, а не в компоненте - для централизации:
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const res = await fetch("/api/products");
  if (!res.ok) {
    throw new Error("Ошибка загрузки списка товаров");
  }
  const { products } = await res.json();
  return products;
});

interface productsState {
  products: IProduct[];
  filteredProducts: IProduct[];
  searchTerm: string;
  sortOrder: 'min' | 'max';   
}
const initialState: productsState = {
  products: [],
  filteredProducts: [],
  searchTerm: "",
  sortOrder: 'min',     
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    //Фильтрация по названию товара:   
    filterByName: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.searchTerm = action.payload;
      if (searchTerm.trim() === "") {
        //если поле ввода пустое, показываем все товары:
        state.filteredProducts = state.products;
      } else {
        //иначе фильтруем по названию:
        state.filteredProducts = state.products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm) 
        );
      }
    },
    //Сортировка по цене:    
    sortByPrice: (state, action: PayloadAction<'min' | 'max'>) => {
      const sortOrder = action.payload;
      state.sortOrder = sortOrder;
      state.filteredProducts = [...state.filteredProducts].sort((a, b) =>
        sortOrder === 'min' ? a.price - b.price : b.price - a.price
      );
    },
  },
  extraReducers: (builder) => {  
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload; 
    });
  },
});

export const { filterByName, sortByPrice } = productsSlice.actions;
export default productsSlice.reducer;