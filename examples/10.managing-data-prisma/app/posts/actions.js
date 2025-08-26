"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addPost } from "./repo/posts-repo";

export async function onAddPost(formData) {
  const title = formData.get("title");
  const content = formData.get("content");

  const post = {
    title,
    content,
    authorId: 1,
  };

  await addPost(post);

  revalidatePath("/posts");
  redirect("/posts");
}
