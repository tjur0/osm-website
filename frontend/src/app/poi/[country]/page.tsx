import MissingPoi from "@/components/cta/missing-poi";
import { Title } from "@/components/elements/title";
import BBox from "@/components/map/bbox";
import { pool } from "@/lib/db";
import { getBBox } from "@/lib/getBBox";
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
  const response = await pool.query(
    "SELECT DISTINCT country FROM pois WHERE country IS NOT NULL AND state IS NOT NULL AND city IS NOT NULL AND street IS NOT NULL",
  );
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

  const response = await pool.query(
    "SELECT DISTINCT state FROM pois WHERE country = $1 ORDER BY state",
    [country],
  );

  const states = response.rows as { state: string }[];

  if (!states || states.length === 0) return notFound();

  const bbox = await getBBox({
    country: country,
  });

  return (
    <div className="flex flex-col gap-4 justify-between h-full">
      <BBox bbox={bbox} />
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
