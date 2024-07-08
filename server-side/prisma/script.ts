import { PrismaClient } from "@prisma/client";
import { logger } from "../src/utils/logger";

const prisma = new PrismaClient();

const main = async () => {};

main()
  .catch((error) => {
    logger.error("Error in database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default prisma;
