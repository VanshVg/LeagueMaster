/*
  Warnings:

  - Made the column `match_number` on table `league_matches` required. This step will fail if there are existing NULL values in that column.
  - Made the column `matches_played` on table `teams` required. This step will fail if there are existing NULL values in that column.
  - Made the column `matches_won` on table `teams` required. This step will fail if there are existing NULL values in that column.
  - Made the column `matches_lost` on table `teams` required. This step will fail if there are existing NULL values in that column.
  - Made the column `goals_scored` on table `teams` required. This step will fail if there are existing NULL values in that column.
  - Made the column `goals_conceded` on table `teams` required. This step will fail if there are existing NULL values in that column.
  - Made the column `points` on table `teams` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "league_matches" ALTER COLUMN "match_number" SET NOT NULL;

-- AlterTable
ALTER TABLE "leagues" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "teams" ALTER COLUMN "matches_played" SET NOT NULL,
ALTER COLUMN "matches_played" SET DEFAULT 0,
ALTER COLUMN "matches_won" SET NOT NULL,
ALTER COLUMN "matches_won" SET DEFAULT 0,
ALTER COLUMN "matches_lost" SET NOT NULL,
ALTER COLUMN "matches_lost" SET DEFAULT 0,
ALTER COLUMN "goals_scored" SET NOT NULL,
ALTER COLUMN "goals_scored" SET DEFAULT 0,
ALTER COLUMN "goals_conceded" SET NOT NULL,
ALTER COLUMN "goals_conceded" SET DEFAULT 0,
ALTER COLUMN "points" SET NOT NULL,
ALTER COLUMN "points" SET DEFAULT 0;
