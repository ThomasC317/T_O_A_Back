-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Save" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "villageId" INTEGER,

    CONSTRAINT "Save_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Village" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "resourcePerSecond" INTEGER NOT NULL,
    "resource" INTEGER NOT NULL,
    "totalResource" INTEGER NOT NULL,
    "remainingSkillPoints" INTEGER NOT NULL,

    CONSTRAINT "Village_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farmer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "baseResourcePerSecond" INTEGER NOT NULL,
    "quality" INTEGER NOT NULL,

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "icon" TEXT NOT NULL,
    "generalType" INTEGER NOT NULL,
    "quality" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quality" INTEGER NOT NULL,

    CONSTRAINT "Servant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apogee" (
    "id" SERIAL NOT NULL,
    "villageId" INTEGER,
    "maxResource" INTEGER NOT NULL,
    "maxFarmersLevel" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "statMultiplier" INTEGER NOT NULL,

    CONSTRAINT "Apogee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "villageId" INTEGER,
    "statId" INTEGER,
    "assignedPoints" INTEGER NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageServant" (
    "id" SERIAL NOT NULL,
    "servantId" INTEGER,

    CONSTRAINT "VillageServant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServantStat" (
    "id" SERIAL NOT NULL,
    "servantId" INTEGER,
    "statId" INTEGER,
    "value" INTEGER NOT NULL,

    CONSTRAINT "ServantStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageFarmer" (
    "id" SERIAL NOT NULL,
    "villageId" INTEGER,
    "farmerId" INTEGER,
    "totalResourceGenerated" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "level" INTEGER NOT NULL,
    "quality" INTEGER NOT NULL,
    "nextUpgradeCost" INTEGER NOT NULL,
    "resourcePerSecond" INTEGER NOT NULL,

    CONSTRAINT "VillageFarmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageItem" (
    "id" SERIAL NOT NULL,
    "villageId" INTEGER,
    "itemId" INTEGER,
    "apogeeLevel" INTEGER NOT NULL,

    CONSTRAINT "VillageItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageFarmerVillageItem" (
    "id" SERIAL NOT NULL,
    "villageFarmerId" INTEGER,
    "villageItemId" INTEGER,

    CONSTRAINT "VillageFarmerVillageItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemStat" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER,
    "statId" INTEGER,
    "value" INTEGER NOT NULL,

    CONSTRAINT "ItemStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageShop" (
    "id" SERIAL NOT NULL,
    "villageId" INTEGER,

    CONSTRAINT "VillageShop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VillageShopItem" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER,
    "villageShopId" INTEGER,

    CONSTRAINT "VillageShopItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VillageToVillageServant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_VillageToVillageServant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Save_villageId_key" ON "Save"("villageId");

-- CreateIndex
CREATE UNIQUE INDEX "Apogee_villageId_key" ON "Apogee"("villageId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_villageId_key" ON "Skill"("villageId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_statId_key" ON "Skill"("statId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageServant_servantId_key" ON "VillageServant"("servantId");

-- CreateIndex
CREATE UNIQUE INDEX "ServantStat_servantId_key" ON "ServantStat"("servantId");

-- CreateIndex
CREATE UNIQUE INDEX "ServantStat_statId_key" ON "ServantStat"("statId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageFarmer_villageId_key" ON "VillageFarmer"("villageId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageFarmer_farmerId_key" ON "VillageFarmer"("farmerId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageItem_villageId_key" ON "VillageItem"("villageId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageItem_itemId_key" ON "VillageItem"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageFarmerVillageItem_villageFarmerId_key" ON "VillageFarmerVillageItem"("villageFarmerId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageFarmerVillageItem_villageItemId_key" ON "VillageFarmerVillageItem"("villageItemId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStat_itemId_key" ON "ItemStat"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStat_statId_key" ON "ItemStat"("statId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageShop_villageId_key" ON "VillageShop"("villageId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageShopItem_itemId_key" ON "VillageShopItem"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "VillageShopItem_villageShopId_key" ON "VillageShopItem"("villageShopId");

-- CreateIndex
CREATE INDEX "_VillageToVillageServant_B_index" ON "_VillageToVillageServant"("B");

-- AddForeignKey
ALTER TABLE "Save" ADD CONSTRAINT "Save_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Save" ADD CONSTRAINT "Save_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apogee" ADD CONSTRAINT "Apogee_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageServant" ADD CONSTRAINT "VillageServant_servantId_fkey" FOREIGN KEY ("servantId") REFERENCES "Servant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServantStat" ADD CONSTRAINT "ServantStat_servantId_fkey" FOREIGN KEY ("servantId") REFERENCES "Servant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServantStat" ADD CONSTRAINT "ServantStat_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageFarmer" ADD CONSTRAINT "VillageFarmer_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageFarmer" ADD CONSTRAINT "VillageFarmer_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageItem" ADD CONSTRAINT "VillageItem_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageItem" ADD CONSTRAINT "VillageItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageFarmerVillageItem" ADD CONSTRAINT "VillageFarmerVillageItem_villageFarmerId_fkey" FOREIGN KEY ("villageFarmerId") REFERENCES "VillageFarmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageFarmerVillageItem" ADD CONSTRAINT "VillageFarmerVillageItem_villageItemId_fkey" FOREIGN KEY ("villageItemId") REFERENCES "VillageItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStat" ADD CONSTRAINT "ItemStat_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "VillageFarmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStat" ADD CONSTRAINT "ItemStat_statId_fkey" FOREIGN KEY ("statId") REFERENCES "VillageItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageShop" ADD CONSTRAINT "VillageShop_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageShopItem" ADD CONSTRAINT "VillageShopItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageShopItem" ADD CONSTRAINT "VillageShopItem_villageShopId_fkey" FOREIGN KEY ("villageShopId") REFERENCES "VillageShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VillageToVillageServant" ADD CONSTRAINT "_VillageToVillageServant_A_fkey" FOREIGN KEY ("A") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VillageToVillageServant" ADD CONSTRAINT "_VillageToVillageServant_B_fkey" FOREIGN KEY ("B") REFERENCES "VillageServant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
