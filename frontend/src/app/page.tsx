import MoreInfo from "@/components/cta/more-info";
import BBox from "@/components/map/bbox";
import { mdxComponents } from "@/components/mdx/mdx";
import { getBBox } from "@/lib/getBBox";
import { getMdxFile } from "@/lib/getMdxFiles";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";

export const metadata: Metadata = {
  title: "OpenStreetMap Nederland",
  description:
    "OpenStreetMap Nederland is een project dat zich richt op het verzamelen, bewerken en beschikbaar stellen van vrije geografische gegevens. Zie op deze site alle punten van interesse in Nederland.",
  keywords: ["OpenStreetMap Nederland", "OSM", "Kaart", "Geografie"],
};

export default async function Home() {
  const bbox = await getBBox({
    country: "Nederland",
  });

  const { content } = await getMdxFile("home");

  return (
    <div>
      <BBox bbox={bbox} />

      <div className="flex flex-col gap-4 justify-between h-full">
        <article className="prose flex flex-col gap-2">
          <MDXRemote source={content} components={mdxComponents} />
        </article>

        <MoreInfo />
      </div>
    </div>
  );
}
