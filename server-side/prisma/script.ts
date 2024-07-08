import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {};

main()
  .catch((error) => {
    console.error("Error in database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default prisma;
