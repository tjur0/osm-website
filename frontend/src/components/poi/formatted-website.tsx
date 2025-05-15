"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import CopyString from "./copy-string";

interface FormattedWebsiteProps {
  poi: {
    tags: Record<string, string>;
  };
}

export const isValidUrl = (url: string): boolean => {
  const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  return pattern.test(url);
};

export const getDomainFromUrl = (url: string): string => {
  const urlObj = new URL(url);
  return urlObj.hostname.replace("www.", "");
};

export default function FormattedWebsite({ poi }: FormattedWebsiteProps) {
  const { tags } = poi;

  if (!tags || (!tags["website"] && !tags["url"] && !tags["contact:website"]))
    return null;

  const websiteUrl = tags["website"] || tags["url"] || tags["contact:website"];

  if (!isValidUrl(websiteUrl)) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex w-full p-2 justify-between items-center gap-2">
        <Link
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 whitespace-nowrap overflow-auto horizontal-scroll"
        >
          <div className="flex items-center mx-0.5">
            <Globe className="size-4 mt-1" />
          </div>

          {getDomainFromUrl(websiteUrl)}
        </Link>
        <CopyString string={websiteUrl} />
      </div>
    </div>
  );
}
