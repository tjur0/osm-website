"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import CopyString from "./copy-string";

interface FormattedRefProps {
  poi: {
    tags: Record<string, string>;
  };
}

export default function FormattedEmail({ poi }: FormattedRefProps) {
  const { tags } = poi;

  const email = tags["email"] || tags["contact:email"];

  if (!email) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex w-full p-2 justify-between items-center gap-2">
        <Link
          href={`mailto:${email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 whitespace-nowrap overflow-auto horizontal-scroll"
        >
          <div className="flex items-center mx-0.5">
            <Mail className="size-4 mt-1" />
          </div>

          {email}
        </Link>
        <CopyString string={email} />
      </div>
    </div>
  );
}
