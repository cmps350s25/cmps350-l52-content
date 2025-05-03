"use client";

import { login } from "@/app/actions/auth";
import { useActionState } from "react";
import styles from "./login.module.css";

const initialState = { success: "", error: "" };

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mizān</h1>
          <p className={styles.subtitle}>Your Assessment Companion</p>
        </div>

        <form action={formAction}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              defaultValue="sara@student.edu"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              defaultValue="pass123"
              required
            />
          </div>

          <button className={styles.button} type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </button>

          {state.error && <p className={styles.error}>{state.error}</p>}
          {state.success && <p className={styles.success}>{state.success}</p>}
        </form>
      </div>
    </main>
  );
}
