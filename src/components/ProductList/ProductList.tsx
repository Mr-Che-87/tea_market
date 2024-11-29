"use client";

import styles from "./ProductList.module.scss"; 
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/productsSlice";
import { RootState, AppDispatch } from "@/store/store";
import declensionText  from "@/utils/declensionText";  //функция склонения существительного
import SortingMenu from "./SortingMenu/SortingMenu";
import SearchNameFilter from "./SearchNameFilter/SearchNameFilter";

import dynamic from "next/dynamic";
//остальное д.б. на странице сразу, поэтому актуально только для длинного списка из ProductItem:
const ProductItem = dynamic(() => import("./ProductItem/ProductItem")); 

export default function ProductList() {
  const dispatch: AppDispatch = useDispatch();
  const { filteredProducts } = useSelector((state: RootState) => state.products);
  const [loading, setLoading] = useState(true); //прелоадер
  const router = useRouter();

 //Подгружаем список товаров из store:
  useEffect(() => {
    dispatch(fetchProducts()).finally(() => setLoading(false));
  }, [dispatch]);

  //Мемоизация отфильтрованных товаров (в данном случае излишне, но хуже не будет):
  const memoizedproducts = useMemo(() => filteredProducts, [filteredProducts]);

  const handleGoToFavourites = () => {
    router.push("/favourites"); //роутинг
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.searchAndSortWrapper}>
          <SearchNameFilter />
          <SortingMenu />
        </div>
        <button
          className={styles.btnFavourites}
          onClick={handleGoToFavourites}>
          Избранное
        </button>
      </div>
  
      <div className={styles.mainContainer}>
        <div className={styles.mainHeader}>
          <h1>Наш ассортимент:</h1>
          <div className={styles.productCount}>
            Нашли для вас {declensionText(filteredProducts.length)}
          </div>
        </div>
        {loading ? (
          <div className={styles.preloader}>Загрузка...</div>
        ) : (
          <>
            <div className={styles.productsContainer}>
              {memoizedproducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


