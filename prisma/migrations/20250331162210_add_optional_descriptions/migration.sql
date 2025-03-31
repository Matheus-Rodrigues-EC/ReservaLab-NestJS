-- AlterTable
ALTER TABLE "classes" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "classrooms" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "reservations" ALTER COLUMN "description" DROP NOT NULL;
