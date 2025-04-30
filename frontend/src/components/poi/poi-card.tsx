import { Poi } from "@/types/poi";
import Link from "next/link";
import Card from "../elements/card";
import { Title } from "../elements/title";
import { getName } from "@/lib/tag-parsers/name";

interface PoiCardProps {
  poi: Poi;
}

export default async function PoiCard({ poi }: PoiCardProps) {
  return (
    <Link
      href={`/poi/${poi.country}/${poi.state}/${poi.city}/${poi.street}/${poi.type}/${poi.id}`}
    >
      <Card>
        <Title title={getName(poi, false)} subTitle={poi.feature} size="h2" />
      </Card>
    </Link>
  );
}
