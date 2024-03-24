-- CreateTable
CREATE TABLE "ConfigIntegration" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "params" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "requestPerMinute" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "ConfigIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigIntegrationAuth" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "ConfigIntegrationAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigIntegrationEndpoint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "paginated" BOOLEAN NOT NULL,
    "parent" INTEGER NOT NULL,
    "bodyFilter" TEXT NOT NULL,
    "urlParams" TEXT NOT NULL,

    CONSTRAINT "ConfigIntegrationEndpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigIntegrationMapper" (
    "id" TEXT NOT NULL,
    "endpoint" INTEGER NOT NULL,
    "entity" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,

    CONSTRAINT "ConfigIntegrationMapper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
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

