// components/SignInButton.jsx
import React from 'react';
import { useUser } from '../context/UserContext';

export default function SignInButton() {
  const { signIn } = useUser();

  const handleSignIn = () => {
    const dummyUser = { name: 'Ali', email: 'ali@example.com' };
    signIn(dummyUser);
  };

  return <button onClick={handleSignIn}>Sign In</button>;
}
