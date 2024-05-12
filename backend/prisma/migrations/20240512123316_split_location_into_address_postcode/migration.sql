/*
  Warnings:

  - You are about to drop the column `location` on the `Gym` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gym" DROP COLUMN "location",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "postcode" TEXT;
