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
  const stat1 = await prisma.stat.create(
    {
      data: {
        name: "Force",
        description: "Augmente les ressources obtenues par le village à chaque tick"
      },
    }
  )
  const role = await prisma.role.create(
    {
      data: {
        name: "Guerrier",
        description: "Utilise la force pour augmenter les ressources gagnées par le village",
        statId:stat1.id
      },
    }
  )

await prisma.villageChief.create({
    data: {
      name:'David le guerrier',
      roleId:role.id,
      villageId: village.id
    }
  })

  // Création d'un Save
  const save = await prisma.save.create({
    data: {
      userId: user.id,
      villageId: village.id,
      isActive: true,
    },
  });

const createdFarmers = [];

const farmersData = [
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
];

for (const farmerData of farmersData) {
  const farmer = await prisma.farmer.create({ data: farmerData });
  createdFarmers.push(farmer);
}

for (const farmer of createdFarmers) {
  await prisma.villageFarmer.create({
    data: {
      villageId: village.id,
      farmerId: farmer.id,
      totalResourceGenerated: 0,
      isActive: true,
      level: 1,
      quality: farmer.quality,
      nextUpgradeCost: 100,
      resourcePerSecond: farmer.baseResourcePerSecond,
    },
  });
}

  // Création d'un Item
  const item1 = await prisma.item.create({
    data: {
      name: 'Item de test',
      description: 'Un item générique pour tester.',
      basePrice: 10,
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

  const tt = await prisma.village.findFirst();
  const test = await prisma.villageChief.findMany(
);
console.log(test);
console.log(village)
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
