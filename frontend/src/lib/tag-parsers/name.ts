import { Poi } from "@/types/poi";

export function getName(poi: Poi, includePlace = true): string {
  if (!poi.tags) return "";

  const name = [
    poi.tags["name:prefix"],
    poi.tags["name"],
    poi.tags["name:suffix"],
    poi.tags["branch"],
    includePlace ? poi.city : null,
    includePlace ? poi.street : null,
  ].join(" ");

  return name;
}
