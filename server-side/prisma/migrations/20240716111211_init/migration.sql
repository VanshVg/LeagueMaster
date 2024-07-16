-- CreateEnum
CREATE TYPE "LeagueStatus" AS ENUM ('pending', 'inprogress', 'completed');

-- AlterTable
ALTER TABLE "leagues" ADD COLUMN     "status" "LeagueStatus" NOT NULL DEFAULT 'pending';
