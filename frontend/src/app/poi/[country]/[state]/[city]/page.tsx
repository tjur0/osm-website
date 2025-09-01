import { Title } from "@/components/elements/title";
import BBox from "@/components/map/bbox";
import { pool } from "@/lib/db";
import { getBBox } from "@/lib/getBBox";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const response = await pool.query(
    "SELECT DISTINCT country, state, city FROM pois WHERE country IS NOT NULL AND state IS NOT NULL AND city IS NOT NULL AND street IS NOT NULL"
  );

  const cities = response.rows as {
    country: string;
    state: string;
    city: string;
  }[];

  return cities.map((city) => city);
}

interface CityIndexPageProps {
  params: Promise<CityIndexParams>;
}

interface CityIndexParams {
  country: string;
  state: string;
  city: string;
}

export async function generateMetadata({ params }: CityIndexPageProps) {
  const raw = await params;

  const { country, state, city } = {
    country: decodeURIComponent(raw.country),
    state: decodeURIComponent(raw.state),
    city: decodeURIComponent(raw.city),
  };

  return {
    title: `Punten van intresse in ${city}, ${state}, ${country}`,
    description: `Bekijk de punten van intresse in ${city}, ${state}, ${country}`,
  };
}

export default async function CityIndexPage({ params }: CityIndexPageProps) {
  const raw = await params;

  const { country, state, city } = {
    country: decodeURIComponent(raw.country),
    state: decodeURIComponent(raw.state),
    city: decodeURIComponent(raw.city),
  };

  const response = await pool.query(
    "SELECT DISTINCT street FROM pois WHERE country = $1 AND state = $2 AND city = $3 AND street IS NOT NULL ORDER BY street",
    [country, state, city]
  );
  const streets = response.rows as {
    street: string;
  }[];

  if (!streets || streets.length === 0) return notFound();

  const bbox = await getBBox({
    country: country,
    state: state,
    city: city,
  });

  return (
    <div className="flex flex-col gap-4">
      <BBox bbox={bbox} />
      <Link
        href={`/poi/${country}/${state}`}
        aria-label="Terug naar de plaatsen lijst"
      >
        <ArrowLeft />
      </Link>
      <Title title={city} titlePostfix={state} size="h1" />

      <ul>
        {streets.map(({ street }) => (
          <li key={street}>
            <Link href={`/poi/${country}/${state}/${city}/${street}`}>
              {street}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
