"use client";

import styles from "./Favourites.module.scss";
import ProductItem from "@/components/ProductList/ProductItem/ProductItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation"; 

export const Favourites = () => {
  const favourites = useSelector((state: RootState) => state.favourites.favourites);
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/"); // роутинг
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <button 
          className={styles.btnMain}
          onClick={handleBackToHome}>
        На главную
        </button>
      </div>
      <div className={styles.mainContainer}>
        <h1>Избранное:</h1>
      </div>

      {favourites.length === 0 ? (
        <div className={styles.infoMessage}>Нет товаров в избранном</div>
      ) : (
        <div className={styles.productsContainer}>
        {favourites.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
        </div>
      )}
    </div>
  );
};
