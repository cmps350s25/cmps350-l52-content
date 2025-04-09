// app/actions/settingsActions.js
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import * as db from "@/lib/db";

const settingsSchema = z.object({
  userId: z.string(),
  emailNotifications: z.preprocess(
    (val) => val === "on" || val === true,
    z.boolean()
  ),
  theme: z.enum(["light", "dark"]),
});

export async function updateSettingsAction(prevState, formData) {
  // Removed types
  const validatedFields = settingsSchema.safeParse({
    userId: formData.get("userId"),
    emailNotifications: formData.get("emailNotifications"),
    theme: formData.get("theme"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten());
    return {
      message: "Validation Failed",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { userId, ...settingsData } = validatedFields.data;

  try {
    await db.updateUserSettings(userId, settingsData);
    console.log(`SERVER ACTION: Updated settings for user ${userId}`);
    revalidatePath("/settings");
    return { message: "Settings updated successfully!", errors: null };
  } catch (error) {
    console.error(
      `SERVER ACTION ERROR: Failed to update settings for ${userId}:`,
      error
    );
    return { message: "Server error updating settings.", errors: null };
  }
}
