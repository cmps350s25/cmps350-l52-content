// app/product/[id]/AddToCartButton.jsx (Client Component)
"use client"; // Marks this as a Client Component

import { useState } from "react";
import { addToCart } from "../lib/db"; // Could be a server action or client-side API call
import styles from "./styles.module.css";

export default function AddToCartButton({ productId, productName }) {
  const [addedMessage, setAddedMessage] = useState("");

  const handleClick = async () => {
    setAddedMessage("");
    try {
      // Call the server action to add the product to the cart
      await addToCart(productId);
      console.log(`Added ${productName} (ID: ${productId}) to cart.`);
      setAddedMessage(`${productName} added to cart!`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setAddedMessage("Failed to add item to cart.");
    }
  };

  return (
    <>
      <button onClick={handleClick}>Add to Cart</button>
      {addedMessage && <p className={styles.addedMessage}>{addedMessage}</p>}
    </>
  );
}
