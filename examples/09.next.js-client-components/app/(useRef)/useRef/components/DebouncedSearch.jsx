"use client";
import React, { useRef, useEffect, useState } from "react";

// --- Example 3: Debounced Search Input ---
export default function DebouncedSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]); // Simulate results

  // Ref to store the timeout ID for debouncing (essential part)
  const debounceTimeoutRef = useRef(null);

  // Regular function defined inside the component.
  // Will be recreated on each render, but it's fine here.
  const performSearch = (term) => {
    if (!term.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    console.log(`Searching for: "${term}"`);
    setIsSearching(true);
    // Simulate API call delay
    setTimeout(() => {
      // Simulate results based on term
      const fakeResults = [
        `Result for ${term} 1`,
        `Result for ${term} 2`,
        `Result for ${term} 3`,
      ];
      setResults(fakeResults);
      setIsSearching(false);
      console.log(`Search complete for: "${term}"`);
    }, 1000); // 1 second delay
  };

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Clear the previous timeout (using the ref)
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      // console.log('Cleared previous debounce timeout'); // Optional log
    }

    // Set a new timeout to perform the search after 500ms of inactivity (using the ref)
    debounceTimeoutRef.current = setTimeout(() => {
      console.log("Debounce timeout expired, performing search.");
      // Call the regular performSearch function.
      // It captures the 'newSearchTerm' from this specific invocation of handleInputChange.
      performSearch(newSearchTerm);
    }, 500); // Debounce delay: 500 milliseconds
    // console.log('Set new debounce timeout:', debounceTimeoutRef.current); // Optional log
  };

  // Cleanup: Clear timeout if component unmounts (still crucial!)
  useEffect(() => {
    // This is the 'cleanup' function that runs when the component unmounts
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
        console.log("Cleared debounce timeout on unmount");
      }
    };
  }, []); // Empty dependency array means cleanup runs only on unmount

  return (
    <div
      style={{
        border: "1px solid plum",
        padding: "15px",
        marginBottom: "20px",
      }}
    >
      {/* Changed title slightly to reflect simplification */}
      <h2>Example 3: Debounced Search</h2>
      <p>Search will trigger 500ms after you stop typing.</p>
      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={handleInputChange}
        style={{ padding: "8px", width: "calc(100% - 20px)" }}
      />
      <div>
        {isSearching && <p style={{ color: "blue" }}>Searching...</p>}
        {!isSearching && results.length > 0 && (
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        )}
        {!isSearching && searchTerm.trim() && results.length === 0 && (
          <p style={{ fontStyle: "italic", color: "grey" }}>
            No results found.
          </p>
        )}
      </div>
      <p style={{ marginTop: "10px", fontSize: "0.9em", color: "grey" }}>
        The `useRef` stores the timer ID needed for `clearTimeout` without
        triggering re-renders.
      </p>
    </div>
  );
}
