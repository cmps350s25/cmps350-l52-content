// app/components/SubmitButton.jsx
'use client';

import { useFormStatus } from 'react-dom';
import styles from './SubmitButton.module.css';

// No interface needed
export function SubmitButton({
  children,
  pendingText = "Saving...",
  variant = 'primary',
  className = '',
  ...props
}) {
  const { pending } = useFormStatus();

  const buttonClasses = `
    ${styles.button}
    ${variant === 'positive' ? styles.positive : ''}
    ${variant === 'admin' ? styles.admin : ''}
    ${className}
  `;

  return (
    <button
      {...props}
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={buttonClasses.trim()}
    >
      {pending ? pendingText : children}
    </button>
  );
}