import prisma from "@/lib/prisma";
import path from "path";
import { writeFile } from "fs/promises";

export const addCat = async (cat) => prisma.cat.create({ data: cat });
export const getCats = async () => prisma.cat.findMany();
export const getCat = async (id) =>
  prisma.cat.findUnique({ where: { id: parseInt(id) } });

export const upsertCat = async (cat) => {
  const { id, ...data } = cat;
  console.log("upsertCat id:", id);
  return prisma.cat.upsert({
    where: { id: parseInt(id) },
    update: data,
    create: data,
  });
};

export const updateCat = async (id, cat) =>
  prisma.cat.update({ where: { id: parseInt(id) }, data: cat });

export const deleteCat = async (id) =>
  prisma.cat.delete({ where: { id: parseInt(id) } });

export const likeCat = async (id) => {
  const cat = await prisma.cat.update({
    where: { id: parseInt(id) },
    data: {
      likes: {
        increment: 1,
      },
    },
  });
  return cat.likes;
};

export async function saveFile(file) {
  try {
    const uploadFileName = `${Date.now()}_${file.name.replaceAll(" ", "_")}`;
    const uploadDir = path.join(
      process.cwd(),
      "/public/uploads",
      uploadFileName
    );
    const fileContent = Buffer.from(await file.arrayBuffer());
    await writeFile(uploadDir, fileContent);
    return `/uploads/${uploadFileName}`;
  } catch (error) {
    console.error("Error saving file:", error);
  }
}
