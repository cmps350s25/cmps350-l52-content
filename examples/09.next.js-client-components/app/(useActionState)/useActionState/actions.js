'use server';

export async function submitFeedback(prevState, formData) {
  const feedback = formData.get('feedback');

  if (!feedback || feedback.trim().length < 5) {
    return { error: 'Feedback must be at least 5 characters long.' };
  }

  // Simulate a server operation
  await new Promise((res) => setTimeout(res, 1000));
  return { success: 'Thank you for your feedback!' };
}

/* // app/actions.js
"use server";

// 2. Define the asynchronous action function
//    - Takes previous state and payload (FormData in this case)
//    - Returns the *new* state
// Define the asynchronous action function (returns new state)
export async function addTaskAction(previousState, formData) {
  const taskName = formData.get("taskName");

  console.log(`Action: Adding task "${taskName}"...`);

  // Basic validation
  if (!taskName || taskName.trim().length < 3) {
    console.log("Action: Validation failed.");
    return {
      message: "Task name must be at least 3 characters long.",
      error: true,
    };
  }

  try {
    // Simulate network delay/database operation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate potential server-side error
    // if (taskName.toLowerCase().includes('fail')) {
    //   throw new Error('Simulated server error during task addition.');
    // }

    console.log("Action: Task added successfully.");
    // Return the new state on success
    return {
      message: `Successfully added task: "${taskName}"`,
      error: false,
    };
  } catch (error) {
    console.error("Action: Error adding task:", error);
    // Return the new state on error
    return {
      message: error.message || "Failed to add task due to a server error.",
      error: true,
    };
  }
} */

/* export async function submitContact(prevState, formData) {
  const name = formData.get("name");
  const message = formData.get("message");

  if (!name || !message) {
    return { success: false, error: "All fields are required." };
  }
  // Simulate saving data with a delay (e.g., DB write)
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`Message from ${name}: ${message}`);
  return { success: true };
} */
