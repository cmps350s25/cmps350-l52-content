'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from "react"; 
import { signup } from '@/app/auth/auth-actions';

export function SignupForm() {
  const [state, action] = useActionState(signup, undefined);

  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            placeholder="John Doe"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        {state?.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name}</p>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            placeholder="john@example.com"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        {state?.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        {state?.errors?.password && (
          <div className="text-sm text-red-500">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <SignupButton />
      </div>
    </form>
  );
}

export function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      type="submit"
      className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md"
      disabled={pending}
    >
      {pending ? 'Submitting...' : 'Login'}
    </button>
  );
}
