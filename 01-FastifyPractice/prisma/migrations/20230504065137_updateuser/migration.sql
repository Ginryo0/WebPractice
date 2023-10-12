/*
  Warnings:

  - You are about to drop the column `productWeight` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `userAddress` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productWeight";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userAddress",
ADD COLUMN     "address" TEXT NOT NULL DEFAULT 'address';
