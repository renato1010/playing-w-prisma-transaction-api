import { prisma } from "../src/db/client";
import { faker } from "@faker-js/faker";

async function main() {
  Array.from({ length: 10 }).forEach(async (_) => {
    await prisma.barter.create({
      data: {
        user: faker.internet.userName(),
        offers: {
          createMany: {
            data: [
              { title: faker.commerce.productName(), description: faker.commerce.productName() },
              { title: faker.commerce.productName(), description: faker.commerce.productName() },
              { title: faker.commerce.productName(), description: faker.commerce.productName() },
            ],
          },
        },
      },
    });
  });
}

main()
  .then(async () => {
    console.log("seeding successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
