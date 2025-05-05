/*
  Warnings:

  - A unique constraint covering the columns `[itemId,statId]` on the table `ItemStat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[servantId,statId]` on the table `ServantStat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[villageId,statId]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[villageId,apogeeId]` on the table `VillageApogee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[villageId,farmerId]` on the table `VillageFarmer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[servantId,villageId]` on the table `VillageServant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[itemId,villageShopId]` on the table `VillageShopItem` will be added. If there are existing duplicate values, this will fail.
  - Made the column `itemId` on table `ItemStat` required. This step will fail if there are existing NULL values in that column.
  - Made the column `statId` on table `ItemStat` required. This step will fail if there are existing NULL values in that column.
  - Made the column `servantId` on table `ServantStat` required. This step will fail if there are existing NULL values in that column.
  - Made the column `statId` on table `ServantStat` required. This step will fail if there are existing NULL values in that column.
  - Made the column `villageId` on table `Skill` required. This step will fail if there are existing NULL values in that column.
  - Made the column `statId` on table `Skill` required. This step will fail if there are existing NULL values in that column.
  - Made the column `villageId` on table `VillageApogee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `apogeeId` on table `VillageApogee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `villageId` on table `VillageFarmer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `farmerId` on table `VillageFarmer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `villageFarmerId` on table `VillageFarmerVillageItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `villageItemId` on table `VillageFarmerVillageItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `villageId` on table `VillageItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `itemId` on table `VillageItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `servantId` on table `VillageServant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `villageId` on table `VillageServant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `villageId` on table `VillageShop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `itemId` on table `VillageShopItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `villageShopId` on table `VillageShopItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ItemStat" DROP CONSTRAINT "ItemStat_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ItemStat" DROP CONSTRAINT "ItemStat_statId_fkey";

-- DropForeignKey
ALTER TABLE "VillageServant" DROP CONSTRAINT "VillageServant_servantId_fkey";

-- DropForeignKey
ALTER TABLE "VillageServant" DROP CONSTRAINT "VillageServant_villageId_fkey";

-- DropIndex
DROP INDEX "ItemStat_itemId_key";

-- DropIndex
DROP INDEX "ItemStat_statId_key";

-- DropIndex
DROP INDEX "ServantStat_servantId_key";

-- DropIndex
DROP INDEX "ServantStat_statId_key";

-- DropIndex
DROP INDEX "Skill_statId_key";

-- DropIndex
DROP INDEX "Skill_villageId_key";

-- DropIndex
DROP INDEX "VillageApogee_apogeeId_key";

-- DropIndex
DROP INDEX "VillageFarmer_farmerId_key";

-- DropIndex
DROP INDEX "VillageFarmer_villageId_key";

-- DropIndex
DROP INDEX "VillageItem_itemId_key";

-- DropIndex
DROP INDEX "VillageItem_villageId_key";

-- DropIndex
DROP INDEX "VillageServant_servantId_key";

-- DropIndex
DROP INDEX "VillageServant_villageId_key";

-- DropIndex
DROP INDEX "VillageShop_villageId_key";

-- DropIndex
DROP INDEX "VillageShopItem_itemId_key";

-- DropIndex
DROP INDEX "VillageShopItem_villageShopId_key";

-- AlterTable
ALTER TABLE "ItemStat" ALTER COLUMN "itemId" SET NOT NULL,
ALTER COLUMN "statId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ServantStat" ALTER COLUMN "servantId" SET NOT NULL,
ALTER COLUMN "statId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "villageId" SET NOT NULL,
ALTER COLUMN "statId" SET NOT NULL,
ALTER COLUMN "assignedPoints" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "VillageApogee" ALTER COLUMN "villageId" SET NOT NULL,
ALTER COLUMN "apogeeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "VillageFarmer" ALTER COLUMN "villageId" SET NOT NULL,
ALTER COLUMN "farmerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "VillageFarmerVillageItem" ALTER COLUMN "villageFarmerId" SET NOT NULL,
ALTER COLUMN "villageItemId" SET NOT NULL;

-- AlterTable
ALTER TABLE "VillageItem" ALTER COLUMN "villageId" SET NOT NULL,
ALTER COLUMN "itemId" SET NOT NULL;

-- AlterTable
ALTER TABLE "VillageServant" ALTER COLUMN "servantId" SET NOT NULL,
ALTER COLUMN "villageId" SET NOT NULL;

-- AlterTable
ALTER TABLE "VillageShop" ALTER COLUMN "villageId" SET NOT NULL;

-- AlterTable
ALTER TABLE "VillageShopItem" ALTER COLUMN "itemId" SET NOT NULL,
ALTER COLUMN "villageShopId" SET NOT NULL;

-- CreateTable
CREATE TABLE "VillageStat" (
    "id" SERIAL NOT NULL,
    "villageId" INTEGER NOT NULL,
    "statId" INTEGER NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "VillageStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FarmerStat" (
    "id" SERIAL NOT NULL,
    "farmerId" INTEGER NOT NULL,
    "statId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "villageFarmerId" INTEGER NOT NULL,

    CONSTRAINT "FarmerStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VillageStat_villageId_statId_key" ON "VillageStat"("villageId", "statId");

-- CreateIndex
CREATE UNIQUE INDEX "FarmerStat_farmerId_statId_key" ON "FarmerStat"("farmerId", "statId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStat_itemId_statId_key" ON "ItemStat"("itemId", "statId");

-- CreateIndex
CREATE UNIQUE INDEX "ServantStat_servantId_statId_key" ON "ServantStat"("servantId", "statId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_villageId_statId_key" ON "Skill"("villageId", "statId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageApogee_villageId_apogeeId_key" ON "VillageApogee"("villageId", "apogeeId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageFarmer_villageId_farmerId_key" ON "VillageFarmer"("villageId", "farmerId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageServant_servantId_villageId_key" ON "VillageServant"("servantId", "villageId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageShopItem_itemId_villageShopId_key" ON "VillageShopItem"("itemId", "villageShopId");

-- AddForeignKey
ALTER TABLE "VillageServant" ADD CONSTRAINT "VillageServant_servantId_fkey" FOREIGN KEY ("servantId") REFERENCES "Servant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageServant" ADD CONSTRAINT "VillageServant_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageStat" ADD CONSTRAINT "VillageStat_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageStat" ADD CONSTRAINT "VillageStat_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmerStat" ADD CONSTRAINT "FarmerStat_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmerStat" ADD CONSTRAINT "FarmerStat_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmerStat" ADD CONSTRAINT "FarmerStat_villageFarmerId_fkey" FOREIGN KEY ("villageFarmerId") REFERENCES "VillageFarmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStat" ADD CONSTRAINT "ItemStat_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStat" ADD CONSTRAINT "ItemStat_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "VillageItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
