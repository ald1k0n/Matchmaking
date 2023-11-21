-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserMatch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "team1Id" INTEGER,
    "team2Id" INTEGER,
    "matchRoomId" TEXT,
    CONSTRAINT "UserMatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMatch_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "UserMatch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UserMatch_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "UserMatch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UserMatch_matchRoomId_fkey" FOREIGN KEY ("matchRoomId") REFERENCES "MatchRoom" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UserMatch" ("id", "team1Id", "team2Id", "userId") SELECT "id", "team1Id", "team2Id", "userId" FROM "UserMatch";
DROP TABLE "UserMatch";
ALTER TABLE "new_UserMatch" RENAME TO "UserMatch";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;