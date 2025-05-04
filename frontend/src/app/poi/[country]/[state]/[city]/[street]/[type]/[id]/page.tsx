import RedirectFullPoiPage from "@/components/redirect-full-poi-path";
import { nile } from "@/lib/db";
import { Poi } from "@/types/poi";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   const stmt = db.prepare(
//     "SELECT DISTINCT country, state, city, street, type, osm_id FROM pois"
//   );

//   const pois = stmt.all() as {
//     country: string;
//     state: string;
//     city: string;
//     street: string;
//     type: string;
//     osm_id: number;
//   }[];

//   return pois.map(({ country, state, city, street, type, osm_id }) => ({
//     country,
//     state,
//     city,
//     street,
//     type: type,
//     id: osm_id.toString(),
//   }));
// }

interface PoiParams {
  country: string;
  state: string;
  city: string;
  street: string;
  type: string;
  id: string;
}

interface PoiPageProps {
  params: Promise<PoiParams>;
}

export async function generateMetadata({ params }: PoiPageProps) {
  const { type, id } = await params;

  const response = await nile.db.query(
    `SELECT name, "typeName", city, street FROM pois WHERE id = $1 AND type = $2`,
    [id, type]
  );
  const poi = response.rows[0] as Poi;

  if (!poi) {
    return {
      title: "POI Niet Gevonden",
    };
  }

  return {
    title: `${poi?.typeName} ${poi?.name}`,
    description: `${poi?.typeName} ${poi?.name} ${poi?.city} ${poi?.street}`,
  };
}

export default async function PoiPage({ params }: PoiPageProps) {
  const { country, state, city, street, type, id } = await params;

  const response = await nile.db.query(
    `SELECT p.*, f.name as feature FROM pois p left join feature f on f.id = p."featureId" WHERE p.id = $1 AND p.type = $2`,
    [id, type]
  );

  const poi = response.rows[0] as Poi;
  if (!poi) return notFound();

  return (
    <>
      <RedirectFullPoiPage
        country={country}
        state={state}
        city={city}
        street={street}
        type={type}
        poi={poi}
      />
      <div className="overflow-scroll flex flex-col h-full gap-6">
        <Link href={`/poi/${country}/${state}/${city}/${street}`}>
          <ArrowLeft />
        </Link>

        <div className="flex flex-col gap-4 items-center">
          {poi.tags?.name && (
            <span className="text-xl font-semibold">
              {poi.tags?.["name:prefix"]
                ? poi.tags?.["name:prefix"]
                : `${poi.feature}`}
            </span>
          )}

          <h1 className="text-5xl text-center text-ellipsis w-full overflow-hidden pb-2 line-clamp-2">
            {[
              poi.tags?.name ?? poi.tags?.name,
              poi.tags?.branch ?? poi.tags?.branch,
            ].join(" ")}

            {!poi.tags?.name && !poi.tags?.branch && poi.feature}
          </h1>

          <span className="text-md overflow-hidden">
            {poi.tags?.["name:suffix"]
              ? poi.tags?.["name:suffix"]
              : `${poi.city} ${poi.street}`}
          </span>
        </div>
      </div>
    </>
  );
}
