/*
  Warnings:

  - Added the required column `away_team_score` to the `match_penalty_scores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `home_team_score` to the `match_penalty_scores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "match_penalty_scores" ADD COLUMN     "away_team_score" INTEGER NOT NULL,
ADD COLUMN     "home_team_score" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "match_penalty_scores" ADD CONSTRAINT "match_penalty_scores_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "league_matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
