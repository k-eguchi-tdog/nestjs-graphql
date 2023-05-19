-- CreateTable
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "deadline" DATETIME NOT NULL,
    "detail" TEXT NOT NULL,
    "priority_id" INTEGER NOT NULL,
    "done" BOOLEAN NOT NULL,
    CONSTRAINT "Todo_priority_id_fkey" FOREIGN KEY ("priority_id") REFERENCES "Priority" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Priority" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
