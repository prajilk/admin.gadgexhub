/*
  Warnings:

  - Added the required column `expirationDate` to the `GuestUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GuestUser" ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL;
