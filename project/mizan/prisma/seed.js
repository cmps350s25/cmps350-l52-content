import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs-extra";

const basePath = path.join(process.cwd(), "data");

async function main() {
  const prisma = new PrismaClient();
  await prisma.assessmentType.deleteMany();

  try {
    await seedAssessmentTypes(prisma);
    await seedNonStudentUsers(prisma);
    await seedSections(prisma);
    await seedStudents(prisma);
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await prisma.$disconnect();
  }
}

async function seedAssessmentTypes(prisma) {
  const dataFilePath = path.join(basePath, "assessment-types.json");
  const assessmentTypes = await fs.readJSON(dataFilePath);
  for (const type of assessmentTypes) {
    console.log("Creating assessment type:", type);
    await prisma.assessmentType.create({ data: type });
  }
}

async function seedNonStudentUsers(prisma) {
  const dataFilePath = path.join(basePath, "users.json");
  const users = await fs.readJSON(dataFilePath);
  const nonStudentUsers = users.filter((user) => user.role !== "Student");
  for (const user of nonStudentUsers) {
    delete user.registeredSections;
    console.log("Creating user:", user);
    // Only create if user doesn't exist in DB
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
}

async function seedSections(prisma) {
  const sectionsFilePath = path.join(basePath, "sections.json");
  const sections = await fs.readJSON(sectionsFilePath);
  for (const section of sections) {
    console.log("Creating section:", section);
    // Only create if section doesn't exist in DB
    await prisma.section.upsert({
      where: { crn: section.crn },
      update: {},
      create: section,
    });
  }
}

async function seedStudents(prisma) {
  const dataFilePath = path.join(basePath, "users.json");
  const users = await fs.readJSON(dataFilePath);
  const students = users.filter((user) => user.role == "Student");
  for (const student of students) {
    console.log("Creating student:", student);
    const { registeredSections, ...userData } = student;
    // If student doesn't exist in DB, create student
    // and connect sections
    await prisma.user.upsert({
      where: { email: student.email },
      update: {},
      create: {
        ...userData,
        registeredSections: {
          connect: registeredSections, // Connect sections by CRN
        },
      },
    });
  }
}

await main();
