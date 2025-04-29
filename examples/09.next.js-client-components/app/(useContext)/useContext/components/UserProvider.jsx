/*
UserProvider: Wraps your app and holds the user state and actions.
*/
"use client";
import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = (userData) => setUser(userData);
  const signOut = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
}
