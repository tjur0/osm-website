"use client";
import { isUrl } from "valid-url-ts";
import Link from "next/link";
import CopyString from "./copy-string";
import { SiX } from "@icons-pack/react-simple-icons";
import { getPageFromUrl } from "@/lib/utils";

interface FormattedXProps {
  poi: {
    tags: Record<string, string>;
  };
}

export default function FormattedX({ poi }: FormattedXProps) {
  const { tags } = poi;

  if (!tags || (!tags["contact:twitter"] && !tags["twitter"])) return null;

  let xUrl = tags["contact:twitter"] || tags["twitter"];

  if (!isUrl(xUrl)) {
    xUrl = `https://x.com/${xUrl}`;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex w-full p-2 justify-between items-center gap-2">
        <div className="flex items-center gap-2 overflow-auto horizontal-scroll w-full">
          <div className="flex items-center mx-0.5">
            <SiX className="size-4 mt-1" />
          </div>
          <Link
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 whitespace-nowrap w-0"
          >
            {getPageFromUrl(xUrl)}
          </Link>
        </div>
        <CopyString string={xUrl} />
      </div>
    </div>
  );
}
