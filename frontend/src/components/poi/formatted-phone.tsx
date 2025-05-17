"use client";

import { Phone } from "lucide-react";
import CopyString from "./copy-string";
import Link from "next/link";

interface FormattedPhoneProps {
  poi: {
    tags: Record<string, string>;
  };
}

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/[^\d+]/g, "");

  let normalized = cleaned;
  if (!normalized.startsWith("+")) {
    if (normalized.startsWith("0")) {
      normalized = "+31" + normalized.slice(1);
    } else {
      normalized = "+31" + normalized;
    }
  }

  const digitsOnly = normalized.replace("+", "");

  if (digitsOnly.startsWith("316")) {
    return normalized.replace(/(\+31)(6)(\d{4})(\d{4})/, "$1 $2 $3 $4");
  } else if (/^31[1-9]\d/.test(digitsOnly)) {
    return normalized.replace(/(\+31)(\d{2})(\d{3})(\d{4})/, "$1 $2 $3 $4");
  }

  return normalized.replace(
    /(\+?\d{2,3})(\d{3})(\d{3,4})(\d{0,4})/,
    (_match, p1, p2, p3, p4) => {
      return [p1, p2, p3, p4].filter(Boolean).join(" ");
    }
  );
};

export default function FormattedPhone({ poi }: FormattedPhoneProps) {
  const { tags } = poi;

  const phone = tags["phone"] || tags["contact:phone"];

  if (!phone) return null;

  const formattedPhoneNumber = formatPhoneNumber(phone);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex w-full p-2 justify-between items-center gap-2">
        <div className="flex items-center gap-2 overflow-auto horizontal-scroll w-full">
          <div className="flex items-center mx-0.5">
            <Phone className="size-4 mt-1" aria-label="phone" />
          </div>
          
          <Link
            href={`tel:${formattedPhoneNumber.replace(/\s+/g, "")}`}
            aria-label="Telefoonnummer"
            className="whitespace-nowrap w-0"
          >
            {formattedPhoneNumber}
          </Link>
        </div>
        <CopyString string={formattedPhoneNumber} />
      </div>
    </div>
  );
}
