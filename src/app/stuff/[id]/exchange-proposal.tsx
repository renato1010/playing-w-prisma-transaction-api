"use client";
import { useState } from "react";
import { z } from "zod";
import { startExchangeSchema } from "@/utils/api/zod-schemas";

type ProviderData = {
  barterId: string;
  stuffId: string;
};
type ExchangeState = z.infer<typeof startExchangeSchema>;
type ExchangeProposalProps = {
  serializedData: string;
};
const ExchangeProposal = ({ serializedData }: ExchangeProposalProps) => {
  const { barterId, stuffId }: ProviderData = JSON.parse(serializedData);
  const [{ providerId, acquirerId, providerItemId, acquirerItemId }, setExState] = useState<ExchangeState>(
    () => ({
      providerId: barterId,
      acquirerId: "",
      providerItemId: stuffId,
      acquirerItemId: "",
    })
  );
  const [isOpen, setIsOpen] = useState(false);
  const [validationInfo, setValidationInfo] = useState("");

  const isExchangeStateValid = (state: unknown) => startExchangeSchema.safeParse(state).success;
  const validateState = () => {
    if (isExchangeStateValid({ providerId, acquirerId, providerItemId, acquirerItemId })) {
      setValidationInfo(`Validation OK`);
    } else {
      setValidationInfo(`Validation not OK`);
    }
  };
  console.log({ providerId, acquirerId, providerItemId, acquirerItemId });
  return (
    <div className="w-full my-6 p-4 flex justify-center">
      <details className="w-full flex justify-center p-6" open={isOpen}>
        <summary
          className={`w-full flex justify-center items-center px-4 py-6 list-none cursor-pointer
            ${isOpen ? "bg-sky-200" : "bg-white"}
          `}
          onClick={() => setIsOpen((val) => !val)}
        >
          Propose an exchange{" "}
          <span
            className="w-10 h-10 flex justify-center items-center ml-2 p-2 
          border-2 border-slate-300 rounded-full"
          >
            ➕
          </span>
        </summary>
        <div className="w-full flex flex-col justify-start items-center">
          <div className="w-full py-6 px-4 flex flex-col justify-start items-center">
            <label className="self-start" htmlFor="barterid">
              Your Barter Id:
            </label>
            <input
              name="barterid"
              className="appearance-none w-full p-2 border border-slate-300"
              type="text"
              placeholder="e.g adfasdrwewewrq82232"
              value={acquirerId}
              onChange={(e) => setExState((state) => ({ ...state, acquirerId: e.target.value }))}
            />
          </div>
          <div className="w-full py-6 px-4 flex flex-col justify-start items-center">
            <label className="self-start" htmlFor="stuffid">
              Exchange Item(offered) Id:
            </label>
            <input
              name="stuffid"
              className="appearance-none w-full p-2 border border-slate-300"
              type="text"
              placeholder="e.g afwoyewwlq2o311222o"
              value={acquirerItemId}
              onChange={(e) => setExState((state) => ({ ...state, acquirerItemId: e.target.value }))}
            />
          </div>
          <button
            onClick={validateState}
            className="w-full px-6 py-4 border border-blue-800 bg-blue-200 
          text-blue-900 cursor-pointer font-bold rounded-lg"
          >
            Send exchange proposal
          </button>
          <p>{validationInfo}</p>
        </div>
      </details>
    </div>
  );
};

export { ExchangeProposal };
