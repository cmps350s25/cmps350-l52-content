'use client';
import { useActionState } from 'react';
import { submitFeedback } from '../actions'; 

const initialState = { success: '', error: '' };

export default function FeedbackForm() {
  const [state, formAction, isPending] = useActionState(submitFeedback, initialState);

  return (
    <form action={formAction} className="form">
      <textarea name="feedback" placeholder="Your feedback..." className="textarea" />
      <button type="submit" disabled={isPending} className="button">
        {isPending ? 'Submitting...' : 'Submit'}
      </button>

      {state.error && <p className="error">{state.error}</p>}
      {state.success && <p className="success">{state.success}</p>}
    </form>
  );
}
