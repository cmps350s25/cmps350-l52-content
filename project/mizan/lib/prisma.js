import { PrismaClient } from "@prisma/client";

/**
 * Initializes and provides a singleton instance of the PrismaClient.
 * This ensures that the PrismaClient is not re-instantiated multiple times,
 * which can cause issues in a development environment where modules are reloaded.
 *
 * The `global.prisma` is used to store the PrismaClient instance globally,
 * preventing multiple instances during hot-reloading in development.
 *
 * @constant {PrismaClient} prisma - The PrismaClient instance configured with query logging.
 */
const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
