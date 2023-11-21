/*
  Warnings:

  - You are about to drop the column `matchId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,userMatchId]` on the table `MatchRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "steamId" TEXT,
    "userMatchId" INTEGER,
    "matchIdA" TEXT,
    "matchIdB" TEXT,
    CONSTRAINT "User_userMatchId_fkey" FOREIGN KEY ("userMatchId") REFERENCES "UserMatch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_matchIdA_fkey" FOREIGN KEY ("matchIdA") REFERENCES "MatchRoom" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_matchIdB_fkey" FOREIGN KEY ("matchIdB") REFERENCES "MatchRoom" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("id", "nickname", "password", "steamId", "userMatchId") SELECT "id", "nickname", "password", "steamId", "userMatchId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "MatchRoom_id_userMatchId_key" ON "MatchRoom"("id", "userMatchId");
