/*
  Warnings:

  - You are about to drop the column `rzr_payment_signature` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `via` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "rzr_payment_signature",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "method" TEXT NOT NULL,
ADD COLUMN     "via" TEXT NOT NULL;
