/*
  Warnings:

  - Added the required column `role` to the `UserOrganisation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserOrganisation" 
ADD COLUMN "role" TEXT;

UPDATE "UserOrganisation"
SET "role" = 'admin';

ALTER TABLE "UserOrganisation"
ALTER COLUMN "role" SET NOT NULL;

ALTER TABLE "UserOrganisation"
ALTER COLUMN "role" DROP DEFAULT;
