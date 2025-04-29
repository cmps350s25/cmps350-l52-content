import { Suspense } from "react";
import UserName from "./components/UserName";
import { fetchUserName } from "./actions";

export default function Page() {
  // ---Call the Server Action ---
  const userPromise = fetchUserName();
  return (
    <main>
      <h1>
        Using <code>use</code> with a Server Action
      </h1>
      <p>
        The data is fetched using a Server Action. While data is being fetched,
        the <code>Suspense</code> component allows the UI to show a loading
        message until the data is ready.
      </p>
      <ul>
        <li>At first, you see 🌀 Loading user info....</li>
        <li>After 2 seconds, React replaces it with: Hello, John Doe! </li>
      </ul>
      <br />
      <br />
      {/*
        Suspense renders the fallback element (🌀 Loading user info....) 
        while UserName component is suspended waiting for 
        the Server Action's promise to resolve.

        Once the Promise is resolved, the fetched data is 
        displayed, replacing the loading fallback.
      */}
      <Suspense fallback={<div>🌀 Loading user info...</div>}>
        {/* This component will suspend while waiting for the server data */}
        <UserName userPromise={userPromise} />
      </Suspense>
      <p style={{ marginTop: "20px" }}>Other content on the page.</p>
    </main>
  );
}
