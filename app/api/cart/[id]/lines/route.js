import { NextResponse } from "next/server";
import { addToCart, updateCartLine, removeFromCart } from "@/lib/shopify";

/** POST /api/cart/[id]/lines — add a line item to an existing cart. */
export async function POST(request, { params }) {
  try {
    const cartId = decodeURIComponent(params.id);
    const { merchandiseId, quantity } = await request.json();
    const cart = await addToCart(cartId, merchandiseId, quantity ?? 1);
    return NextResponse.json(cart);
  } catch (err) {
    console.error("[POST /api/cart/[id]/lines]", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/** PATCH /api/cart/[id]/lines — update the quantity of a single line item. */
export async function PATCH(request, { params }) {
  try {
    const cartId = decodeURIComponent(params.id);
    const { lineId, quantity } = await request.json();
    const cart = await updateCartLine(cartId, lineId, quantity);
    return NextResponse.json(cart);
  } catch (err) {
    console.error("[PATCH /api/cart/[id]/lines]", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/** DELETE /api/cart/[id]/lines — remove a line item from an existing cart. */
export async function DELETE(request, { params }) {
  try {
    const cartId = decodeURIComponent(params.id);
    const { lineId } = await request.json();
    const cart = await removeFromCart(cartId, lineId);
    return NextResponse.json(cart);
  } catch (err) {
    console.error("[DELETE /api/cart/[id]/lines]", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
