/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Order_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");
