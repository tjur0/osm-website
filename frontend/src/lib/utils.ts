import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const eclipse = (input: string, length = 20) => {
  if (input.length <= length) return input;

  return input.slice(0, length) + "...";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeParams<T extends Record<string, any>>(params: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") {
      result[key] = decodeURIComponentSafe(value);
    } else if (Array.isArray(value)) {
      result[key] = value.map((v) => decodeURIComponentSafe(v));
    } else {
      result[key] = value;
    }
  }

  return result as T;
}

export function decodeURIComponentSafe(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function uniqueCaseInsensitive(arr: (string | undefined)[]) {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of arr) {
    if (!item) continue;
    const lower = item.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      result.push(item);
    }
  }

  return result;
}

export const getPageFromUrl = (url: string): string => {
  const urlObj = new URL(url);
  return urlObj.pathname.replaceAll("/", "") || "(Naam niet goed geformateerd)";
};
