import { NextResponse } from "next/server";
import mockData from "../../../../public/mock.json"; 

export async function GET() {
  try {
    const products = mockData.products; 
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.error();
  }
}

