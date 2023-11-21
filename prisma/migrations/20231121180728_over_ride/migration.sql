/*
  Warnings:

  - You are about to alter the column `team1Id` on the `UserMatch` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `team2Id` on the `UserMatch` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserMatch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "team1Id" INTEGER,
    "team2Id" INTEGER,
    CONSTRAINT "UserMatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMatch_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "UserMatch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UserMatch_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "UserMatch" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UserMatch" ("id", "team1Id", "team2Id", "userId") SELECT "id", "team1Id", "team2Id", "userId" FROM "UserMatch";
DROP TABLE "UserMatch";
ALTER TABLE "new_UserMatch" RENAME TO "UserMatch";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
