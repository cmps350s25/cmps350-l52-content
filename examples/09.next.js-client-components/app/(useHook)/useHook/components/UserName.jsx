"use client";
import { use } from "react";

export default function UserName({ userPromise }) {
  const user = use(userPromise);
  // This part only renders after the promise resolves
  return <div>Hello, {user.name}! You logged in at {user.loggedInAt}</div>;
}
