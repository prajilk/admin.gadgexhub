/*
  Warnings:

  - You are about to drop the column `google_id` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "google_id",
ADD COLUMN     "providerAccountId" TEXT;
