-- AlterTable
ALTER TABLE "ConfigIntegration" ALTER COLUMN "params" SET DEFAULT '{}';

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagGroupId" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagGroupId_fkey" FOREIGN KEY ("tagGroupId") REFERENCES "TagGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
