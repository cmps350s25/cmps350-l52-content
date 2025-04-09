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
import Header from "./components/Header";

// No ReactNode needed

export default function RootLayout({ children }) {
  // Removed type
  return (
    <html lang="en">
      <body>
        <Header />
        <main className={styles.mainContainer}>
          {children}
        </main>
      </body>
    </html>
  );
}
