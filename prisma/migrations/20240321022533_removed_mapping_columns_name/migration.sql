/*
  Warnings:

  - You are about to drop the column `business_name` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `company_name` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `cpf_cnpj` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `creation_date` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `id_price_list` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `id_seller` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `people_type` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `seller_name` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `average_cost_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `cost_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `creation_date` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `promocional_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `variation_type` on the `Product` table. All the data in the column will be lost.
  - Added the required column `creationDate` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPriceiList` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idSeller` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerName` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxID` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageCostPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promocionalPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variationType` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Partner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "creationDate" DATETIME NOT NULL
);
INSERT INTO "new_Partner" ("active", "area", "city", "code", "complement", "email", "id", "phone", "state", "street", "zip") SELECT "active", "area", "city", "code", "complement", "email", "id", "phone", "state", "street", "zip" FROM "Partner";
DROP TABLE "Partner";
ALTER TABLE "new_Partner" RENAME TO "Partner";
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "promocionalPrice" DECIMAL NOT NULL,
    "costPrice" DECIMAL NOT NULL,
    "averageCostPrice" DECIMAL NOT NULL,
    "unit" TEXT NOT NULL,
    "gtin" TEXT NOT NULL,
    "variationType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "creationDate" DATETIME,
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
INSERT INTO "new_Product" ("IPIClass", "additionalDescription", "brand", "category", "cest", "class", "code", "codeListService", "fixedIPIValue", "grossWeight", "gtin", "gtinPackaging", "guarantee", "id", "idParent", "linkVideo", "location", "maximumStock", "minimumStock", "name", "ncm", "netWeight", "note", "origin", "packagingDiameter", "packagingHeight", "packagingLength", "packagingType", "packagingWidth", "price", "seoDescription", "seoKeywords", "seoTitle", "situation", "slug", "type", "unit", "unitsPerBox") SELECT "IPIClass", "additionalDescription", "brand", "category", "cest", "class", "code", "codeListService", "fixedIPIValue", "grossWeight", "gtin", "gtinPackaging", "guarantee", "id", "idParent", "linkVideo", "location", "maximumStock", "minimumStock", "name", "ncm", "netWeight", "note", "origin", "packagingDiameter", "packagingHeight", "packagingLength", "packagingType", "packagingWidth", "price", "seoDescription", "seoKeywords", "seoTitle", "situation", "slug", "type", "unit", "unitsPerBox" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
