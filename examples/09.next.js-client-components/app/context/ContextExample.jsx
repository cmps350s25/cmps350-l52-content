import React from 'react';
import { UserProvider } from './context/UserContext';
import UserProfile from './components/UserProfile';
import SignInButton from './components/SignInButton';

export default function App() {
  return (
    <UserProvider>
      <SignInButton />
      <UserProfile />
    </UserProvider>
  );
}
