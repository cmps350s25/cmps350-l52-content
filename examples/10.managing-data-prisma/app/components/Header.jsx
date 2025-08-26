import Link from "next/link";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <header>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/cats">Cats</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/posts/new">Add Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
