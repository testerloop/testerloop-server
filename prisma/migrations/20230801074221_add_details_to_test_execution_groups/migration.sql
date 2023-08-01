/*
  Warnings:

  - Added the required column `featureFile` to the `TestExecution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `featureFile` to the `TestExecutionGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testName` to the `TestExecutionGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestExecution" ADD COLUMN     "featureFile" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TestExecutionGroup" ADD COLUMN     "featureFile" TEXT NOT NULL,
ADD COLUMN     "testName" TEXT NOT NULL;
