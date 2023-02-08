import { prisma } from "../src/db/client";

async function clearDB() {
  await prisma.$transaction([prisma.stuff.deleteMany(), prisma.barter.deleteMany()]);
}

clearDB()
  .then(async () => {
    console.log("clearing successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
