import MissingPoi from "@/components/cta/missing-poi";
import { Title } from "@/components/elements/title";
import { nile } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CountryParams {
  country: string;
}

interface CountryPageProps {
  params: Promise<CountryParams>;
}

export async function generateStaticParams() {
  const response = await nile.db.query("SELECT DISTINCT country FROM pois");
  const countries = response.rows as { country: string }[];

  return countries.map(({ country }) => ({
    country: encodeURIComponent(country),
  }));
}

export async function generateMetadata({ params }: CountryPageProps) {
  const raw = await params;

  const { country } = {
    country: decodeURIComponent(raw.country),
  };

  return {
    title: `Punten van intresse in ${country}`,
    description: `Bekijk de punten van intresse in ${country}`,
  };
}

export default async function CountryIndexPage({ params }: CountryPageProps) {
  const raw = await params;

  const { country } = {
    country: decodeURIComponent(raw.country),
  };

  const response = await nile.db.query(
    "SELECT DISTINCT state FROM pois WHERE country = $1 ORDER BY state",
    [country]
  );

  const states = response.rows as { state: string }[];

  if (!states || states.length === 0) return notFound();

  return (
    <div className="flex flex-col gap-4 justify-between h-full">
      <div className="flex flex-col gap-4">
        <Link href={`/poi`} aria-label="Terug naar de landen lijst">
          <ArrowLeft />
        </Link>
        <Title title={country} size="h1" />
        <ul>
          {states.map(({ state }) => (
            <li key={state}>
              <Link href={`/poi/${country}/${state}`}>{state}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MissingPoi />
    </div>
  );
}
