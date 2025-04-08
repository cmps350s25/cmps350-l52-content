/* import Header from "./Header";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html>
      <head></head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
} */

// app/layout.jsx
import "./globals.css";
import styles from "./layout.module.css";
import Link from "next/link";
// No ReactNode needed

export default function RootLayout({ children }) {
  // Removed type
  return (
    <html lang="en">
      <body>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {/* Links remain the same */}
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/posts">Posts</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
            <li>
              <Link href="/admin">Admin</Link>
            </li>
            <li>
              <Link href="/notes">Notes</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
        <main className={styles.mainContainer}>
          {children}
        </main>
      </body>
    </html>
  );
}
