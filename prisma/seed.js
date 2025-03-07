import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Création des utilisateurs
  const user1 = await prisma.user.create({
    data: {
      username: 'Thomas',
      email: 'thomas@example.com',
      password: 'securepassword', // Hache en prod !
      saves: {
        create: {
          village: {
            create: {
              name: 'Village des Braves',
              level: 1,
              resourcePerSecond: 5,
              resource: 100,
              totalResource: 500,
              remainingSkillPoints: 10,
              skills: {
                create: {
                  stat: {
                    create: {
                      name: 'Force',
                      description: 'Augmente la puissance des serviteurs',
                    },
                  },
                  assignedPoints: 3,
                },
              },
              apogee: {
                create: {
                  maxResource: 1000,
                  maxFarmersLevel: 5,
                  level: 1,
                  statMultiplier: 2,
                },
              },
              villageServants: {
                create: {
                  servant: {
                    create: {
                      name: 'Garde du Village',
                      description: 'Protège le village des attaques',
                      quality: 2,
                      ServantStat: {
                        create: {
                          stat: {
                            create: { name: 'Défense', description: 'Réduit les dégâts reçus' },
                          },
                          value: 10,
                        },
                      },
                    },
                  },
                },
              },
              villageFarmers: {
                create: {
                  farmer: {
                    create: {
                      name: 'Fermier expérimenté',
                      description: 'Augmente la production de ressources',
                      baseResourcePerSecond: 3,
                      quality: 2,
                    },
                  },
                  totalResourceGenerated: 200,
                  isActive: true,
                  level: 2,
                  quality: 2,
                  nextUpgradeCost: 100,
                  resourcePerSecond: 6,
                },
              },
              villageItem: {
                create: {
                  item: {
                    create: {
                      name: 'Hache en bois',
                      description: 'Augmente la récolte de bois',
                      value: 50,
                      icon: '🪓',
                      generalType: 1,
                      quality: 1,
                      type: 1,
                    },
                  },
                  apogeeLevel: 1,
                },
              },
              villageShops: {
                create: {
                  villageShopItems: {
                    create: {
                      item: {
                        create: {
                          name: 'Potion de soin',
                          description: 'Restaure des points de vie',
                          value: 20,
                          icon: '🧪',
                          generalType: 2,
                          quality: 1,
                          type: 2,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  console.log('Seeding finished!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });