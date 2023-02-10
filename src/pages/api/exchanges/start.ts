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

type BodyResponse = z.infer<typeof startExchangeSchema>;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    HandlerSuccessResponse<SuccessStatus, BodyResponse> | HandlerErrorResponse<ErrorStatus>
  >
) {
  const method = req.method;
  const body = req.body;
  if (postMethodSchema.safeParse(method).success && startExchangeSchema.safeParse(body).success) {
    const responseBody: HandlerSuccessResponse<201, BodyResponse> = getSuccessResponse(
      201,
      startExchangeSchema.parse(body)
    );
    res.json(responseBody);
  } else {
    const errorResponse = getErrorResponse(400);
    res.json(errorResponse);
  }
}
