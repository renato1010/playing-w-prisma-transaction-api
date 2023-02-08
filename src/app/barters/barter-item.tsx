"use client";
import Link from "next/link";
import type { Barter } from "@/utils/barters";

type BarterItemProps = {
  serializedData: string;
};
const BarterItem = ({ serializedData }: BarterItemProps) => {
  const { user }: Barter = JSON.parse(serializedData);

  return (
    <Link className="text-center font-bold text-blue-500" href={`/barters/${user}`}>
      {user}
    </Link>
  );
};

export { BarterItem };
