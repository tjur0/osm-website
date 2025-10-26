import { Title } from "@/components/elements/title";
import BBox from "@/components/map/bbox";
import FormattedAdres from "@/components/poi/formatted-adres";
import FormattedEmail from "@/components/poi/formatted-email";
import FormattedPhone from "@/components/poi/formatted-phone";
import TagTable from "@/components/poi/tag-table";
import FormattedWebsite from "@/components/poi/formatted-website";
import Wiki from "@/components/poi/wiki";
import RedirectFullPoiPage from "@/components/redirect-full-poi-path";
import { pool } from "@/lib/db";
import { getBBox } from "@/lib/getBBox";
import { uniqueCaseInsensitive } from "@/lib/utils";
import { Poi } from "@/types/poi";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Opinion from "@/components/poi/opinion";
import FormattedFacebook from "@/components/poi/formatted-facebook";
import FormattedInstagram from "@/components/poi/formatted-instagram";
import FormattedX from "@/components/poi/formatted-x";
import { PoiBadge } from "@/components/poi/poi-badge";

// export async function generateStaticParams() {
//   const response = await nile.query(
//     'SELECT p.country, p.state, p.city, p.street, p.type, p.id, f.importance FROM pois p JOIN feature f ON f.id = p."featureId" where p.name is not null order by f.importance desc limit 1000'
//   );

//   const pois = response.rows as Poi[];

//   return pois.map(({ country, state, city, street, type, id }) => ({
//     country,
//     state,
//     city,
//     street,
//     type: type,
//     id: id,
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

  const response = await pool.query(
    `SELECT name, "typeName", city, street FROM pois WHERE id = $1 AND type = $2`,
    [id, type],
  );
  const poi = response.rows[0] as Poi;

  if (!poi) {
    return {
      title: "POI Niet Gevonden",
    };
  }

  let title = [];
  if (poi?.name) {
    title = [poi?.typeName, ...poi?.name.split(" "), poi?.city];
  } else {
    title = [poi?.typeName, poi?.city, poi?.street];
  }

  const description = [
    poi?.typeName,
    ...(poi?.name ? poi.name.split(" ") : []),
    poi?.city,
    poi?.street,
  ];

  return {
    title: uniqueCaseInsensitive(title).join(" "),
    description: uniqueCaseInsensitive(description).join(" "),
  };
}

export default async function PoiPage({ params }: PoiPageProps) {
  const { country, state, city, street, type, id } = await params;

  const response = await pool.query(
    `SELECT p.*, f.name as feature, f.color as color FROM pois p left join feature f on f.id = p."featureId" WHERE p.id = $1 AND p.type = $2`,
    [id, type],
  );

  const poi = response.rows[0] as Poi;
  if (!poi) return notFound();

  const bbox = await getBBox({
    type: poi.type,
    id: poi.id,
  });

  return (
    <>
      <BBox bbox={bbox} />
      <RedirectFullPoiPage
        country={country}
        state={state}
        city={city}
        street={street}
        type={type}
        poi={poi}
      />
      <div className="md:overflow-auto flex flex-col h-full gap-6 vertical-scroll">
        <div className="flex items-center justify-between w-full">
          <Link
            href={`/poi/${country}/${state}/${city}/${street}`}
            aria-label="Terug naar de poi lijst"
          >
            <ArrowLeft />
          </Link>
          <div className="flex justify-end">
            <PoiBadge poi={poi} />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Title
            size="h1"
            title={[
              poi.tags?.name ?? poi.tags?.name,
              poi.tags?.branch ?? poi.tags?.branch,
              !poi.tags?.name && !poi.tags?.branch && poi.feature,
            ]
              .filter(Boolean)
              .join(" ")}
            subTitle={
              poi.tags?.["name:suffix"]
                ? poi.tags?.["name:suffix"]
                : `${poi.city ?? ""} ${poi.street ?? ""}`
            }
          />
        </div>

        <div>
          <Wiki poi={poi} />
          <FormattedAdres poi={poi} />
          <FormattedWebsite poi={poi} />
          <FormattedEmail poi={poi} />
          <FormattedPhone poi={poi} />
          <FormattedFacebook poi={poi} />
          <FormattedInstagram poi={poi} />
          <FormattedX poi={poi} />
        </div>

        <Opinion poi={poi} />

        <div className="hidden md:block">
          <Title size="h2" title="Tags" />
          <TagTable poi={poi} />
        </div>
      </div>
    </>
  );
}
