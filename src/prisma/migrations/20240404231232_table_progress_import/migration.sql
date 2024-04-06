-- AlterTable
ALTER TABLE "ConfigIntegration" ALTER COLUMN "params" SET DEFAULT '{}';

-- CreateTable
CREATE TABLE "IntegrationProgress" (
    "id" UUID NOT NULL,
    "key" VARCHAR(50) NOT NULL,
    "startDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP,
    "step" INTEGER NOT NULL,
    "totalSteps" INTEGER NOT NULL,

    CONSTRAINT "IntegrationProgress_pkey" PRIMARY KEY ("id")
);
