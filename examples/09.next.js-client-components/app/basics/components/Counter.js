"use client";
import { useEffect, useState } from "react";

export default function Counter({ startValue }) {
  //let count = 0; // a local variable, not a state variable
  const [count, setCount] = useState(startValue);

  const increment = () => setCount((prevCount) => prevCount + 1);

  const decrement = () => setCount((prevCount) => prevCount - 1);

  //Invoked only one time when the component is first mounted to the DOM.
  useEffect(() => {
    console.log(`I just mounted!`);
  }, []);

  //Gets auto-executed on every render (i.e., every time count changes)
  useEffect(() => {
    console.log(`The count is now ${count}`);
    //Let the parent component know that count has changed
    //props.onChange(count);
  }, [count]);

  return (
    <div>
      Count: {count} &nbsp;
      <button type="button" onClick={increment}>
        +
      </button>
      <button type="button" onClick={decrement}>
        -
      </button>
    </div>
  );
}
