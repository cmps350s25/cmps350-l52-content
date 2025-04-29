"use client";
import React, { useRef, useEffect, useState } from "react";

// --- Example 4: Auto-Saving Draft ---
export default function AutoSaveDraft() {
  const [draftContent, setDraftContent] = useState("");
  const [saveStatus, setSaveStatus] = useState("Idle"); // Idle, Typing, Saving, Saved

  // Ref to store the timeout ID for auto-saving (essential part)
  const autoSaveTimeoutRef = useRef(null);

  // Regular function defined inside the component.
  // It will be recreated on every render, but this is often fine if not passed as a prop.
  // React's setSaveStatus function is stable, so this works correctly.
  const saveDraft = (content) => {
    if (!content.trim()) {
      setSaveStatus("Idle"); // Don't save empty content
      return;
    }

    console.log("Auto-saving draft content");
    setSaveStatus("Saving...");

    // Simulate API call or local storage save
    setTimeout(() => {
      console.log("Draft saved:", content);
      setSaveStatus("Saved!");
      // Optionally reset status back to Idle after a bit
      setTimeout(() => setSaveStatus("Idle"), 2000);
    }, 1000); // Simulate 1 second save time
  };

  const handleTextChange = (event) => {
    const newContent = event.target.value;
    setDraftContent(newContent);
    setSaveStatus("Typing...");

    // Clear the previous auto-save timeout (using the ref)
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Set a new timeout to save the draft 1.5 seconds after inactivity (using the ref)
    autoSaveTimeoutRef.current = setTimeout(() => {
      console.log("Auto-save timeout expired, initiating save.");
      // Call the regular saveDraft function.
      // It captures the 'newContent' from this specific invocation of handleTextChange.
      saveDraft(newContent);
    }, 1500); // Auto-save delay: 1500 milliseconds
  };

  // Cleanup: Clear timeout if component unmounts (still crucial!)
  useEffect(() => {
    // This is the 'cleanup' function that runs when the component unmounts
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
        console.log("Cleared auto-save timeout on unmount");
      }
    };
  }, []); // Empty dependency array means cleanup runs only on unmount

  return (
    <div
      style={{
        border: "1px solid lightcoral",
        padding: "15px",
        marginBottom: "20px",
      }}
    >
      {/* Changed title slightly to reflect simplification */}
      <h2>Example 4: Auto-Saving Draft</h2>
      <p>Draft will auto-save 1.5 seconds after you stop typing.</p>
      <textarea
        placeholder="Start typing your draft here..."
        value={draftContent}
        onChange={handleTextChange}
        rows={5}
        style={{
          width: "calc(100% - 20px)",
          padding: "8px",
          boxSizing: "border-box",
        }}
      />
      <p>
        Status:{" "}
        <strong
          style={{
            color:
              saveStatus === "Saving..."
                ? "orange"
                : saveStatus === "Saved!"
                ? "green"
                : "inherit",
          }}
        >
          {saveStatus}
        </strong>
      </p>
      <p style={{ marginTop: "10px", fontSize: "0.9em", color: "grey" }}>
        The `useRef` stores the timer ID needed for `clearTimeout` without
        triggering re-renders on every keystroke.
      </p>
    </div>
  );
}
