import Link from "next/link";
import styles from "./Header.module.css";
const links = [
  {
    label: "Basics",
    route: "/",
  },
  {
    label: "useState",
    route: "/useState",
  },
  {
    label: "useEffect",
    route: "/quran",
  },
  {
    label: "useRef",
    route: "/useRef",
  },
  {
    label: "useActionState",
    route: "/useActionState",
  },
  {
    label: "useOptimistic",
    route: "/todos",
  },
  {
    label: "useContext",
    route: "/useContext",
  },
  {
    label: "useHook",
    route: "/useHook",
  },
  {
    label: "interleaving",
    route: "/products",
  },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navigation}>
          {links.map(({ label, route }) => (
            <li className={styles.navigationItem} key={route}>
              <Link href={route}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
