"use client";

import styles from "./ProductItem.module.scss"; 
import Image from "next/image";
import { IProduct } from "@/types/IProduct";
import { useRouter } from "next/navigation"; 
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addToFavourites, removeFromFavourites } from "@/store/favouritesSlice";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const router = useRouter(); 
  const dispatch = useDispatch();
  
  //проверка наличия продукта в избранном:
  const isFavourite = useSelector((state: RootState) =>
    state.favourites.favourites.some((fav) => fav.id === product.id)
  );

  //Тумблер добавления/удаления из избранного
  const handleToggleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(product.id));
    } else {
      dispatch(addToFavourites(product));
    }
  };

  const handleDetailClick = () => {
    router.push(`/product-card/${product.id}`); //роутинг
  };

  return (
    <div className={styles.container}>
      <div className={styles.productData}>
      
        <div className={`${styles.productField} ${styles.name}`}>
          {product.name}
        </div>
        <div className={styles.productBigWrapper}>
          <div className={styles.productSmallWrapper}>
            <Image
              className={`${styles.productField} ${styles.photo}`}
              src={product.photo}
              alt={`${product.name} photo`}
              width={100} 
              height={100} 
            />
            <div className={`${styles.productField} ${styles.price}`}>
              {product.price} &#8381;
            </div>
          </div>
          <div className={`${styles.productField} ${styles.description}`}>
            {product.description}
          </div>
        </div>
      </div>

      <div className={styles.productDetail}>
       
        <div className={styles.btnGroup}>
          <button 
            className={styles.btnFavourite}
            onClick={handleToggleFavourite}
            style={{color: isFavourite ? "gold" : "gray"}}>
          {isFavourite ? '★' : '☆'}
          </button>
          <button className={styles.btnDetail} onClick={handleDetailClick}>
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;