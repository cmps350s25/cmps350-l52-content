import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import { redirect } from "next/navigation";

export default function NewPost() {
  async function createPost(formData) {
    "use server";

    const title = formData.get("title");
    const content = formData.get("content");

    // Create the post using Prisma
    await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
      },
    });

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div>
      <h1>Create New Post</h1>
      <Form action={createPost}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your post title"
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your post content here..."
            rows={6}
          />
        </div>
        <button type="submit">Create Post</button>
      </Form>
    </div>
  );
}
