"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Poi {
  id: number;
  type: string;
  country: string;
  state: string;
  city: string;
  street: string;
}

interface RedirectFullPoiPageProps {
  country: string;
  state: string;
  city: string;
  street: string;
  type: string;
  poi: Poi;
}

export default function RedirectFullPoiPage({
  country,
  state,
  city,
  street,
  type,
  poi,
}: RedirectFullPoiPageProps) {
  const router = useRouter();

  useEffect(() => {
    const decoded = {
      country: decodeURIComponent(country),
      state: decodeURIComponent(state),
      city: decodeURIComponent(city),
      street: decodeURIComponent(street),
      type: decodeURIComponent(type),
    };

    if (
      decoded.country !== poi.country ||
      decoded.state !== poi.state ||
      decoded.city !== poi.city ||
      decoded.street !== poi.street ||
      decoded.type !== poi.type
    ) {
      const encoded = {
        country: encodeURIComponent(poi.country),
        state: encodeURIComponent(poi.state),
        city: encodeURIComponent(poi.city),
        street: encodeURIComponent(poi.street),
      };

      const path = `/poi/${encoded.country}/${encoded.state}/${encoded.city}/${encoded.street}/${poi.type}/${poi.id}`;
      console.log("Redirecting to:", path);
      router.replace(path);
    }
  }, [country, state, city, street, type, poi, router]);

  return null;
}
