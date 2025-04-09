// app/actions/postActions.js
"use server";

import { revalidatePath } from "next/cache";
import * as db from "@/lib/db";

export async function incrementLike(postId) {
  // Removed types
  // const postId = formData.get("postId"); // Removed 'as string'

  if (!postId) {
    console.error("SERVER ACTION ERROR: postId missing");
    return;
  }

  try {
    const likesCount = await db.incrementPostLike(postId);
    console.log(`SERVER ACTION: Toggled like for post ${postId}`);
    revalidatePath("/posts");
    return likesCount;
  } catch (error) {
    console.error(
      `SERVER ACTION ERROR: Failed to toggle like for ${postId}:`,
      error
    );
  }
}
