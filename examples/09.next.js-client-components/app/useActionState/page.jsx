// app/contact/page.jsx
/*
submitContact runs on the server.
useActionState handles form state: success/error/pending.
formAction used to handle the <form action=...> submission
*/
'use client';

import { useActionState } from 'react';
import { submitContact } from '../actions';

const initialState = { success: false, error: null };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  return (
    <form action={formAction}>
      <input name="name" placeholder="Your name" disabled={isPending} />
      <textarea name="message" placeholder="Your message" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send'}
      </button>

      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state.success && <p style={{ color: 'green' }}>Message sent!</p>}
    </form>
  );
}
