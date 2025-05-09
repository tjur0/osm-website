import { Title } from "@/components/elements/title";
import { nile } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Landen OpenStreetMap Punten van Interesse",
  description:
    "Alle landen met OpenStreetMap Punten van Interesse. Dit zijn bedrijven, restaurants, musea en andere interessante locaties.",
  keywords: [
    "Landen",
    "OpenStreetMap Punten van Interesse",
    "OSM",
    "Kaart",
    "Geografie",
  ],
};

export default async function PoiIndexPage() {
  const response = await nile.db.query(
    "SELECT DISTINCT country FROM pois ORDER BY country"
  );

  const countries = response.rows as { country: string }[];
  if (!countries || countries.length === 0) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/`} aria-label="Terug naar de homepage">
        <ArrowLeft />
      </Link>

      <Title title="Landen" size="h1" />

      <ul>
        {countries.map(({ country }) => (
          <li key={country}>
            <Link href={`/poi/${country}`}>{country}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
