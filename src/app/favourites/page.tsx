import type { Metadata } from "next";
import styles from "@/styles/containerPage.module.scss";
import { Favourites } from "@/components/Favourites/Favourites"; 
import Header from "@/components/Header/Header";



export const metadata: Metadata = {
  title: "Ваше избранное",
  description: "Список товаров, которые вы добавили в избранное",
};

export default function FavouritesPage() {
  return (
    <div className={styles.container}>
      <Header />
      <Favourites />
    </div>
  );
}
