/*
  Warnings:

  - Added the required column `average_cost_price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situation` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
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
    "creation_date" DATETIME NOT NULL,
    "situation" TEXT NOT NULL
);
INSERT INTO "new_Product" ("code", "cost_price", "creation_date", "gtin", "id", "location", "name", "price", "promocional_price", "unit", "variation_type") SELECT "code", "cost_price", "creation_date", "gtin", "id", "location", "name", "price", "promocional_price", "unit", "variation_type" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
