import { getStuffByID } from "@/utils/stuff";
import { Stuff } from "@prisma/client";
import { StuffItem } from "./stuff-item";

export default async function StuffIdPage({ params: { id } }: { params: { id: string } }) {
  const stuff: Stuff = (await getStuffByID(id))!;
  const serializedStuff = JSON.stringify(stuff);

  return (
    <div>
      <StuffItem serializedProps={serializedStuff} />
    </div>
  );
}
