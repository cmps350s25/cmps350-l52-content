// app/actions/cartActions.js
"use server";

import { revalidatePath } from "next/cache";
import * as db from "@/lib/db";

export async function addToCartAction(formData) {
  // Removed types
  const productId = formData.get("productId"); // Removed 'as string'
  const quantityStr = formData.get("quantity"); // Removed 'as string'
  const quantity = parseInt(quantityStr);

  if (!productId || isNaN(quantity) || quantity < 1) {
    console.error("SERVER ACTION ERROR: Invalid product ID or quantity");
    return;
  }

  try {
    await db.addToCart(productId, quantity);
    console.log(`SERVER ACTION: Added ${quantity} of ${productId} to cart`);
    revalidatePath("/products");
    revalidatePath("/cart");
  } catch (error) {
    console.error(
      `SERVER ACTION ERROR: Failed to add ${productId} to cart:`,
      error
    );
  }
}
