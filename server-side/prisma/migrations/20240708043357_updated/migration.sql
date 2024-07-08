/*
  Warnings:

  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "knockouts" (
    "id" SERIAL NOT NULL,
    "league_id" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,
    "league_position" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "knockouts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "knockouts" ADD CONSTRAINT "knockouts_league_id_fkey" FOREIGN KEY ("league_id") REFERENCES "leagues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knockouts" ADD CONSTRAINT "knockouts_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
