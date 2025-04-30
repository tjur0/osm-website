import RedirectFullPoiPage from "@/components/redirect-full-poi-path";
import db from "../../../../../../../../../static/db";
import { getName } from "@/lib/tag-parsers/name";
import { rawPoiToPoi } from "@/lib/utils";
import { RawPoi } from "@/types/poi";
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

interface StreetIndexPageProps {
  params: Promise<{
    country: string;
    state: string;
    city: string;
    street: string;
    type: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: StreetIndexPageProps) {
  const { id, type } = await params;

  const stmt = db.prepare("SELECT * FROM pois WHERE id = ? AND type = ?");
  const rawPoi = stmt.get(
    decodeURIComponent(id),
    decodeURIComponent(type).toUpperCase()[0]
  ) as RawPoi;

  if (!rawPoi) {
    return {
      title: "POI Not Found",
    };
  }

  const poi = rawPoiToPoi(rawPoi);

  return {
    title: getName(poi),
  };
}

export default async function StreetIndexPage({
  params,
}: StreetIndexPageProps) {
  const { id, type, country, state, city, street } = await params;

  const stmt = db.prepare("SELECT * FROM pois WHERE id = ? AND type = ?");
  const rawPoi = stmt.get(
    decodeURIComponent(id),
    decodeURIComponent(type).toUpperCase()[0]
  ) as RawPoi;

  if (!rawPoi) return notFound();

  const poi = rawPoiToPoi(rawPoi);

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

        <div></div>

        <pre>{JSON.stringify(poi, null, 2)}</pre>
      </div>
    </>
  );
}
