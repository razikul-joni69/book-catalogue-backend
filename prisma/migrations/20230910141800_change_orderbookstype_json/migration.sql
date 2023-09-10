/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookToOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "_BookToOrder" DROP CONSTRAINT "_BookToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToOrder" DROP CONSTRAINT "_BookToOrder_B_fkey";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "_BookToOrder";
