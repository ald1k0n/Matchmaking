/*
  Warnings:

  - You are about to drop the `Friend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_user_friend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `teamId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teamId_A` on the `MatchRoom` table. All the data in the column will be lost.
  - You are about to drop the column `teamId_B` on the `MatchRoom` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_user_friend_B_index";

-- DropIndex
DROP INDEX "_user_friend_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Friend";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Team";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_user_friend";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserMatch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "team1Id" TEXT NOT NULL,
    "team2Id" TEXT NOT NULL,
    CONSTRAINT "UserMatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMatch_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "MatchRoom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMatch_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "MatchRoom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "steamId" TEXT
);
INSERT INTO "new_User" ("id", "nickname", "password", "steamId") SELECT "id", "nickname", "password", "steamId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");
CREATE TABLE "new_MatchRoom" (
    "id" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_MatchRoom" ("id") SELECT "id" FROM "MatchRoom";
DROP TABLE "MatchRoom";
ALTER TABLE "new_MatchRoom" RENAME TO "MatchRoom";
CREATE UNIQUE INDEX "MatchRoom_id_key" ON "MatchRoom"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
