/*
  Warnings:

  - You are about to drop the column `amount` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `basePrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "amount",
ADD COLUMN     "basePrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "offerPrice" DOUBLE PRECISION NOT NULL;
