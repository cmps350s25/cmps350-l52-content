// lib/db.js

// --- In-Memory Storage ---
const posts = new Map([
  ['post-1', { id: 'post-1', title: 'First Blog Post', likes: 0 }],
  ['post-2', { id: 'post-2', title: 'Understanding Server Actions', likes: 5 }],
]);

const products = new Map([
  ['prod-1', { id: 'prod-1', name: 'Wireless Mouse', price: 25.99 }],
  ['prod-2', { id: 'prod-2', name: 'Mechanical Keyboard', price: 79.99 }],
]);

const cart = new Map(); // Key is productId

const userSettings = new Map([
    ['user-123', { userId: 'user-123', emailNotifications: true, theme: 'light' }]
]);

// --- Database Functions (Simulated) ---

// Posts
export const getPosts = async () => {
  console.log('DB: Fetching posts...');
  await new Promise(res => setTimeout(res, 50));
  return Array.from(posts.values());
};

export const togglePostLike = async (postId) => {
  console.log(`DB: Toggling like for post ${postId}...`);
  await new Promise(res => setTimeout(res, 50));
  const post = posts.get(postId);
  if (post) {
    post.likes += 1;
    posts.set(postId, post);
    return post;
  }
  return null;
};

// Products
export const getProducts = async () => {
  console.log('DB: Fetching products...');
  await new Promise(res => setTimeout(res, 50));
  return Array.from(products.values());
};

// Cart
export const getCartItems = async () => {
  console.log('DB: Fetching cart items...');
  await new Promise(res => setTimeout(res, 50));
  return Array.from(cart.values());
};

export const addToCart = async (productId, quantity) => {
  console.log(`DB: Adding ${quantity} of product ${productId} to cart...`);
  await new Promise(res => setTimeout(res, 50));
  const product = products.get(productId);
  if (!product) return null;

  const existingItem = cart.get(productId);
  if (existingItem) {
    existingItem.quantity += quantity;
    cart.set(productId, existingItem);
    return existingItem;
  } else {
    const newItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
    };
    cart.set(productId, newItem);
    return newItem;
  }
};

// User Settings
export const getUserSettings = async (userId) => {
    console.log(`DB: Fetching settings for user ${userId}...`);
    await new Promise(res => setTimeout(res, 50));
    return userSettings.get(userId) || null;
}

export const updateUserSettings = async (userId, data) => {
    console.log(`DB: Updating settings for user ${userId}...`);
    await new Promise(res => setTimeout(res, 50));
    const currentSettings = userSettings.get(userId);
    if (currentSettings) {
        const updated = { ...currentSettings, ...data };
        userSettings.set(userId, updated);
        return updated;
    }
    return null;
}

// Admin
export const triggerReportGeneration = async (reportType) => {
    console.log(`DB: Triggering report generation for type: ${reportType}...`);
    await new Promise(res => setTimeout(res, 1000));
    console.log(`DB: Report generation for ${reportType} completed (simulated).`);
    return true;
}