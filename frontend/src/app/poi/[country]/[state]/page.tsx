import { Title } from "@/components/elements/title";
import BBox from "@/components/map/bbox";
import { pool } from "@/lib/db";
import { getBBox } from "@/lib/getBBox";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const response = await pool.query(
    "SELECT DISTINCT country, state FROM pois WHERE country IS NOT NULL AND state IS NOT NULL AND city IS NOT NULL AND street IS NOT NULL",
  );
  const states = response.rows as { country: string; state: string }[];

  console.log(states);

  return states.map((state) => state);
}

interface StateIndexPageProps {
  params: Promise<StateIndexParams>;
}

interface StateIndexParams {
  country: string;
  state: string;
}

export async function generateMetadata({ params }: StateIndexPageProps) {
  const raw = await params;

  const { country, state } = {
    country: decodeURIComponent(raw.country),
    state: decodeURIComponent(raw.state),
  };

  return {
    title: `Punten van intresse in ${state}, ${country}`,
    description: `Bekijk de punten van intresse in ${state}, ${country}`,
  };
}

export default async function StateIndexPage({ params }: StateIndexPageProps) {
  const raw = await params;

  const { country, state } = {
    country: decodeURIComponent(raw.country),
    state: decodeURIComponent(raw.state),
  };

  const response = await pool.query(
    "SELECT DISTINCT city FROM pois WHERE country = $1 AND state = $2 AND city IS NOT NULL AND street IS NOT NULL ORDER BY city",
    [country, state],
  );
  const cities = response.rows as { city: string }[];

  if (!cities || cities.length === 0) return notFound();

  const bbox = await getBBox({
    country: country,
    state: state,
  });

  return (
    <div className="flex flex-col gap-4">
      <BBox bbox={bbox} />
      <Link href={`/poi/${country}`} aria-label="Terug naar de provincie lijst">
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
