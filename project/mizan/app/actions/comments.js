"use server";

import commentRepo from "@/app/_repo/CommentRepo";
import { getCurrentUser } from "./auth";
import { revalidatePath } from "next/cache";

export async function getComments(sectionCRN) {
  try {
    const comments = await commentRepo.getComments(sectionCRN);
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error(`Failed to retrieve comments. ${error.message}`);
  }
}

export async function addComment(formData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const sectionCRN = formData.get("sectionCRN");
    const title = formData.get("title");
    const content = formData.get("content");
    const replyToCommentId = formData.get("replyToCommentId")
      ? Number(formData.get("replyToCommentId"))
      : null;

    const comment = {
      authorId: user.id,
      title,
      content,
      sectionCRN,
      replyToCommentId,
    };

    const newComment = await commentRepo.addComment(comment);

    // Revalidate the path to update the UI
    revalidatePath(`/comments/${sectionCRN}`);

    return { success: true, comment: newComment };
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error(`Failed to add comment. ${error.message}`);
  }
}

export async function deleteComment(commentId, sectionCRN) {
  try {
    await commentRepo.deleteComment(commentId);

    // Revalidate the path to update the UI
    revalidatePath(`/comments/${sectionCRN}`);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error(`Failed to delete comment. ${error.message}`);
  }
}

export async function getCommentReplies(commentId) {
  try {
    const replies = await commentRepo.getCommentReplies(commentId);
    return replies;
  } catch (error) {
    console.error("Error fetching comment replies:", error);
    throw new Error(`Failed to retrieve comment replies. ${error.message}`);
  }
}
