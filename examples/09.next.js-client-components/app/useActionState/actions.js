// app/actions.js
'use server';

export async function submitContact(prevState, formData) {
  const name = formData.get('name');
  const message = formData.get('message');

  if (!name || !message) {
    return { success: false, error: 'All fields are required.' };
  }

  // Simulate saving data (e.g., DB write)
  console.log(`Message from ${name}: ${message}`);
  return { success: true };
}
