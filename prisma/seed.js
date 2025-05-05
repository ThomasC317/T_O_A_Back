import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Création d'un utilisateur
  const user = await prisma.user.create({
    data: {
      username: 'player1',
      email: 'player1@example.com',
      password: 'password123', // à sécuriser pour un vrai projet
    },
  });

  // Création d'un Apogee
  const apogee = await prisma.apogee.create({
    data: {
      maxResource: 1000,
      maxFarmersLevel: 10,
      level: 1,
      statMultiplier: 1,
    },
  });

  // Création d'un Village
  const village = await prisma.village.create({
    data: {
      name: 'Village de départ',
      level: 1,
      resourcePerSecond: 10,
      resource: 100,
      totalResource: 100,
      remainingSkillPoints: 5,
      apogeeId: apogee.id,
    },
  });

  // Création d'un Save
  const save = await prisma.save.create({
    data: {
      userId: user.id,
      villageId: village.id,
      isActive: true,
    },
  });

  // Création de plusieurs fermiers
  const farmers = await prisma.farmer.createMany({
    data: [
      {
        name: 'Fermier 1',
        description: 'Un fermier ordinaire',
        baseResourcePerSecond: 5,
        quality: 1,
      },
      {
        name: 'Fermier 2',
        description: 'Un fermier expérimenté',
        baseResourcePerSecond: 10,
        quality: 2,
      },
      {
        name: 'Fermier 3',
        description: 'Fermier rare venu de loin',
        baseResourcePerSecond: 20,
        quality: 3,
      },
      {
        name: 'Fermier 4',
        description: 'Fermier légendaire de la montagne',
        baseResourcePerSecond: 35,
        quality: 4,
      },
      {
        name: 'Fermier 5',
        description: 'Le fermier mythique des anciens temps',
        baseResourcePerSecond: 50,
        quality: 5,
      },
    ],
  });

  // Création des relations entre fermiers et villages
  for (let farmer of farmers) {
    await prisma.villageFarmer.create({
      data: {
        villageId: village.id,
        farmerId: farmer.id,
        totalResourceGenerated: 0, // Initialiser la ressource générée à 0
        isActive: true,
        level: 1,
        quality: farmer.quality,
        nextUpgradeCost: 100, // Exemple de coût d'amélioration
        resourcePerSecond: farmer.baseResourcePerSecond,
      },
    });
  }

  // Création d'un Item
  const item1 = await prisma.item.create({
    data: {
      name: 'Item de test',
      description: 'Un item générique pour tester.',
      value: 10,
      icon: 'item-icon.png',
      generalType: 1,
      quality: 1,
      type: 1,
    },
  });

  await prisma.villageItem.create({
    data: {
      villageId: village.id,
      itemId: item1.id,
      apogeeLevel: 1,
    },
  });

  // Création d'un Serviteur
  const servant1 = await prisma.servant.create({
    data: {
      name: 'Serviteur 1',
      description: 'Un serviteur loyal.',
      quality: 1,
    },
  });

  await prisma.villageServant.create({
    data: {
      servantId: servant1.id,
      villageId: village.id,
    },
  });

  // Création d'une Stat
  const stat = await prisma.stat.create({
    data: {
      name: 'Force',
      description: 'Augmente les ressources générées par les fermiers.',
    },
  });

  await prisma.skill.create({
    data: {
      villageId: village.id,
      statId: stat.id,
      assignedPoints: 5,
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
