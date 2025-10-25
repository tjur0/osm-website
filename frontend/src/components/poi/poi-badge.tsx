import { Poi } from "@/types/poi";
import { ColorBadge } from "./color-badge";

interface PoiBadgeProps {
  poi: Poi;
}

export function PoiBadge({ poi }: PoiBadgeProps) {
  return (
    <ColorBadge color={poi.color}>
      {poi.tags?.["name:prefix"] ? poi.tags?.["name:prefix"] : `${poi.feature}`}
    </ColorBadge>
  );
}
