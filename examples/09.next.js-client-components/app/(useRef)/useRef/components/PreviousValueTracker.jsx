"use client";
import React, { useRef, useEffect, useState } from "react";

export default function PreviousValueTracker() {
  const [count, setCount] = useState(0);
  // 1. Create a ref. Initialize with undefined or null if needed, but often not necessary here.
  const prevCountRef = useRef(); // Defaults to undefined

  // 2. Use useEffect to update the ref *after* the render completes.
  useEffect(() => {
    // This runs *after* the component renders with the new `count`.
    // So, we store the `count` value that was just rendered.
    // On the *next* render, this ref will hold the value from the *previous* render.
    console.log(
      `PreviousValueTracker Effect: Updating prevCountRef from ${prevCountRef.current} to ${count}`
    );
    prevCountRef.current = count;
  }, [count]); // Dependency array: Only run this effect when `count` changes.

  // 3. During render, prevCountRef.current holds the value from the *previous* render.
  const previousCount = prevCountRef.current;
  console.log(
    `PreviousValueTracker Rendering: Current count is ${count}, Previous count was ${previousCount}`
  );

  return (
    <div
      style={{
        border: "1px solid sandybrown",
        padding: "15px",
        marginBottom: "20px",
      }}
    >
      <h2>Example 2: Track Previous State with useRef</h2>
      <p>
        Current count: <strong>{count}</strong>
      </p>
      {/* Display the previous count. Use `??` for the initial render when it's undefined */}
      <p>
        Previous count: <strong>{previousCount ?? "N/A"}</strong>
      </p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <p style={{ marginTop: "10px", fontSize: "0.9em", color: "grey" }}>
        When you click Increment:
        <br />
        1. State updates (`count` becomes `n+1`).
        <br />
        2. Component re-renders, showing `Current: n+1` and `Previous: n` (the
        value stored in the ref *before* this render).
        <br />
        3. `useEffect` runs *after* the render, updating the ref's value to
        `n+1` for the *next* render. Check the console log.
      </p>
    </div>
  );
}
