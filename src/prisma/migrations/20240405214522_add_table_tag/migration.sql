-- AlterTable
ALTER TABLE "ConfigIntegration" ALTER COLUMN "params" SET DEFAULT '{}';

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);
