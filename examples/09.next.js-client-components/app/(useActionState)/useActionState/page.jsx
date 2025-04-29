import FeedbackForm from "./components/FeedbackForm";
import "./module.styles.css";

export default function FeedbacPage() {
  return (
    <main>
      <FeedbackForm />
    </main>
  );
}

/*
submitContact runs on the server.
useActionState handles form state: success/error/pending.
formAction used to handle the <form action=...> submission
*/
/* 
"use client"; 
import { useActionState } from 'react';
import { addTaskAction } from "./actions";
import FeedbackForm from './components/FeedbackForm';

// 1. Define the simplified initial state structure
const initialState = {
  message: null, // Can be string or null
  error: false,  // boolean
};

// 2. The Component using useActionState
export default function TaskAdder() {
  const [state, formAction, isPending] = useActionState(
    addTaskAction,
    initialState
  );

  console.log('Render - Current State:', state, 'isPending:', isPending);

  return (
    <div>
      <h2>Add New Task</h2>

      <form action={formAction}>
        <label htmlFor="taskInput">Task Name: </label>
        <input
          type="text"
          id="taskInput"
          name="taskName"
          disabled={isPending}
          required
        />
        <button type="submit" disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Task'}
        </button>
      </form> */

/*     Display feedback based on the state message 
      Show message if it's not the initial null value 
      {state.message !== null && (
          <p style={{ color: state.error ? 'red' : 'green', marginTop: '10px' }}>
            {state.message}
          </p>
      )}
    </div>
  );
} */

/* "use client";
import { useActionState } from "react";
import { submitContact } from "./actions";

const initialState = { success: false, error: null };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Your name" disabled={isPending} />
      <br />
      <br />
      <textarea
        name="message"
        placeholder="Your message"
        disabled={isPending}
      />
      <br />
      <button type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send"}
      </button>

      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state.success && <p style={{ color: "green" }}>Message sent!</p>}
    </form>
  );
}
 */
