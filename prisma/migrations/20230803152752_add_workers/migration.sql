/*
  Warnings:

  - Added the required column `workerId` to the `TestExecution` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkerStatus" AS ENUM ('PENDING', 'STARTED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Executor" AS ENUM ('ECS', 'LAMBDA', 'LOCAL');

-- AlterTable
ALTER TABLE "TestExecution" ADD COLUMN     "workerId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "TestRun" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Worker" (
    "id" UUID NOT NULL,
    "status" "WorkerStatus" NOT NULL,
    "executor" "Executor" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "testRunId" UUID NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestExecution" ADD CONSTRAINT "TestExecution_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_testRunId_fkey" FOREIGN KEY ("testRunId") REFERENCES "TestRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
