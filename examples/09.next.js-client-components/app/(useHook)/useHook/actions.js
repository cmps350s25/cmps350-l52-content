"use server";

export async function fetchUserName() {
  console.log("[Server Action] Getting data...");
  // Simulate fetching from a database
  // 2-second delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // Return the fetched data
  return { name: "John Doe", loggedInAt: new Date().toLocaleTimeString() }; 
}
