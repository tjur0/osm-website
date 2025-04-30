import { Title } from "@/components/elements/title";
import db from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const stmt = db.prepare("SELECT DISTINCT country FROM pois");
  const countries = stmt.all() as { country: string }[];

  return countries.map(({ country }) => ({
    country: encodeURIComponent(country),
  }));
}

export default async function CountryIndexPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const raw = await params;

  const country = decodeURIComponent(raw.country);

  const stmt = db.prepare(
    "SELECT DISTINCT state FROM pois WHERE country = ? ORDER BY state"
  );
  const states = stmt.all(decodeURIComponent(country)) as { state: string }[];

  if (!states || states.length === 0) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/poi`}>
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
  );
}
