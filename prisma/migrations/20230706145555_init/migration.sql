-- CreateTable
CREATE TABLE "Organisation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "customPath" TEXT NOT NULL,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganisationApiKey" (
    "id" SERIAL NOT NULL,
    "apiKey" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL,
    "organisationId" INTEGER NOT NULL,

    CONSTRAINT "OrganisationApiKey_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrganisationApiKey" ADD CONSTRAINT "OrganisationApiKey_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
