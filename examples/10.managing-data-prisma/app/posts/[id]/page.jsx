import prisma from "@/app/lib/prisma";
import { notFound } from "next/navigation";

export default async function Post({ params }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div>
      <article>
        <h1>{post.title}</h1>
        <p>by {post.author.name}</p>
        <div>{post.content || "No content available."}</div>
      </article>
    </div>
  );
}
