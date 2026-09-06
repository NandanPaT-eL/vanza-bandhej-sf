import { NextResponse } from "next/server";
import { createCart } from "@/lib/shopify";

/** POST /api/cart — create a new cart, optionally with a first line item. */
export async function POST(request) {
  try {
    const { merchandiseId, quantity } = await request.json();
    const cart = await createCart(merchandiseId, quantity ?? 1);
    return NextResponse.json(cart);
  } catch (err) {
    console.error("[POST /api/cart]", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
