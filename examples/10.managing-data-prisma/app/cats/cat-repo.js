import prisma from "@/lib/prisma";

/*
Notice that you're passing the include option to findMany which tells Prisma Client 
to include the posts on the returned Cat objects.
*/
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
  //id = parseInt(id)
  /*const cat = await getCat(id);
  cat.likes = cat.likes + 1;
  await updateCat(id, cat);*/
  return cat.likes;
};
