/*
  Warnings:

  - A unique constraint covering the columns `[match_id]` on the table `match_penalty_scores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "match_penalty_scores_match_id_key" ON "match_penalty_scores"("match_id");
