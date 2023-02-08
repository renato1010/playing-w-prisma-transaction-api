import { prisma } from "@/db/client";
import { Stuff } from "@prisma/client";

export async function getStuffByBarterId(barterId: string) {
  return await prisma.stuff.findMany({
    where: { barterId },
  });
}
export async function getStuffByID(stuffId: string): Promise<Stuff | null> {
  return await prisma.stuff.findUnique({
    where: { id: stuffId },
  });
}
