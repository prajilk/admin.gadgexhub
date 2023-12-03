/*
  Warnings:

  - You are about to drop the column `updated_at` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "updated_at",
ALTER COLUMN "phone" SET DATA TYPE TEXT;
