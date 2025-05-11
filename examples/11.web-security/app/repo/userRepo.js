import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const insertUser = async (user) => {
  return prisma.user.create({
    data: user
  });
};

export async function getUser(id) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

// Public method to authenticate a user by email and password
export async function verifyLogin(email, password) {
  const user = await getUserByEmail(email);

  // Check if user exists and password matches
  if (!user || user.password !== password) {
    throw new Error("Incorrect username or password.");
  }
  // Remove password from user object for security
  delete user.password;
  return user;
}

