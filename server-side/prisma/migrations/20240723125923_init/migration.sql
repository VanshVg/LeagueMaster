/*
  Warnings:

  - You are about to drop the column `is_archived` on the `leagues` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "league_users" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "leagues" DROP COLUMN "is_archived";
