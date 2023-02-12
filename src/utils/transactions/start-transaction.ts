import { z } from "zod";
import { prisma } from "@/db/client";
import { startExchangeSchema } from "@/utils/api/zod-schemas";

type ReqBody = z.infer<typeof startExchangeSchema>;

// run an interactive transaction:
// https://www.prisma.io/docs/concepts/components/prisma-client/transactions#interactive-transactions
async function startExchangeTransactions({
  providerId,
  acquirerId,
  providerItemId,
  acquirerItemId,
}: ReqBody) {
  return await prisma.$transaction(async (tx) => {
    // 1. check provider owns item and item status is other than NOTAVAILABLE
    const providerStuff = await tx.stuff.findFirst({
      where: {
        OR: [
          { id: providerItemId, barterId: providerId, status: "AVAILABLE" },
          { id: providerItemId, barterId: providerId, status: "SELECTED" },
        ],
      },
    });
    // 2. check acquirer owns acquirer item
    const acquirerStuff = await tx.stuff.findFirst({
      where: {
        OR: [
          { id: acquirerItemId, barterId: acquirerId, status: "AVAILABLE" },
          { id: acquirerItemId, barterId: acquirerId, status: "SELECTED" },
        ],
      },
    });
    if (!providerStuff || !acquirerStuff) {
      throw new Error("Exchange cancelled");
    }
    // 4. update provider item with status = SELECTED
    const _updateProviderStuff = await tx.stuff.update({
      where: { id: providerItemId },
      data: { status: "SELECTED" },
    });
    // 5. update  acquirer item with status = SELECTED
    const _updateAcquirerStuff = await tx.stuff.update({
      where: { id: acquirerItemId },
      data: { status: "SELECTED" },
    });
    // 6. create Exchange record
    const newExchange = await tx.exchange.create({
      data: { providerBarterId: providerId, acquirerBarterId: acquirerId, providerItemId, acquirerItemId },
    });
    return newExchange;
  });
}

export { startExchangeTransactions };
