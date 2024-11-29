import { useDispatch, useSelector } from "react-redux";
import { filterByName } from "@/store/productsSlice";
import { RootState } from "@/store/store";
import styles from './SearchNameFilter.module.scss';

export default function SearchNameFilter() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.products.searchTerm); //достаём searchTerm из Redux

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterByName(e.target.value));
  };

  return (
    <div className={styles.searchNameContainer}> 
        <h2 className={styles.searchNameTitle}>Поиск по названию:</h2>
        <input
            className={styles.searchNameInput}
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Введите название"
        />
    </div>
  );
}

