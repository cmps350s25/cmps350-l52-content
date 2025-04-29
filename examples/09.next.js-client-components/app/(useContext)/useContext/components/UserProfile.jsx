"use client";
import { use } from "react";
import { UserContext } from "./UserProvider";

export default function UserProfile() {
  const userContext = use(UserContext);
  const { user, signOut } = userContext;

  if (!user) return <p>Please sign in.</p>;

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
