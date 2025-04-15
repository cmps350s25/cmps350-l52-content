// context/UserContext.jsx
/*
UserProvider: Wraps your app and holds the user state and actions.
useUser(): Custom hook to consume the context easily in any component.
*/
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

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

export const useUser = () => useContext(UserContext);
