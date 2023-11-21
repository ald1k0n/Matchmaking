/*
  Warnings:

  - You are about to drop the column `matchRoomId` on the `UserMatch` table. All the data in the column will be lost.
  - You are about to drop the column `team1Id` on the `UserMatch` table. All the data in the column will be lost.
  - You are about to drop the column `team2Id` on the `UserMatch` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserMatch` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "steamId" TEXT,
    "userMatchId" INTEGER,
    "matchId" TEXT,
    CONSTRAINT "User_userMatchId_fkey" FOREIGN KEY ("userMatchId") REFERENCES "UserMatch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "MatchRoom" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "MatchRoom" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("id", "nickname", "password", "steamId") SELECT "id", "nickname", "password", "steamId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");
CREATE TABLE "new_UserMatch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_UserMatch" ("id") SELECT "id" FROM "UserMatch";
DROP TABLE "UserMatch";
ALTER TABLE "new_UserMatch" RENAME TO "UserMatch";
CREATE TABLE "new_MatchRoom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userMatchId" INTEGER,
    CONSTRAINT "MatchRoom_userMatchId_fkey" FOREIGN KEY ("userMatchId") REFERENCES "UserMatch" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MatchRoom" ("id") SELECT "id" FROM "MatchRoom";
DROP TABLE "MatchRoom";
ALTER TABLE "new_MatchRoom" RENAME TO "MatchRoom";
CREATE UNIQUE INDEX "MatchRoom_id_key" ON "MatchRoom"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
