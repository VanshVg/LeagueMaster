/*
  Warnings:

  - Made the column `created_at` on table `leagues` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "leagues" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL;
