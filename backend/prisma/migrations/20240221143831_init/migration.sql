/*
  Warnings:

  - The values [Pending,Accepted] on the enum `FriendshipStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Public,Private,FriendsOnly] on the enum `SessionType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Beginner,Intermediate,Advanced] on the enum `SkillLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FriendshipStatus_new" AS ENUM ('PENDING', 'ACCEPTED');
ALTER TABLE "Friendship" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Friendship" ALTER COLUMN "status" TYPE "FriendshipStatus_new" USING ("status"::text::"FriendshipStatus_new");
ALTER TYPE "FriendshipStatus" RENAME TO "FriendshipStatus_old";
ALTER TYPE "FriendshipStatus_new" RENAME TO "FriendshipStatus";
DROP TYPE "FriendshipStatus_old";
ALTER TABLE "Friendship" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SessionType_new" AS ENUM ('PUBLIC', 'PRIVATE', 'FRIENDSONLY');
ALTER TABLE "Session" ALTER COLUMN "type" TYPE "SessionType_new" USING ("type"::text::"SessionType_new");
ALTER TYPE "SessionType" RENAME TO "SessionType_old";
ALTER TYPE "SessionType_new" RENAME TO "SessionType";
DROP TYPE "SessionType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SkillLevel_new" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');
ALTER TABLE "User" ALTER COLUMN "climbing_level" TYPE "SkillLevel_new" USING ("climbing_level"::text::"SkillLevel_new");
ALTER TABLE "Session" ALTER COLUMN "skill_level" TYPE "SkillLevel_new" USING ("skill_level"::text::"SkillLevel_new");
ALTER TYPE "SkillLevel" RENAME TO "SkillLevel_old";
ALTER TYPE "SkillLevel_new" RENAME TO "SkillLevel";
DROP TYPE "SkillLevel_old";
COMMIT;

-- AlterTable
ALTER TABLE "Friendship" ALTER COLUMN "status" SET DEFAULT 'PENDING';
