/*
  Warnings:

  - You are about to alter the column `price` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.

*/
-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "price" SET DATA TYPE DECIMAL;
