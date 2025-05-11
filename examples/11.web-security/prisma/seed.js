import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const newUser = {
    name: 'Ali Khan',
    email: 'ali@example.com',
    password: '123456',
    role: "Admin"
  };
  
  const user = await prisma.user.upsert({
    where: { email: newUser.email },
    update: {}, 
    create: newUser,
  });
  
  console.log('Successfully seeded users table:', user);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
