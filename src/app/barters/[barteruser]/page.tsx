import { getStuffByBarterId } from "@/utils/stuff";
import Link from "next/link";

export default async function BarterStuffPage({
  params: { barteruser },
}: {
  params: { barteruser: string };
}) {
  const stuffList = await getStuffByBarterId(barteruser);

  return (
    <div className="h-full flex flex-col justify-start ">
      <ul className="h-full pt-6 grid gap-4 content-start grid-cols-3 ">
        {stuffList.map((stuff) => {
          return (
            <li className="text-center" key={stuff.id}>
              <Link href={`/stuff/${stuff.id}`}>{stuff.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
