import { isUrl } from "valid-url-ts";
import Link from "next/link";
import CopyString from "./copy-string";
import { SiFacebook } from "@icons-pack/react-simple-icons";
import { getPageFromUrl } from "@/lib/utils";

interface FormattedFacebookProps {
  poi: {
    tags: Record<string, string>;
  };
}

export default function FormattedFacebook({ poi }: FormattedFacebookProps) {
  const { tags } = poi;

  if (!tags || (!tags["contact:facebook"] && !tags["facebook"])) return null;

  let facebookUrl = tags["contact:facebook"] || tags["facebook"];

  if (!isUrl(facebookUrl)) {
    facebookUrl = `https://www.facebook.com/${facebookUrl}`;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex w-full p-2 justify-between items-center gap-2">
        <div className="flex items-center gap-2 overflow-auto horizontal-scroll w-full">
          <div className="flex items-center mx-0.5">
            <SiFacebook className="size-4 mt-1" />
          </div>
          <Link
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 whitespace-nowrap w-0"
          >
            {getPageFromUrl(facebookUrl)}
          </Link>
        </div>
        <CopyString string={facebookUrl} />
      </div>
    </div>
  );
}
