import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Création d'un utilisateur
  const user = await prisma.user.create({
    data: {
      username: "Hero",
      email: "hero@example.com",
      password: "securepassword", // Pense à hasher les mots de passe en prod !
    },
  });

  // Création d'un village
  const village = await prisma.village.create({
    data: {
      name: "Village du Héros",
    },
  });

  // Création d'une sauvegarde liée à l'utilisateur et au village
  await prisma.save.create({
    data: {
      userId: user.id,
      villageId: village.id,
    },
  });

  console.log("Seeding terminé !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });