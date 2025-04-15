'use client';
/*
useOptimistic: Shows updates before server confirms them
Keeps UI responsive: Improves user experience
Works with forms + actions
*/
import { useState, useOptimistic } from 'react';

// Simulated server action
async function addCommentToServer(comment) {
  await new Promise(res => setTimeout(res, 1000)); // simulate delay
  return comment; // pretend the server saved it
}

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (prevComments, newComment) => [...prevComments, newComment]
  );

  async function handleSubmit(formData) {
    const newComment = formData.get('comment');

    // Show it immediately
    addOptimisticComment(newComment);

    // Then call server
    const saved = await addCommentToServer(newComment);
    setComments(prev => [...prev, saved]);
  }

  return (
    <form action={handleSubmit}>
      <input type="text" name="comment" placeholder="Add a comment" required />
      <button type="submit">Post</button>
      <ul>
        {optimisticComments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </form>
  );
}
