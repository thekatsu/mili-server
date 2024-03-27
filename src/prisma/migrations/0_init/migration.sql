-- CreateEnum
CREATE TYPE "IntegrationType" AS ENUM ('REST', 'SOAP');

-- CreateEnum
CREATE TYPE "IntegrationAuthType" AS ENUM ('TOKEN', 'OAUTH2');

-- CreateTable
CREATE TABLE "ConfigIntegration" (
    "id" UUID NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "baseUrl" VARCHAR(255) NOT NULL,
    "token" VARCHAR(512) NOT NULL,
    "params" JSONB NOT NULL DEFAULT {token: config.token, formato: 'json'},
    "type" "IntegrationType" NOT NULL,
    "requestPerMinute" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "ConfigIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigIntegrationEndpoint" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "paginated" BOOLEAN NOT NULL,
    "parent" INTEGER NOT NULL,
    "bodyFilter" TEXT NOT NULL,
    "urlParams" TEXT NOT NULL,
    "configIntegrationId" UUID NOT NULL,

    CONSTRAINT "ConfigIntegrationEndpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigIntegrationAuth" (
    "id" UUID NOT NULL,
    "type" "IntegrationAuthType" NOT NULL,
    "configIntegrationEndpointId" UUID,

    CONSTRAINT "ConfigIntegrationAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigIntegrationMapper" (
    "id" UUID NOT NULL,
    "entity" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "configIntegrationEndpointId" UUID NOT NULL,

    CONSTRAINT "ConfigIntegrationMapper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" VARCHAR(50) NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "promocionalPrice" DECIMAL(65,30) NOT NULL,
    "costPrice" DECIMAL(65,30) NOT NULL,
    "averageCostPrice" DECIMAL(65,30) NOT NULL,
    "unit" TEXT NOT NULL,
    "gtin" TEXT NOT NULL,
    "variationType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3),
    "situation" TEXT NOT NULL,
    "ncm" TEXT,
    "origin" TEXT,
    "gtinPackaging" TEXT,
    "netWeight" DECIMAL(65,30),
    "grossWeight" DECIMAL(65,30),
    "minimumStock" DECIMAL(65,30),
    "maximumStock" DECIMAL(65,30),
    "unitsPerBox" TEXT,
    "type" TEXT,
    "IPIClass" TEXT,
    "fixedIPIValue" DECIMAL(65,30),
    "codeListService" TEXT,
    "additionalDescription" TEXT,
    "note" TEXT,
    "guarantee" TEXT,
    "cest" TEXT,
    "idParent" INTEGER,
    "toOrder" TEXT,
    "brand" TEXT,
    "packagingType" INTEGER,
    "packagingHeight" DECIMAL(65,30),
    "packagingWidth" DECIMAL(65,30),
    "packagingLength" DECIMAL(65,30),
    "packagingDiameter" DECIMAL(65,30),
    "category" TEXT,
    "class" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    "linkVideo" TEXT,
    "slug" TEXT,
    "importedDetails" BOOLEAN,
    "datailsImportedAt" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "taxID" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "idPriceiList" INTEGER NOT NULL,
    "idSeller" INTEGER NOT NULL,
    "sellerName" TEXT NOT NULL,
    "active" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ConfigIntegrationEndpoint" ADD CONSTRAINT "ConfigIntegrationEndpoint_configIntegrationId_fkey" FOREIGN KEY ("configIntegrationId") REFERENCES "ConfigIntegration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfigIntegrationAuth" ADD CONSTRAINT "ConfigIntegrationAuth_configIntegrationEndpointId_fkey" FOREIGN KEY ("configIntegrationEndpointId") REFERENCES "ConfigIntegrationEndpoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfigIntegrationMapper" ADD CONSTRAINT "ConfigIntegrationMapper_configIntegrationEndpointId_fkey" FOREIGN KEY ("configIntegrationEndpointId") REFERENCES "ConfigIntegrationEndpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

