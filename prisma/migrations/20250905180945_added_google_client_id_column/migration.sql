/*
  Warnings:

  - A unique constraint covering the columns `[google_client_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "google_client_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_google_client_id_key" ON "users"("google_client_id");
