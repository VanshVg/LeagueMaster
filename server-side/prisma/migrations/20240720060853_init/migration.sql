/*
  Warnings:

  - The values [inprogress] on the enum `LeagueStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `knockouts` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('pending', 'completed');

-- AlterEnum
BEGIN;
CREATE TYPE "LeagueStatus_new" AS ENUM ('pending', 'league', 'knockout', 'completed');
ALTER TABLE "leagues" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "leagues" ALTER COLUMN "status" TYPE "LeagueStatus_new" USING ("status"::text::"LeagueStatus_new");
ALTER TYPE "LeagueStatus" RENAME TO "LeagueStatus_old";
ALTER TYPE "LeagueStatus_new" RENAME TO "LeagueStatus";
DROP TYPE "LeagueStatus_old";
ALTER TABLE "leagues" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- DropForeignKey
ALTER TABLE "knockouts" DROP CONSTRAINT "knockouts_league_id_fkey";

-- DropForeignKey
ALTER TABLE "knockouts" DROP CONSTRAINT "knockouts_team_id_fkey";

-- AlterTable
ALTER TABLE "league_matches" ADD COLUMN     "match_number" INTEGER,
ADD COLUMN     "status" "MatchStatus" NOT NULL DEFAULT 'pending';

-- DropTable
DROP TABLE "knockouts";
