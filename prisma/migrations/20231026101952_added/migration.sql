/*
  Warnings:

  - You are about to drop the column `rzr_order_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `rzr_payment_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `rzr_payment_signature` on the `Order` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Order_rzr_order_id_key";

-- DropIndex
DROP INDEX "Order_rzr_payment_id_key";

-- DropIndex
DROP INDEX "orderId_index";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "rzr_order_id",
DROP COLUMN "rzr_payment_id",
DROP COLUMN "rzr_payment_signature",
ADD COLUMN     "payment_verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "rzr_order_id" TEXT NOT NULL,
    "rzr_payment_id" TEXT NOT NULL,
    "rzr_payment_signature" TEXT NOT NULL,
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_rzr_order_id_key" ON "Payment"("rzr_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_rzr_payment_id_key" ON "Payment"("rzr_payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_order_id_key" ON "Payment"("order_id");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
