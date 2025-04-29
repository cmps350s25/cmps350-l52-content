import "./module.styles.css";
import PreviousValueTracker from "./components/PreviousValueTracker";
import FocusInputExample from "./components/FocusInputExample";
import DebouncedSearch from "./components/DebouncedSearch";
import AutoSaveDraft from "./components/AutoSaveDraft";

export default function App() {
  return (
    <div className="App">
      <h1>React useRef Examples (React 19 Ready)</h1>
      <p>
        While React 19 introduces new features, <code>useRef</code> remains
        essential for accessing DOM nodes and storing mutable values without
        triggering re-renders.
      </p>
      <FocusInputExample />
      <PreviousValueTracker />
      <DebouncedSearch />
      <AutoSaveDraft />
    </div>
  );
}
