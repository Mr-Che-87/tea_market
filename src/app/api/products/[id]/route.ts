import { NextResponse } from "next/server";
import mockData from "../../../../../public/mock.json";
import { cache } from "react";

const getProductById = cache((id: number) => {  //кэшируем запрос к мок-БД
  return mockData.products.find((p) => p.id === id);
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = getProductById(Number(params.id));

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.error();
  }
}
