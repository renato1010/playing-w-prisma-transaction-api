import { z } from "zod";
import { startExchangeSchema } from "@/utils/api/zod-schemas";
import { Exchange } from "@prisma/client";

type StartExReqBody = z.infer<typeof startExchangeSchema>;

async function startExchange(
  url: string = "api/exchanges/start",
  { arg }: { arg: StartExReqBody }
): Promise<Exchange> {
  const res = await fetch(url, {
    method: "post",
    body: JSON.stringify(arg),
  });
  return await res.json();
}

export { startExchange };
