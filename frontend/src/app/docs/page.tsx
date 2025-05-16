import React from "react";
import { Metadata } from "next";
import { Title } from "@/components/elements/title";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAllMdxFiles } from "@/lib/getMdxFiles";
import Card from "@/components/elements/card";

export const metadata: Metadata = {
  title: "OpenStreetMap Documentatie",
  description:
    "Antwoord op veelgestelde vragen over OpenStreetMap en de OSM community.",
  keywords: ["OpenStreetMap", "Documentatie", "FAQ"],
};

export default async function EventsPage() {
  const docs = getAllMdxFiles("docs");

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/`} aria-label="Terug naar de homepage">
        <ArrowLeft />
      </Link>

      <Title size="h1" title="Documentatie" />

      {docs.map((doc) => (
        <Link href={`/docs/${doc.slug}`} key={doc.slug}>
          <Card>
            <Title
              size="h2"
              title={doc.frontmatter.title}
              subTitle={doc.frontmatter.description}
            />
          </Card>
        </Link>
      ))}
    </div>
  );
}
