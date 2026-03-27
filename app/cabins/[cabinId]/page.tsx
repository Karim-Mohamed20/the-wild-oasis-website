import { getCabin, getCabins } from "@/app/_lib/data-service";
import Reservations from "@/app/_components/Reservations";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";


// export const metadata = {
//     tilte:"Cabin",
// }

export async function generateMetadata({params}) {
    const {name} = await getCabin(params.cabinId);
    return {title:`Cabin ${name}`};
}

export async function generateStaticParams () {
  const cabins = await getCabins();
  const ids = cabins.map(cabin => ({cabinId:String(cabin.id)}));
  return ids;
}

export default async function Page({params}) {
    const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-4 sm:mt-8">
      <Cabin cabin={cabin}/>
      <div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold text-center mb-6 sm:mb-10 text-accent-400">
          Reserve cabin {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner/>}>
          <Reservations cabin={cabin}/>
        </Suspense>
      </div>
    </div>
  );
}
