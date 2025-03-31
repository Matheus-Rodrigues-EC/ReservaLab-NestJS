/*
  Warnings:

  - You are about to drop the column `rule` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_name_key";

-- DropIndex
DROP INDEX "users_surname_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "rule",
ADD COLUMN     "rulets" TEXT,
ALTER COLUMN "surname" DROP NOT NULL,
ALTER COLUMN "subject" DROP NOT NULL;
