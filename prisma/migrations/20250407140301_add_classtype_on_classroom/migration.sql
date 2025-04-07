/*
  Warnings:

  - A unique constraint covering the columns `[date,time,classroomId]` on the table `reservations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[date,time,classId]` on the table `reservations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[date,time,userId]` on the table `reservations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classType` to the `classrooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classrooms" ADD COLUMN     "classType" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reservations_date_time_classroomId_key" ON "reservations"("date", "time", "classroomId");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_date_time_classId_key" ON "reservations"("date", "time", "classId");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_date_time_userId_key" ON "reservations"("date", "time", "userId");
