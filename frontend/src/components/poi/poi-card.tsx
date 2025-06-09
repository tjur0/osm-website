import { Poi } from "@/types/poi";
import Link from "next/link";
import Card from "../elements/card";
import { Title } from "../elements/title";
import { getName } from "@/lib/tag-parsers/name";
import { PoiBadge } from "./poi-badge";

interface PoiCardProps {
  poi: Poi;
}

export default async function PoiCard({ poi }: PoiCardProps) {
  return (
    <Link
      href={`/poi/${poi.country}/${poi.state}/${poi.city}/${poi.street}/${poi.type}/${poi.id}`}
      className="relative flex transition-transform duration-100 ease-in-out hover:scale-105"
    >
      <Card className="w-full">
        <Title
          title={getName(poi, false)}
          size="h2"
          actions={<PoiBadge poi={poi} />}
        />
      </Card>
    </Link>
  );
}
