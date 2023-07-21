-- CreateEnum
CREATE TYPE "RunStatus" AS ENUM ('RUNNING', 'COMPLETED', 'QUEUED');

-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('PASSED', 'FAILED', 'PENDING');

-- CreateTable
CREATE TABLE "TestRun" (
    "id" UUID NOT NULL,
    "status" "RunStatus" NOT NULL,
    "organisationId" UUID NOT NULL,

    CONSTRAINT "TestRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestExecution" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "result" "TestStatus" NOT NULL,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "until" TIMESTAMP(3),
    "testRunId" UUID NOT NULL,

    CONSTRAINT "TestExecution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestRun" ADD CONSTRAINT "TestRun_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestExecution" ADD CONSTRAINT "TestExecution_testRunId_fkey" FOREIGN KEY ("testRunId") REFERENCES "TestRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
