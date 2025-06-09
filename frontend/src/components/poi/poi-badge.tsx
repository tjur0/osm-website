import { Poi } from "@/types/poi";
import { Badge } from "../ui/badge";

interface PoiBadgeProps {
  poi: Poi;
}

export function PoiBadge({ poi }: PoiBadgeProps) {
  return (
    <Badge>
      {poi.tags?.["name:prefix"] ? poi.tags?.["name:prefix"] : `${poi.feature}`}
    </Badge>
  );
}
