import React from "react";
import { UserProvider } from "./components/UserProvider";
import UserProfile from "./components/UserProfile";
import SignInButton from "./components/SignInButton";

export default function ContextExample() {
  return (
    <UserProvider>
      <SignInButton />
      <UserProfile />
    </UserProvider>
  );
}
