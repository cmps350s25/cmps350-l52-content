import prisma from "@/lib/prisma";

export async function getPosts() {
  return await prisma.post.findMany({
    include: {
      author: true,
    },
  });
}

export async function getPost(id) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
    },
  });
  return post;
}

export  async function addPost(post) {
  await prisma.post.create({
    data: post,
  });
}
