import { Feature } from 'src/feature/entities/feature.entity';
import { Poi } from 'src/poi/entities/poi.entity';

export function getTypeName(poi: Poi, feature: Feature): string {
  if (!poi.tags) return '';
  if (!feature) return '';

  const typeName = [poi.tags['name:prefix']?.trim(), feature.name?.trim()]
    .filter(Boolean)
    .join(' ');

  return typeName;
}
