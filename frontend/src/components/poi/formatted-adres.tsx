import { MapPinHouse } from "lucide-react";
import CopyString from "./copy-string";

interface AdresLinkProps {
  poi: {
    tags: Record<string, string>;
  };
}

export const formatPostcode = (postcode: string): string => {
  const formattedPostcode = postcode.replace(/(\d{4})(\s?)(\w{2})/, "$1 $3");
  return formattedPostcode;
};

export default function FormattedAdres({ poi }: AdresLinkProps) {
  const { tags } = poi;

  const city = tags["addr:city"];
  const street = tags["addr:street"];
  const houseNumber = tags["addr:housenumber"];
  const postcode = tags["addr:postcode"];

  if (!city || !street || !houseNumber || !postcode) return null;

  const adres = `${street} ${houseNumber}, ${formatPostcode(postcode)} ${city}`;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex w-full p-2 justify-between items-center gap-2">
        <div className="flex items-center gap-2 overflow-x-scroll w-full horizontal-scroll">
          <div className="flex items-center mx-0.5">
            <MapPinHouse className="size-4 mt-1" aria-label="Adres" />
          </div>
          <span className="whitespace-nowrap w-0">{adres}</span>
        </div>
        <CopyString string={adres} />
      </div>
    </div>
  );
}
