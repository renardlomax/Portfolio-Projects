/*
  Warnings:

  - Added the required column `state` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vertical` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lead" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vertical" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "state" TEXT NOT NULL,
    "city" TEXT,
    "zip" TEXT,
    "company" TEXT,
    "website" TEXT,
    "service" TEXT,
    "budget" TEXT,
    "message" TEXT,
    "source" TEXT,
    "utmMedium" TEXT,
    "utmSource" TEXT,
    "utmCampaign" TEXT
);
INSERT INTO "new_Lead" ("budget", "company", "createdAt", "email", "id", "message", "name", "phone", "website") SELECT "budget", "company", "createdAt", "email", "id", "message", "name", "phone", "website" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
CREATE INDEX "Lead_state_city_idx" ON "Lead"("state", "city");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
