"use server"; // Directive MUST be at the top of the file

// Simulate fetching product data (replace with actual DB/API calls)
const mockProducts = {
  123: {
    id: "123",
    name: "Wireless Mouse",
    description: "A comfortable and responsive wireless mouse.",
    price: 25.99,
    specs: ["2.4GHz Wireless", "1600 DPI", "Ergonomic Design", "3 Buttons"],
  },
  456: {
    id: "456",
    name: "Mechanical Keyboard",
    description: "Clicky keys for a satisfying typing experience.",
    price: 79.5,
    specs: ["Blue Switches", "RGB Backlit", "Full Size Layout", "USB-C"],
  },
  789: {
    id: "789",
    name: "Webcam HD",
    description: "High-definition webcam for video calls.",
    price: 45.0,
    specs: [
      "1080p Resolution",
      "Built-in Microphone",
      "USB Connection",
      "Privacy Cover",
    ],
  },
  // Add more mock products as needed
};

/* Fetches product details from a data source */
export async function getProductDetails(productId) {
  console.log(
    `[Server Data Fetch] Attempting to fetch details for product ID: ${productId}`
  );

  // Simulate network/database delay
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate 300ms delay

  const product = mockProducts[productId];

  if (!product) {
    console.warn(`[Server Data Fetch] Product with ID ${productId} not found.`);
    return { success: false, error: `Product with ID ${productId} not found.` };
  }

  console.log(
    `[Server Data Fetch] Successfully found product: ${product.name}`
  );
  // In a real app, this would involve querying a database or calling an external API
  // Example: const product = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
  return product;
}

// Simulate database interaction or API call
export async function addToCart(productId) {
  try {
    console.log(
      `[Server Action] Adding product ID: ${productId} to the cart...`
    );
    // Perform validation or check permissions if needed here
    if (!productId) {
      return { success: false, error: "Product ID is required." };
    }

    // In a real app, you'd interact with a database, or external API
    await new Promise((resolve) => setTimeout(resolve, 750)); // Simulate network/DB delay
    console.log(`[Server Action] Product ${productId} added to the cart.`);
    return { success: true, productId };
  } catch (error) {
    console.error("[Server Action Error] Failed to add to cart:", error);
    // Return an error object or throw the error again
    return {
      success: false,
      error: error.message || "Failed to add item to cart.",
    };
  }
}
