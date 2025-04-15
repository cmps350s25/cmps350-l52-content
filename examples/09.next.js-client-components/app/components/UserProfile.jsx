// components/UserProfile.jsx
import React from 'react';
import { useUser } from '../context/UserContext';

export default function UserProfile() {
  const { user, signOut } = useUser();

  if (!user) return <p>Please sign in.</p>;

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
