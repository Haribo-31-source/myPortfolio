-- CreateTable
CREATE TABLE "AdminLogs" (
    "id" SERIAL NOT NULL,
    "logName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminLogs_pkey" PRIMARY KEY ("id")
);
