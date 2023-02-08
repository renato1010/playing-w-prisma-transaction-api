import { Barters } from "./all-barters";

export default function BartersPage() {
  return (
    <main className="h-full flex flex-col justify-start">
      <h2 className="text-[2rem] text-center text-blue-900">Barters: </h2>
      {/* @ts-expect-error Server Component */}
      <Barters />
    </main>
  );
}
