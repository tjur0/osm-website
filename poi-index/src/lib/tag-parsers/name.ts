import { Poi } from 'src/poi/entities/poi.entity';

export function getName(poi: Poi, includePlace = true): string {
  if (!poi.tags) return '';

  const name = [
    poi.tags['name:prefix']?.trim(),
    poi.tags['name']?.trim(),
    poi.tags['name:suffix']?.trim(),
    poi.tags['branch']?.trim(),
    includePlace ? poi.city?.trim() : null,
    includePlace ? poi.street?.trim() : null,
  ]
    .filter(Boolean)
    .join(' ');

  return name;
}
