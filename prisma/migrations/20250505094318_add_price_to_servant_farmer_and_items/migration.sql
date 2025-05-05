/*
  Warnings:

  - You are about to drop the column `value` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Farmer" ADD COLUMN     "basePrice" INTEGER NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "value",
ADD COLUMN     "basePrice" INTEGER NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "Servant" ADD COLUMN     "basePrice" INTEGER NOT NULL DEFAULT 100;
