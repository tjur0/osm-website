import { Title } from "@/components/elements/title";
import PoiCard from "@/components/poi/poi-card";
import { nile } from "@/lib/db";
import { Poi } from "@/types/poi";
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

  const { country, state, city, street } = {
    country: decodeURIComponent(raw.country),
    state: decodeURIComponent(raw.state),
    city: decodeURIComponent(raw.city),
    street: decodeURIComponent(raw.street),
  };

  console.log("StreetIndexPage", { country, state, city, street });

  const response = await nile.db.query(
    `SELECT p.*, f.name as feature FROM pois p left join feature f on f.id = p."featureId" WHERE p.country = $1 AND p.state = $2 AND p.city = $3 AND p.street = $4 ORDER BY street`,
    [country, state, city, street]
  );

  const pois = response.rows as Poi[];
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
