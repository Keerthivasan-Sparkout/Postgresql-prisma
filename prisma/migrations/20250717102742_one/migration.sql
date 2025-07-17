/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_mobile" TEXT NOT NULL,
    "user_bank" JSONB NOT NULL DEFAULT '{}',
    "comId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Company" (
    "com_id" SERIAL NOT NULL,
    "com_name" TEXT NOT NULL,
    "com_address" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("com_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_mobile_key" ON "User"("user_mobile");

-- CreateIndex
CREATE UNIQUE INDEX "Company_com_name_key" ON "Company"("com_name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_comId_fkey" FOREIGN KEY ("comId") REFERENCES "Company"("com_id") ON DELETE RESTRICT ON UPDATE CASCADE;
