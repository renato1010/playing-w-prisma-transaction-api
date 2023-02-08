import { getAllBarters } from "@/utils/barters";
import { BarterItem } from "./barter-item";

const Barters = async () => {
  const allBarters = await getAllBarters();
  return (
    <>
      <ul className="h-full pt-6 grid gap-4 content-start grid-cols-3">
        {allBarters.map((barter) => {
          const serializedBarter = JSON.stringify(barter);
          return <BarterItem key={barter.id} serializedData={serializedBarter} />;
        })}
      </ul>
    </>
  );
};

export { Barters };
