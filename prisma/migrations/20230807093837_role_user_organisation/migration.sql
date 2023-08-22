/*
  Warnings:

  - Added the required column `role` to the `UserOrganisation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE TYPE "UserOrganisationRole" AS ENUM ('ADMIN');

ALTER TABLE "UserOrganisation" 
ADD COLUMN "role" "UserOrganisationRole";

UPDATE "UserOrganisation"
SET "role" = 'ADMIN';

ALTER TABLE "UserOrganisation"
ALTER COLUMN "role" SET NOT NULL;

ALTER TABLE "UserOrganisation"
ALTER COLUMN "role" DROP DEFAULT;
