import { Poi, RawPoi } from "@/types/poi";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function rawPoiToPoi(rawPoi: RawPoi): Poi {
  const poi = {
    ...rawPoi,
  };

  return poi;
}

export function rawPoisToPois(rawPois: RawPoi[]): Poi[] {
  return rawPois.map((rawPoi) => rawPoiToPoi(rawPoi));
}

export const eclipse = (input: string, length = 20) => {
  if (input.length <= length) return input;

  return input.slice(0, length) + "...";
};
