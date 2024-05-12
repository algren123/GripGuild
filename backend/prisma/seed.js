import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const fakeGym = prisma.gym.create({
    data: {
      name: "Depot Armley",
      address: " Unit 1, Maybrook Industrial Park, Armley Rd, Armley, Leeds",
      postcode: "LS12 2EL",
      description: "A bouldering gym in Leeds",
      openingHours: "10:00 - 22:00",
      contactNumber: "0113 345 3456",
      contactEmail: "abvc@depot.com",
      website: "https://www.depotclimbing.com/armley",
    },
  });

  console.log(fakeGym);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
