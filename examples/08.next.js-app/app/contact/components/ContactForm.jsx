// app/contact/components/ContactForm.jsx
'use client';

import { useFormState } from 'react-dom';
import { submitContactForm } from '@/app/actions/contactActions.js'; // Use .js
import { SubmitButton } from '@/app/components/SubmitButton.jsx'; // Use .jsx
import styles from './ContactForm.module.css';

const initialState = { message: null, errors: null };

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);

  return (
    <form action={formAction} className={styles.form}>
       {/* Form structure remains the same */}
       <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        {state?.errors?.name && <p className="error-message">{state.errors.name}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        {state?.errors?.email && <p className="error-message">{state.errors.email}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={4} required />
        {state?.errors?.message && <p className="error-message">{state.errors.message}</p>}
      </div>

      <SubmitButton>Send Message</SubmitButton>

      {state?.message && !state.errors && <p className="success-message">{state.message}</p>}
      {state?.message && state.errors && <p className="error-message">{state.message} (Validation Failed)</p>}
    </form>
  );
}