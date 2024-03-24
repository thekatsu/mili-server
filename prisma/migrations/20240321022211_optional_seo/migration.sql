-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "promocional_price" DECIMAL NOT NULL,
    "cost_price" DECIMAL NOT NULL,
    "average_cost_price" DECIMAL NOT NULL,
    "unit" TEXT NOT NULL,
    "gtin" TEXT NOT NULL,
    "variation_type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "creation_date" DATETIME,
    "situation" TEXT NOT NULL,
    "ncm" TEXT,
    "origin" TEXT,
    "gtinPackaging" TEXT,
    "netWeight" DECIMAL,
    "grossWeight" DECIMAL,
    "minimumStock" DECIMAL,
    "maximumStock" DECIMAL,
    "unitsPerBox" TEXT,
    "type" TEXT,
    "IPIClass" TEXT,
    "fixedIPIValue" DECIMAL,
    "codeListService" TEXT,
    "additionalDescription" TEXT,
    "note" TEXT,
    "guarantee" TEXT,
    "cest" TEXT,
    "idParent" INTEGER,
    "brand" TEXT,
    "packagingType" INTEGER,
    "packagingHeight" DECIMAL,
    "packagingWidth" DECIMAL,
    "packagingLength" DECIMAL,
    "packagingDiameter" DECIMAL,
    "category" TEXT,
    "class" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    "linkVideo" TEXT,
    "slug" TEXT
);
INSERT INTO "new_Product" ("IPIClass", "additionalDescription", "average_cost_price", "brand", "category", "cest", "class", "code", "codeListService", "cost_price", "creation_date", "fixedIPIValue", "grossWeight", "gtin", "gtinPackaging", "guarantee", "id", "idParent", "linkVideo", "location", "maximumStock", "minimumStock", "name", "ncm", "netWeight", "note", "origin", "packagingDiameter", "packagingHeight", "packagingLength", "packagingType", "packagingWidth", "price", "promocional_price", "seoDescription", "seoKeywords", "seoTitle", "situation", "slug", "type", "unit", "unitsPerBox", "variation_type") SELECT "IPIClass", "additionalDescription", "average_cost_price", "brand", "category", "cest", "class", "code", "codeListService", "cost_price", "creation_date", "fixedIPIValue", "grossWeight", "gtin", "gtinPackaging", "guarantee", "id", "idParent", "linkVideo", "location", "maximumStock", "minimumStock", "name", "ncm", "netWeight", "note", "origin", "packagingDiameter", "packagingHeight", "packagingLength", "packagingType", "packagingWidth", "price", "promocional_price", "seoDescription", "seoKeywords", "seoTitle", "situation", "slug", "type", "unit", "unitsPerBox", "variation_type" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
