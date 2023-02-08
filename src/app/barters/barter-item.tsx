"use client";
import Link from "next/link";
import type { Barter } from "@/utils/barters";

type BarterItemProps = {
  serializedData: string;
};
const BarterItem = ({ serializedData }: BarterItemProps) => {
  const { user, id }: Barter = JSON.parse(serializedData);

  return (
    <Link className="text-center font-bold text-blue-500" href={`/barters/${id}`}>
      {user}
    </Link>
  );
};

export { BarterItem };
