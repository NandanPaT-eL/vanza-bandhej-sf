import { NextResponse } from "next/server";
import { getCart } from "@/lib/shopify";

/** GET /api/cart/[id] — rehydrate an existing cart by its Shopify ID. */
export async function GET(request, { params }) {
  try {
    const cart = await getCart(decodeURIComponent(params.id));
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }
    return NextResponse.json(cart);
  } catch (err) {
    console.error("[GET /api/cart/[id]]", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
