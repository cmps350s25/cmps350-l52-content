// app/actions/postActions.js
"use server";

import { revalidatePath } from "next/cache";
import * as db from "@/lib/db";

export async function toggleLikeAction(formData) {
  // Removed types
  const postId = formData.get("postId"); // Removed 'as string'

  if (!postId) {
    console.error("SERVER ACTION ERROR: postId missing");
    return;
  }

  try {
    await db.togglePostLike(postId);
    console.log(`SERVER ACTION: Toggled like for post ${postId}`);
    revalidatePath("/posts");
  } catch (error) {
    console.error(
      `SERVER ACTION ERROR: Failed to toggle like for ${postId}:`,
      error
    );
  }
}
