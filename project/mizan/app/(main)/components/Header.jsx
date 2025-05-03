import Link from "next/link";
import { getCurrentUser } from "@/app/actions/auth";
import LogoutButton from "./LogoutButton";
import styles from "./Header.module.css";

const links = [
  {
    label: "Assessments",
    route: "/assessments",
  },
  {
    label: "Workload Report",
    route: "/workload-report",
  },
];

export default async function Header() {
  // Get current user (if logged in)
  const user = await getCurrentUser();

  return (
    <header className={styles.header}>
      <div className={styles.brandLogo}>Mizān</div>
      <nav className={styles.navContainer}>
        <ul className={styles.navigation}>
          {links.map(({ label, route }) => (
            <li className={styles.navigationItem} key={route}>
              <Link href={route}>{label}</Link>
            </li>
          ))}
        </ul>

        <div className={styles.authSection}>
          {user ? (
            <>
              <span className={styles.userName}>
                🤗 Welcome {user.firstName} {user.lastName}
              </span>
              (<LogoutButton />)
            </>
          ) : (
            <Link href="/login" className={styles.loginLink}>
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
