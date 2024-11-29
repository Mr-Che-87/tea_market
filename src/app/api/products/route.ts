import { NextResponse } from "next/server";
import { IProduct } from "@/types/IProduct";
import mockData from "../../../../public/mock.json"; 
import { cache } from "react";

const getProducts = cache(() => mockData.products as IProduct[]); //кэшируем запрос к мок-БД

export async function GET() {
  try {
    const products = getProducts(); 
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.error();
  }
}
  