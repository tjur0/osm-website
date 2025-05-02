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
    if (
      country !== poi.country ||
      state !== poi.state ||
      city !== poi.city ||
      street !== poi.street ||
      type !== poi.type
    ) {
      router.replace(
        `/poi/${poi.country}/${poi.state}/${poi.city}/${poi.street}/${poi.type}/${poi.id}`
      );
    }
  }, [country, state, city, street, type, poi, router]);

  return null;
}
