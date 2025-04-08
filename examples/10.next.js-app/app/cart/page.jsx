// app/cart/page.jsx
import * as db from "@/lib/db";
import styles from './CartPage.module.css';

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const items = await db.getCartItems();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className={styles.itemList}>
            {items.map((item) => ( // item implicitly any
              <div key={item.productId} className={styles.cartItem}>
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className={styles.total}>
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}