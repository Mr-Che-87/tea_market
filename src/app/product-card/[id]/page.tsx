import styles from "@/styles/containerPage.module.scss";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard/ProductCard";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Карточка товара",
  description: "Индивидуальные для каждой страницы SEO-ключевые слова",
};

export default async function ProductCardPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const { product } = await res.json();

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.containerAnimation}>
        <ProductCard product={product} loading={false} />
      </div>
    </div>
  );
}