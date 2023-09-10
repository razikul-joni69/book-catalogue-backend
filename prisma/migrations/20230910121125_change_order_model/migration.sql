/*
  Warnings:

  - You are about to drop the column `orderedBooks` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_orderedBooks_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderedBooks";

-- CreateTable
CREATE TABLE "_BookToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToOrder_AB_unique" ON "_BookToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToOrder_B_index" ON "_BookToOrder"("B");

-- AddForeignKey
ALTER TABLE "_BookToOrder" ADD CONSTRAINT "_BookToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToOrder" ADD CONSTRAINT "_BookToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
