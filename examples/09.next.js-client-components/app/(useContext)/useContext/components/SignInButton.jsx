"use client";
import { use } from "react";
import { UserContext } from "./UserProvider";


export default function SignInButton() {
  const userContext = use(UserContext);
  const { signIn } = userContext;


  const handleSignIn = () => {
    const dummyUser = { name: "Ali", email: "ali@example.com" };
    signIn(dummyUser);
  };

  return <button onClick={handleSignIn}>Sign In</button>;
}
