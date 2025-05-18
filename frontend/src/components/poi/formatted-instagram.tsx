import { isUrl } from "valid-url-ts";
import Link from "next/link";
import CopyString from "./copy-string";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { getPageFromUrl } from "@/lib/utils";

interface FormattedInstagramProps {
  poi: {
    tags: Record<string, string>;
  };
}

export default function FormattedInstagram({ poi }: FormattedInstagramProps) {
  const { tags } = poi;

  if (!tags || (!tags["contact:instagram"] && !tags["instagram"])) return null;

  let instagramUrl = tags["contact:instagram"] || tags["instagram"];

  if (!isUrl(instagramUrl)) {
    instagramUrl = `https://www.instagram.com/${instagramUrl}`;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex w-full p-2 justify-between items-center gap-2">
        <div className="flex items-center gap-2 overflow-auto horizontal-scroll w-full">
          <div className="flex items-center mx-0.5">
            <SiInstagram className="size-4 mt-1" />
          </div>
          <Link
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 whitespace-nowrap w-0"
          >
            {getPageFromUrl(instagramUrl)}
          </Link>
        </div>
        <CopyString string={instagramUrl} />
      </div>
    </div>
  );
}
