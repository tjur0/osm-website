import { Title } from "@/components/elements/title";
import BBox from "@/components/map/bbox";
import { pool } from "@/lib/db";
import { getBBox } from "@/lib/getBBox";
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
  const response = await pool.query(
    "SELECT DISTINCT country FROM pois WHERE country IS NOT NULL AND state IS NOT NULL AND city IS NOT NULL AND street IS NOT NULL ORDER BY country"
  );

  const countries = response.rows as { country: string }[];
  if (!countries || countries.length === 0) return notFound();

  const bbox = await getBBox({
    country: "Nederland",
  });

  return (
    <div className="flex flex-col gap-4">
      <BBox bbox={bbox} />

      <Link href={`/`} aria-label="Terug naar de homepagina">
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
