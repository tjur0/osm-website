import { Title } from "@/components/elements/title";
import db from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const stmt = db.prepare("SELECT DISTINCT country, state, city FROM pois");
  const cities = stmt.all() as {
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

  const decoded = {
    country: decodeURIComponent(raw.country),
    state: decodeURIComponent(raw.state),
    city: decodeURIComponent(raw.city),
  } as CityIndexParams;

  const { country, state, city } = decoded;

  const stmt = db.prepare(
    "SELECT DISTINCT street FROM pois WHERE country = ? AND state = ? AND city = ? ORDER BY street"
  );
  const streets = stmt.all(
    decodeURIComponent(country),
    decodeURIComponent(state),
    decodeURIComponent(city)
  ) as {
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
