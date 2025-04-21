import { PrismaClient } from "@prisma/client";
import path from "path";
import { promises as fs } from "fs";

async function readJSON(filePath) {
  const dataPath = path.join(process.cwd(), filePath);
  const fileContent = await fs.readFile(dataPath, "utf8");
  return JSON.parse(fileContent);
}

async function main() {
  const prisma = new PrismaClient();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.cat.deleteMany();

  try {
    const cat1 = await prisma.cat.create({
      data: {
        name: "Garfield",
        imageUrl: "/uploads/garfield.png",
        breed: "Persian",
      },
    });
    console.log(cat1);

    const cat2 = await prisma.cat.create({
      data: {
        name: "Luna",
        imageUrl: "/uploads/luna.png",
        breed: "American Shorthair",
      },
    });
    console.log(cat2);

    const alice = await prisma.user.upsert({
      where: { email: "janedoe@prisma.io" },
      update: {},
      create: {
        email: "janedoe@prisma.io",
        name: "Jane Doe",
        posts: {
          create: {
            title: "Check out Prisma with Next.js",
            content: "https://www.prisma.io/nextjs",
            published: true,
          },
        },
      },
    });

    const bob = await prisma.user.upsert({
      where: { email: "jhondoe@prisma.io" },
      update: {},
      create: {
        email: "jhondoe@prisma.io",
        name: "John Doe",
        posts: {
          create: [
            {
              title: "Follow Prisma on Twitter",
              content: "https://x.com/prisma",
              published: true,
            },
            {
              title: "Follow auth.js on Twitter",
              content: "https://x.com/authjs",
              published: true,
            },
          ],
        },
      },
    });
    console.log({ alice, bob });

    const users = await readJSON("data/users.json");
    //console.log(users);
    // createMany is not supported by SQLite. Use create instead
    for (const user of users) await prisma.user.create({ data: user });

    const posts = await readJSON("data/posts.json");
    //console.log(blogs);
    for (const post of posts) await prisma.post.create({ data: post });
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await prisma.$disconnect();
  }
}

await main();
