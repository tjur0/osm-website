"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Wikipedia from "../ui/wikipedia";

interface WikiProps {
  poi: {
    tags: Record<string, string>;
  };
}

function humanizeFileName(filename: string): string {
  const name = filename.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function Wiki({ poi }: WikiProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageAlts, setImageAlts] = useState<string[]>([]);
  const [wikiUrl, setWikiUrl] = useState<string | null>(null);
  const [wikiTitle, setWikiTitle] = useState<string | null>(null);

  useEffect(() => {
    const wikidataId = poi.tags?.["wikidata"];
    if (!wikidataId) return;

    async function fetchWikiData() {
      try {
        const res = await fetch(
          `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${wikidataId}&format=json&origin=*&props=claims|sitelinks`
        );
        const data = await res.json();
        const entity = data?.entities?.[wikidataId];

        const title = entity?.sitelinks?.nlwiki?.title;
        if (title) {
          setWikiTitle(title);
          setWikiUrl(
            `https://nl.wikipedia.org/wiki/${encodeURIComponent(title)}`
          );
        }

        const imageClaims = entity?.claims?.P18 || [];
        const fileNames: string[] = imageClaims
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((claim: any) => claim?.mainsnak?.datavalue?.value)
          .filter(Boolean);

        const urls: string[] = [];
        const alts: string[] = [];

        for (const fileName of fileNames) {
          const encodedName = encodeURIComponent(fileName);
          const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodedName}`;
          urls.push(imageUrl);
          alts.push(humanizeFileName(fileName));
        }

        setImageUrls(urls);
        setImageAlts(alts);
      } catch (error) {
        console.error("Failed to fetch Wikidata info:", error);
      }
    }

    fetchWikiData();
  }, [poi.tags]);

  if (imageUrls.length === 0 && !wikiUrl) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex gap-4 overflow-auto min-h-[260px] items-center">
        {imageUrls.map((url, index) => (
          <Image
            key={index}
            alt={imageAlts[index]}
            width={318}
            height={260}
            src={url}
            className="rounded shadow object-cover"
          />
        ))}
      </div>
      <div className="flex w-full p-2">
        {wikiUrl && (
          <Link
            href={wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Wikipedia classname="mt-1" />
            {wikiTitle}
          </Link>
        )}
      </div>
    </div>
  );
}
