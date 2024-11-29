import { NextResponse } from "next/server";
import { IProduct } from "@/types/IProduct";
import { cache } from "react";

const getProducts = cache(async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mock.json`);
  if (!res.ok) throw new Error("Failed to fetch mock data");
  const data = await res.json();
  return data.products as IProduct[];
});

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error API", error);
    return NextResponse.error();
  }
}