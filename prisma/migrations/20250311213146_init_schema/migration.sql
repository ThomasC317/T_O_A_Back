/*
  Warnings:

  - You are about to drop the column `villageId` on the `Apogee` table. All the data in the column will be lost.
  - You are about to drop the `_VillageToVillageServant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[villageId]` on the table `VillageServant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Apogee" DROP CONSTRAINT "Apogee_villageId_fkey";

-- DropForeignKey
ALTER TABLE "_VillageToVillageServant" DROP CONSTRAINT "_VillageToVillageServant_A_fkey";

-- DropForeignKey
ALTER TABLE "_VillageToVillageServant" DROP CONSTRAINT "_VillageToVillageServant_B_fkey";

-- DropIndex
DROP INDEX "Apogee_villageId_key";

-- AlterTable
ALTER TABLE "Apogee" DROP COLUMN "villageId";

-- AlterTable
ALTER TABLE "Village" ADD COLUMN     "apogeeId" INTEGER;

-- AlterTable
ALTER TABLE "VillageServant" ADD COLUMN     "villageId" INTEGER;

-- DropTable
DROP TABLE "_VillageToVillageServant";

-- CreateTable
CREATE TABLE "VillageApogee" (
    "id" SERIAL NOT NULL,
    "villageId" INTEGER,
    "apogeeId" INTEGER,

    CONSTRAINT "VillageApogee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VillageApogee_villageId_key" ON "VillageApogee"("villageId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageApogee_apogeeId_key" ON "VillageApogee"("apogeeId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageServant_villageId_key" ON "VillageServant"("villageId");

-- AddForeignKey
ALTER TABLE "Village" ADD CONSTRAINT "Village_apogeeId_fkey" FOREIGN KEY ("apogeeId") REFERENCES "Apogee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageServant" ADD CONSTRAINT "VillageServant_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageApogee" ADD CONSTRAINT "VillageApogee_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageApogee" ADD CONSTRAINT "VillageApogee_apogeeId_fkey" FOREIGN KEY ("apogeeId") REFERENCES "Apogee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
