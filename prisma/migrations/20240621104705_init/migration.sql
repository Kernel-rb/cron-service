-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "daysOfWeek" INTEGER[],
    "time" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "isExecuted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
