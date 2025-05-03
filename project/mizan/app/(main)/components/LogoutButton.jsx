"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/auth";
import styles from "./Header.module.css";

export default function LogoutButton() {
  const router = useRouter();
  
  const handleLogout = async () => {
    await logout();
    router.refresh();
  };
  
  return (
    <button 
      onClick={handleLogout} 
      className={styles.logoutButton}
    >
      Logout
    </button>
  );
}
