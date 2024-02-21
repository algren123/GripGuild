/*
  Warnings:

  - The values [AllGenders,MaleOnly,FemaleOnly] on the enum `GenderPref` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GenderPref_new" AS ENUM ('ALLGENDERS', 'MALEONLY', 'FEMALEONLY');
ALTER TABLE "Session" ALTER COLUMN "gender_pref" TYPE "GenderPref_new" USING ("gender_pref"::text::"GenderPref_new");
ALTER TYPE "GenderPref" RENAME TO "GenderPref_old";
ALTER TYPE "GenderPref_new" RENAME TO "GenderPref";
DROP TYPE "GenderPref_old";
COMMIT;
