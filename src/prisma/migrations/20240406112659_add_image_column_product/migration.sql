-- AlterTable
ALTER TABLE "ConfigIntegration" ALTER COLUMN "params" SET DEFAULT '{}';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image" TEXT;
