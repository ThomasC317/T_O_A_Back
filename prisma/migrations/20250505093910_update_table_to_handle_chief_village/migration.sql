-- DropIndex
DROP INDEX "VillageApogee_villageId_apogeeId_key";

-- CreateTable
CREATE TABLE "VillageChief" (
    "id" SERIAL NOT NULL,
    "villageId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "VillageChief_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "statId" INTEGER,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VillageChief_villageId_key" ON "VillageChief"("villageId");

-- AddForeignKey
ALTER TABLE "VillageChief" ADD CONSTRAINT "VillageChief_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VillageChief" ADD CONSTRAINT "VillageChief_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
