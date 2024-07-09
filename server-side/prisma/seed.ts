import { logger } from "../src/utils/logger";
import prisma from "./script";
import { leagueTypesData } from "./seeders/leagueTypes";
import { matchTypesData } from "./seeders/matchTypes";

const seed = async () => {
  await prisma.league_types.createMany({ data: leagueTypesData });
  await prisma.match_types.createMany({ data: matchTypesData });
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    logger.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
