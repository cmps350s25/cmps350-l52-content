// 1. Declarative:  Define a component that takes props
// and returns a UI based on those props.
export default function Greeting({ name }) {
  // Declare what the UI should be based on the 'name' prop
  if (name) {
    return <h1>Hello, {name}!</h1>;
  } else {
    return <h1>Hello, Guest!</h1>;
  }
}

// 2. Imperative: Manually select element and update it step-by-step
function displayGreeting(name) {
  // Step 1: Find the target DOM element
  const headingElement = document.getElementById("greeting");

  // Step 2: Manually set its content
  if (name) {
    headingElement.textContent = `Hello, ${name}!`;
  } else {
    headingElement.textContent = "Hello, Guest!";
  }
}

// Usage: Call the function with data to perform the update steps
// displayGreeting('Alice');
// or
// displayGreeting(null);

// Requires HTML like: <h1 id="greeting"></h1>
