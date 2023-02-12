import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { postMethodSchema, startExchangeSchema } from "@/utils/api/zod-schemas";
import {
  ErrorStatus,
  HandlerErrorResponse,
  HandlerSuccessResponse,
  SuccessStatus,
  getErrorResponse,
  getSuccessResponse,
} from "@/utils/api/types";
import { getErrorMessage } from "@/utils/api/errors";
import { startExchangeTransactions } from "@/utils/transactions/start-transaction";
import { Exchange } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerSuccessResponse<SuccessStatus, Exchange> | HandlerErrorResponse<ErrorStatus>>
) {
  // always use http methods as lowercase
  const method = req.method?.toLowerCase() ?? null;
  const body = req.body;
  try {
    // validate schema for body and for req method
    const { acquirerId, acquirerItemId, providerId, providerItemId } = startExchangeSchema.parse(body);
    const _parsedMethod = postMethodSchema.parse(method);
    const updatedItems = await startExchangeTransactions({
      providerId,
      acquirerId,
      providerItemId,
      acquirerItemId,
    });
    const successResponse = getSuccessResponse(200, updatedItems);
    res.status(200).json(successResponse);
  } catch (error) {
    const transactionErrorMsg = getErrorMessage(error);
    console.log({ transactionErrorMsg });
    const errorResponse = getErrorResponse(400);
    res.json(errorResponse);
  }
}
