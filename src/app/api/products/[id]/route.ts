import { NextResponse } from "next/server";
import { IProduct } from "@/types/IProduct";
import { cache } from "react";

const getProductById = cache(async (id: number) => { //кэшируем запрос к мок-БД
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mock.json`);
  if (!res.ok) throw new Error("Failed to fetch mock data");
  const data = await res.json();
  return data.products.find((p: IProduct) => p.id === id);
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = getProductById(Number(params.id));

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error API", error);
    return NextResponse.error();
  }
}