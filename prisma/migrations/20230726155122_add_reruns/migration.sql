/*
  Warnings:

  - The values [QUEUED] on the enum `RunStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PENDING] on the enum `TestStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `testExecutionGroupId` to the `TestExecution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RunStatus_new" AS ENUM ('RUNNING', 'COMPLETED');
ALTER TABLE "TestRun" ALTER COLUMN "status" TYPE "RunStatus_new" USING ("status"::text::"RunStatus_new");
ALTER TYPE "RunStatus" RENAME TO "RunStatus_old";
ALTER TYPE "RunStatus_new" RENAME TO "RunStatus";
DROP TYPE "RunStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TestStatus_new" AS ENUM ('PASSED', 'FAILED', 'IN_PROGRESS');
ALTER TABLE "TestExecution" ALTER COLUMN "result" TYPE "TestStatus_new" USING ("result"::text::"TestStatus_new");
ALTER TYPE "TestStatus" RENAME TO "TestStatus_old";
ALTER TYPE "TestStatus_new" RENAME TO "TestStatus";
DROP TYPE "TestStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "TestExecution" ADD COLUMN     "rerunOfId" UUID,
ADD COLUMN     "testExecutionGroupId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "TestExecutionGroup" (
    "id" UUID NOT NULL,

    CONSTRAINT "TestExecutionGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestExecution" ADD CONSTRAINT "TestExecution_rerunOfId_fkey" FOREIGN KEY ("rerunOfId") REFERENCES "TestExecution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestExecution" ADD CONSTRAINT "TestExecution_testExecutionGroupId_fkey" FOREIGN KEY ("testExecutionGroupId") REFERENCES "TestExecutionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
