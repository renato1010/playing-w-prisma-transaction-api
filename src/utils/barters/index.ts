import { prisma } from "@/db/client";
import type { Barter } from "@prisma/client";

export async function getAllBarters(): Promise<Barter[]> {
  return await prisma.barter.findMany();
}



export { Barter };
