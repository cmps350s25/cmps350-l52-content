// app/actions/contactActions.js
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContactForm(prevState, formData) { // Removed types
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation Failed",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log("SERVER ACTION: Submitting contact form:", validatedFields.data);
  await new Promise(res => setTimeout(res, 500));

  // revalidatePath('/contact');

  return { message: "Message received successfully!", errors: null };
}