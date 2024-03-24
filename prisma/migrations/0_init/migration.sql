-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "promocional_price" DECIMAL NOT NULL,
    "cost_price" DECIMAL NOT NULL,
    "unit" TEXT NOT NULL,
    "gtin" TEXT NOT NULL,
    "variation_type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "creation_date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "business_name" TEXT NOT NULL,
    "people_type" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "id_price_list" INTEGER NOT NULL,
    "id_seller" INTEGER NOT NULL,
    "seller_name" TEXT NOT NULL,
    "active" TEXT NOT NULL,
    "creation_date" DATETIME NOT NULL
);

