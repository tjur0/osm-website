import MoreInfo from "@/components/cta/more-info";
import BBox from "@/components/map/bbox";
import { mdxComponents } from "@/components/mdx/mdx";
import { getBBox } from "@/lib/getBBox";
import { getMdxFile } from "@/lib/getMdxFiles";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OpenStreetMap Nederland Contact",
  description:
    "OpenStreetMap Nederland Contact, informatie over het project en de mensen erachter.",
  keywords: ["OpenStreetMap Nederland", "OSM", "Contact", "Informatie"],
};

export default async function About() {
  const bbox = await getBBox({
    country: "Nederland",
  });

  const { content } = await getMdxFile("contact");

  return (
    <div>
      <BBox bbox={bbox} />

      <div className="flex flex-col gap-4 justify-between h-full">
        <Link href={`/`} aria-label="Terug naar de homepagina">
          <ArrowLeft />
        </Link>

        <article className="prose flex flex-col gap-2">
          <MDXRemote source={content} components={mdxComponents} />
        </article>

        <MoreInfo />
      </div>
    </div>
  );
}
