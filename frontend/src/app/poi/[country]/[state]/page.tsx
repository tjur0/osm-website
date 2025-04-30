import { Title } from "@/components/elements/title";
import db from "../../../../../static/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const stmt = db.prepare("SELECT DISTINCT country, state FROM pois");
  const states = stmt.all() as { country: string; state: string }[];

  return states.map(({ country, state }) => ({
    country: encodeURIComponent(country),
    state: encodeURIComponent(state),
  }));
}

interface StateIndexPageProps {
  params: Promise<StateIndexParams>;
}

interface StateIndexParams {
  country: string;
  state: string;
}

export default async function StateIndexPage({ params }: StateIndexPageProps) {
  const raw = await params;

  const decoded = {
    country: decodeURIComponent(raw.country),
    state: decodeURIComponent(raw.state),
  } as StateIndexParams;

  const { country, state } = decoded;

  const stmt = db.prepare(
    "SELECT DISTINCT city FROM pois WHERE country = ? AND state = ? ORDER BY city"
  );
  const cities = stmt.all(
    decodeURIComponent(country),
    decodeURIComponent(state)
  ) as { city: string }[];

  if (!cities || cities.length === 0) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/poi/${country}`}>
        <ArrowLeft />
      </Link>
      <Title title={state} titlePostfix={country} size="h1" />
      <ul>
        {cities.map(({ city }) => (
          <li key={city}>
            <Link href={`/poi/${country}/${state}/${city}`}>{city}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
