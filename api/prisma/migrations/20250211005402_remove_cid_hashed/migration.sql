/*
  Warnings:

  - You are about to drop the column `cidHashed` on the `Document` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "txid" TEXT NOT NULL,
    "cid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Document" ("cid", "createdAt", "id", "txid") SELECT "cid", "createdAt", "id", "txid" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
CREATE UNIQUE INDEX "Document_txid_key" ON "Document"("txid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
