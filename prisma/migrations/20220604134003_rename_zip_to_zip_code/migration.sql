/*
  Warnings:

  - You are about to drop the column `zip` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `zipCode` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "zip",
ADD COLUMN     "zipCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "address",
ADD COLUMN     "street" TEXT;
