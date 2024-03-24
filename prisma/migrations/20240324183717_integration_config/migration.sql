-- CreateTable
CREATE TABLE "ConfigIntegration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "params" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "requestPerMinute" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "ConfigIntegrationAuth" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ConfigIntegrationEndpoint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "paginated" BOOLEAN NOT NULL,
    "parent" INTEGER NOT NULL,
    "bodyFilter" TEXT NOT NULL,
    "urlParams" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ConfigIntegrationMapper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "endpoint" INTEGER NOT NULL,
    "entity" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL
);
