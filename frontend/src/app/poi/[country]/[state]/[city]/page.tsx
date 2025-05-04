import { Title } from "@/components/elements/title";
import { nile } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const response = await nile.db.query(
    "SELECT DISTINCT country, state, city FROM pois"
  );
  const cities = response.rows as {
    country: string;
    state: string;
    city: string;
  }[];

  return cities.map(({ country, state, city }) => ({
    country: encodeURIComponent(country),
    state: encodeURIComponent(state),
    city: encodeURIComponent(city),
  }));
}

interface CityIndexPageProps {
  params: Promise<CityIndexParams>;
}

interface CityIndexParams {
  country: string;
  state: string;
  city: string;
}

export default async function CityIndexPage({ params }: CityIndexPageProps) {
  const raw = await params;

  const { country, state, city } = {
    country: decodeURIComponent(raw.country),
    state: decodeURIComponent(raw.state),
    city: decodeURIComponent(raw.city),
  };

  console.log("CityIndexPage", { country, state, city });

  const response = await nile.db.query(
    "SELECT DISTINCT street FROM pois WHERE country = $1 AND state = $2 AND city = $3 ORDER BY street",
    [country, state, city]
  );
  const streets = response.rows as {
    street: string;
  }[];

  if (!streets || streets.length === 0) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/poi/${country}/${state}`}>
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
