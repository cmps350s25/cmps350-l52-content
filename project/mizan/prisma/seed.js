import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs-extra";

async function main() {
  const prisma = new PrismaClient();
  await prisma.assessmentType.deleteMany();

  try {
    const basePath = path.join(process.cwd(), "data");

    let dataFilePath = path.join(basePath, "assessment-types.json");
    const assessmentTypes = await fs.readJSON(dataFilePath);
    for (const type of assessmentTypes) {
      console.log("Creating assessment type:", type);
      await prisma.assessmentType.create({ data: type });
    }
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await prisma.$disconnect();
  }
}

await main();
