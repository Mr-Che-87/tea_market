import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sortByPrice } from "@/store/productsSlice";
import { RootState } from "@/store/store";
import styles from './SortingMenu.module.scss';
import minSorting from "@/assets/minSorting.png";
import maxSorting from "@/assets/maxSorting.png";

export default function SortingMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); //стейт для открытия-закрытия доп-меню
  const dispatch = useDispatch();
  const sortOrder = useSelector((state: RootState) => state.products.sortOrder); //остаём sortOrder из Redux

  //Хэндлер открытия-закрытия доп-меню:
  const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  //Хэндлер сортировки:
  const handleSort = (order: 'min' | 'max') => {
    dispatch(sortByPrice(order));
    setIsMenuOpen(false); 
   };

  return (
    <div className={styles.sortingContainer}>
        <button 
            className={styles.buttonContainer}
            onClick={handleMenuToggle}
        >
            <p className={styles.buttonText}>Сортировать</p>
            <img 
                className={styles.buttonImg} 
                src={sortOrder === 'min' ? minSorting.src : maxSorting.src} //меняем иконку в зав-ти от типа сортировки 
                alt='min/max icon'
            />
        </button>
        
        {isMenuOpen && (
            <div className={styles.dropdownMenu}>
                <button 
                    className={styles.btnSort} 
                    onClick={() => handleSort('min')}>
                Сначала дешёвые
                </button>
                <button 
                    className={styles.btnSort}
                    onClick={() => handleSort('max')}>
                Сначала дорогие
                </button>
            </div>
        )}
    </div>
  );
}

