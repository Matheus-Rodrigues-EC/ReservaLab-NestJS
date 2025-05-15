/*
  Warnings:

  - You are about to drop the `equipmetsReservations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "equipmetsReservations" DROP CONSTRAINT "equipmetsReservations_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "equipmetsReservations" DROP CONSTRAINT "equipmetsReservations_userId_fkey";

-- DropTable
DROP TABLE "equipmetsReservations";

-- CreateTable
CREATE TABLE "equipmentsreservations" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT[],
    "equipmentId" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipmentsreservations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipmentsreservations_date_time_equipmentId_key" ON "equipmentsreservations"("date", "time", "equipmentId");

-- AddForeignKey
ALTER TABLE "equipmentsreservations" ADD CONSTRAINT "equipmentsreservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipmentsreservations" ADD CONSTRAINT "equipmentsreservations_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
