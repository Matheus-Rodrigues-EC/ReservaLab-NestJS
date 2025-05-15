/*
  Warnings:

  - A unique constraint covering the columns `[name,type]` on the table `equipments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "equipments_name_type_key" ON "equipments"("name", "type");
