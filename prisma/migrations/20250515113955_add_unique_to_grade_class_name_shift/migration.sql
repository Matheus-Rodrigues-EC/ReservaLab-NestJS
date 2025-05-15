/*
  Warnings:

  - A unique constraint covering the columns `[grade,className,shift]` on the table `classes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "classes_grade_className_shift_key" ON "classes"("grade", "className", "shift");
