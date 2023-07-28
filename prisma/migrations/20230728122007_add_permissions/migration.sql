-- CreateEnum
CREATE TYPE "ApiPermissions" AS ENUM ('CREATE_TEST_EXECUTION', 'CREATE_TEST_RUN', 'GET_RUN');

-- AlterTable
ALTER TABLE "ApiKey" ADD COLUMN     "permissions" "ApiPermissions"[];
