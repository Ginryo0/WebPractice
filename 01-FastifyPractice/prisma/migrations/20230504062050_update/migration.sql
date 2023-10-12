/*
  Warnings:

  - Added the required column `productWeight` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productWeight" INTEGER NOT NULL;
