import { NextResponse } from "next/server";
import mockData from "../../../../../public/mock.json";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = mockData.products.find((p) => p.id === Number(params.id));

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.error();
  }
}
