import { Title } from "@/components/elements/title";
import db from "../../../static/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PoiIndexPage() {
  const stmt = db.prepare("SELECT DISTINCT country FROM pois ORDER BY country");
  const countries = stmt.all() as { country: string }[];

  if (!countries || countries.length === 0) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/`}>
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
