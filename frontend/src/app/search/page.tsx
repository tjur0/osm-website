import React from "react";
import { Metadata } from "next";
import { Title } from "@/components/elements/title";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SearchBox } from "@/components/search/search-box";

export const metadata: Metadata = {
  title: "OpenStreetMap Zoeken",
  description: "Zoeken in de OpenStreetMap database van Nederland",
  keywords: ["OpenStreetMap", "Zoeken", "OSM"],
};

export default async function SearchPage() {
  return (
    <div className="flex flex-col gap-4">
      <Link href={`/`} aria-label="Terug naar de homepagina">
        <ArrowLeft />
      </Link>

      <Title size="h1" title="Zoeken" />

      <SearchBox />
    </div>
  );
}
