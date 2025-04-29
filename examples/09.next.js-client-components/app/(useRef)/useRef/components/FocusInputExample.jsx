"use client";
import React, { useRef, useEffect } from 'react';

// --- Example 1: Accessing a DOM Element (Focus Input) ---
export default function FocusInputExample() {
  // 1. Create a ref object
  const inputRef = useRef(null); // Initialize with null

  // Use useEffect to focus the input when the component mounts
  useEffect(() => {
    // 3. Access the DOM node via inputRef.current
    // The '?' is optional chaining, good practice in case the ref isn't attached yet
    console.log('FocusInputExample mounted. Focusing input.');
    inputRef.current?.focus();
  }, []); // Empty dependency array means this runs only once after the initial render

  const handleFocusClick = () => {
    console.log('Button clicked. Focusing input manually.');
    // Also use the ref to focus on button click
    inputRef.current?.focus();
  };

  return (
    <div style={{ border: '1px solid lightblue', padding: '15px', marginBottom: '20px' }}>
      <h2>Example 1: Focus Input with useRef</h2>
      <p>The input below should be focused automatically on load.</p>
      {/* 2. Attach the ref to the DOM element */}
      <input
        id="focus-input"
        ref={inputRef}
        type="text"
        placeholder="I should be focused"
        style={{ marginRight: '10px', padding: '8px' }}
      />
      <button onClick={handleFocusClick}>
        Focus Input Manually
      </button>
       <p style={{ marginTop: '10px', fontSize: '0.9em', color: 'grey' }}>
        Check the console log when the component loads and when you click the button.
      </p>
    </div>
  );
}