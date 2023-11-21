-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "steamId" TEXT,
    "teamId" INTEGER,
    CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Friend" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "team" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "MatchRoom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamId_A" INTEGER NOT NULL,
    "teamId_B" INTEGER NOT NULL,
    CONSTRAINT "MatchRoom_teamId_A_fkey" FOREIGN KEY ("teamId_A") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MatchRoom_teamId_B_fkey" FOREIGN KEY ("teamId_B") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_user_friend" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_user_friend_A_fkey" FOREIGN KEY ("A") REFERENCES "Friend" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_user_friend_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "MatchRoom_id_key" ON "MatchRoom"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_user_friend_AB_unique" ON "_user_friend"("A", "B");

-- CreateIndex
CREATE INDEX "_user_friend_B_index" ON "_user_friend"("B");
