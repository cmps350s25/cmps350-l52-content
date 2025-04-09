import Link from "next/link";
import styles from "./header.module.css";
const links = [
    {
        "label": "Home",
        "route": "/"
    },
    {
        "label": "Contact",
        "route": "/contact"
    },
    {
        "label": "Posts",
        "route": "/posts"
    },
    {
        "label": "Products",
        "route": "/products"
    },
    {
        "label": "Cart",
        "route": "/cart"
    },
    {
        "label": "Settings",
        "route": "/settings"
    },
    {
        "label": "Admin",
        "route": "/admin"
    },
    {
        "label": "Notes",
        "route": "/notes"
    },
    {
        "label": "About",
        "route": "/about"
    }
]



export default function Header() {
    
  return (
    <header>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {links.map(({ label, route }) => (
            <li key={route}>
              <Link href={route}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}