import { z } from "zod";

const postMethodSchema = z.literal("post");
const startExchangeSchema = z.object({
  providerId: z.string().cuid(),
  acquirerId: z.string().cuid(),
  providerItemId: z.string().cuid(),
  acquirerItemId: z.string().cuid(),
});

export { startExchangeSchema, postMethodSchema };
