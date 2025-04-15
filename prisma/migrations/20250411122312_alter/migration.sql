/*
  Warnings:

  - The `time` column on the `reservations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `date` on the `reservations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "time",
ADD COLUMN     "time" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "reservations_date_time_classroomId_key" ON "reservations"("date", "time", "classroomId");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_date_time_classId_key" ON "reservations"("date", "time", "classId");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_date_time_userId_key" ON "reservations"("date", "time", "userId");
