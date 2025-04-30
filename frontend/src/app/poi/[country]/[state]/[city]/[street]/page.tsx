import { Title } from "@/components/elements/title";
import PoiCard from "@/components/poi/poi-card";
import db from "../../../../../../../static/db";
import { rawPoisToPois } from "@/lib/utils";
import { RawPoi } from "@/types/poi";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   const stmt = db.prepare(
//     "SELECT DISTINCT country, state, city, street FROM pois"
//   );

//   const streets = stmt.all() as {
//     country: string;
//     state: string;
//     city: string;
//     street: string;
//   }[];

//   return streets.map(({ country, state, city, street }) => ({
//     country: encodeURIComponent(country),
//     state: encodeURIComponent(state),
//     city: encodeURIComponent(city),
//     street: encodeURIComponent(street),
//   }));
// }

interface StreetIndexPageProps {
  params: Promise<StreetIndexParams>;
}

interface StreetIndexParams {
  country: string;
  state: string;
  city: string;
  street: string;
}

export default async function StreetIndexPage({
  params,
}: StreetIndexPageProps) {
  const raw = await params;

  const decoded = {
    country: decodeURIComponent(raw.country),
    state: decodeURIComponent(raw.state),
    city: decodeURIComponent(raw.city),
    street: decodeURIComponent(raw.street),
  } as StreetIndexParams;

  const { country, state, city, street } = decoded;

  const stmt = db.prepare(
    "SELECT * FROM pois WHERE country = ? AND state = ? AND city = ? AND street = ? ORDER BY street"
  );
  const rawPois = stmt.all(country, state, city, street) as RawPoi[];

  const pois = rawPoisToPois(rawPois);

  if (!pois || pois.length === 0) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/poi/${country}/${state}/${city}`}>
        <ArrowLeft />
      </Link>
      <Title title={street} titlePostfix={city} size={"h1"} />
      <div className="flex flex-col gap-4">
        {pois.map((poi) => (
          <div key={`${poi.type}:${poi.id}`}>
            <PoiCard poi={poi} />
          </div>
        ))}
      </div>
    </div>
  );
}
