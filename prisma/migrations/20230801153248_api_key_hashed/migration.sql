/*
  Warnings:

  - You are about to drop the column `apiKey` on the `ApiKey` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[prefix]` on the table `ApiKey` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hashedKey]` on the table `ApiKey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashedKey` to the `ApiKey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefix` to the `ApiKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApiKey" DROP COLUMN "apiKey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hashedKey" TEXT NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "prefix" TEXT NOT NULL,
ALTER COLUMN "isEnabled" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_prefix_key" ON "ApiKey"("prefix");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_hashedKey_key" ON "ApiKey"("hashedKey");
