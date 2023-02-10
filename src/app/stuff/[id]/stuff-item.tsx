"use client";
import type { Stuff } from "@prisma/client";
import { ExchangeProposal } from "./exchange-proposal";

type StuffItemProps = {
  serializedProps: string;
};
const StuffItem = ({ serializedProps }: StuffItemProps) => {
  const { barterId, id, title, description, status, createdAt }: Stuff = JSON.parse(serializedProps);
  // console.log({ title, description, status, createdAt });
  const formattedDate = new Intl.DateTimeFormat("es-GT").format(new Date(createdAt));
  return (
    <div className="w-full mx-auto p-8 md:w-1/2 flex flex-col justify-start items-center">
      <div className="flex flex-col justify-start items-center">
        <h3 className="text-center text-lg font-bold uppercase">{title}</h3>
        <p className="text-justify font-serif">{description}</p>
        <p className="text-justify font-serif">Item Id: {id}</p>
      </div>
      <p className="text-center p-6 text-lg">
        Status:{" "}
        <span
          className={
            `${
              status === "NOTAVAILABLE"
                ? "bg-red-300"
                : status === "AVAILABLE"
                ? "bg-green-300"
                : "bg-sky-300"
            }` +
            " " +
            `px-4 py-2 rounded-md`
          }
        >
          {status}
        </span>
      </p>
      <div className="w-full flex justify-center">
        <label className="px-4 py-2" htmlFor="since">
          available since:{" "}
        </label>
        <input
          className="appearance-none rounded-md bg-slate-200 px-6 text-center w-1/2"
          type="text"
          value={formattedDate}
          disabled
        />
      </div>
      {/* client side form component */}
      {status === "NOTAVAILABLE" ? null : (
        <ExchangeProposal serializedData={JSON.stringify({ barterId, stuffId: id })} />
      )}
    </div>
  );
};

export { StuffItem };
