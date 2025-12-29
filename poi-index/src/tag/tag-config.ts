import { TagType } from "./enums/tag-type";

export const MAIN_TAG_KEYS = [
  'amenity',
  'landuse',
  'leisure',
  'shop',
  'highway',
  'tourism',
  'building',
  'natural',
  'waterway',
  'railway',
  'emergency',
  'education',
  'healthcare',
];

export const FLOATING_PREFIXES = [
  'addr:',
];

export const DEFAULT_TAG_TYPE = TagType.ATTRIBUTE;

// How long to wait before re-checking wiki links (in ms). Default: 7 days
export const WIKI_CHECK_TTL_MS = 7 * 24 * 60 * 60 * 1000;
