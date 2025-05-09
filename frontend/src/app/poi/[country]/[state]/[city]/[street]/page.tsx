"use cache";
import { Title } from "@/components/elements/title";
import PoiCard from "@/components/poi/poi-card";
import { nile } from "@/lib/db";
import { Poi } from "@/types/poi";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   const response = await nile.db.query(
//     "SELECT DISTINCT country, state, city, street FROM pois"
//   );

//   const streets = response.rows as {
//     country: string;
//     state: string;
//     city: string;
//     street: string;
//   }[];

//   return streets.map((street) => street);
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

export async function generateMetadata({ params }: StreetIndexPageProps) {
  const raw = await params;

  const { country, state, city, street } = {
    country: decodeURIComponent(raw.country),
    state: decodeURIComponent(raw.state),
    city: decodeURIComponent(raw.city),
    street: decodeURIComponent(raw.street),
  };

  return {
    title: `Punten van intresse in ${street}, ${city}, ${state}, ${country}`,
    description: `Bekijk de punten van intresse in ${street}, ${city}, ${state}, ${country}`,
  };
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

  const response = await nile.db.query(
    `SELECT p.*, f.name as feature FROM pois p left join feature f on f.id = p."featureId" WHERE p.country = $1 AND p.state = $2 AND p.city = $3 AND p.street = $4 ORDER BY street`,
    [country, state, city, street]
  );

  const pois = response.rows as Poi[];
  if (!pois || pois.length === 0) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <Link
        href={`/poi/${country}/${state}/${city}`}
        aria-label="Terug naar de straten lijst"
      >
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
