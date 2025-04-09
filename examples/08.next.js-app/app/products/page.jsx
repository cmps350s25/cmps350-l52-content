// app/products/page.jsx
import * as db from "@/lib/db";
import { addToCartAction } from '@/app/actions/cartActions.js'; // Use .js
import styles from './ProductsPage.module.css';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await db.getProducts();

  return (
    <div>
      <h1>Products (Cart Example)</h1>
      <ul className={styles.list}>
        {products.map((product) => ( 
          <li key={product.id} className={styles.listItem}>
            <span>{product.name} - ${product.price.toFixed(2)}</span>
            <form action={addToCartAction} className={styles.cartForm}>
              <input type="hidden" name="productId" value={product.id} />
              <input
                type="number"
                name="quantity"
                defaultValue="1"
                min="1"
                className={styles.quantityInput}
                required
              />
              <button type="submit" className={styles.addToCartButton}>
                Add to Cart
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}