/*
  Warnings:

  - You are about to drop the column `user_id` on the `leagues` table. All the data in the column will be lost.
  - Added the required column `role` to the `league_users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LeagueRole" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "league_users" ADD COLUMN     "role" "LeagueRole" NOT NULL;

-- AlterTable
ALTER TABLE "leagues" DROP COLUMN "user_id";
