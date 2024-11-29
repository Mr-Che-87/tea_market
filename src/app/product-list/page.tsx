import type { Metadata } from "next";
import styles from "@/styles/containerPage.module.scss";
import ProductList from "@/components/ProductList/ProductList";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Список товаров",
  description: "Индивидуальные для каждой страницы SEO-ключевые слова",
};

export default async function ProductListPage() {
  return (
    <div className={styles.container}>
      <Header />
      <ProductList />
    </div>
  );
}