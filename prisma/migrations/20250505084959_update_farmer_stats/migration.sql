-- DropForeignKey
ALTER TABLE "FarmerStat" DROP CONSTRAINT "FarmerStat_farmerId_fkey";

-- DropForeignKey
ALTER TABLE "FarmerStat" DROP CONSTRAINT "FarmerStat_villageFarmerId_fkey";

-- DropIndex
DROP INDEX "FarmerStat_farmerId_statId_key";

-- AlterTable
ALTER TABLE "FarmerStat" ALTER COLUMN "farmerId" DROP NOT NULL,
ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "BaseStat" (
    "id" SERIAL NOT NULL,
    "farmerId" INTEGER NOT NULL,
    "statId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BaseStat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BaseStat" ADD CONSTRAINT "BaseStat_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaseStat" ADD CONSTRAINT "BaseStat_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmerStat" ADD CONSTRAINT "FarmerStat_villageFarmerId_fkey" FOREIGN KEY ("villageFarmerId") REFERENCES "VillageFarmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmerStat" ADD CONSTRAINT "FarmerStat_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
