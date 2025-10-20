import { Poi } from "@/types/poi";
import { Badge } from "../ui/badge";

interface PoiBadgeProps {
  poi: Poi;
}

export function PoiBadge({ poi }: PoiBadgeProps) {
  return (
    <Badge className="flex items-center gap-2">
      <div
        className="size-3 rounded-full -ml-0.5"
        style={{ backgroundColor: poi.color }}
      ></div>
      {poi.tags?.["name:prefix"] ? poi.tags?.["name:prefix"] : `${poi.feature}`}
    </Badge>
  );
}
