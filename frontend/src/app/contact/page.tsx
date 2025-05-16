import MoreInfo from "@/components/cta/more-info";
import LayoutSettingOverride from "@/components/elements/layout-setting-override";
import WindowWithDynamicRounding from "@/components/elements/window-with-dynamic-rounding";
import BBox from "@/components/map/bbox";
import { mdxComponents } from "@/components/mdx/mdx";
import HideOnDesktop from "@/components/wrappers/hide-on-desktop";
import HideOnMobile from "@/components/wrappers/hide-on-mobile";
import { getBBox } from "@/lib/getBBox";
import { getMdxFile } from "@/lib/getMdxFiles";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";

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

  return (
    <>
      <BBox bbox={bbox} />
      <LayoutSettingOverride key="About" rounded={false} />

      <HideOnDesktop>
        <Content />
      </HideOnDesktop>

      <HideOnMobile>
        <WindowWithDynamicRounding
          className="w-96"
          dynamicRoundingClassName="rounded-l-none"
          padding={8}
        >
          <Content />
        </WindowWithDynamicRounding>
      </HideOnMobile>
    </>
  );
}

async function Content() {
  const { content } = await getMdxFile("contact");

  return (
    <div className="flex flex-col gap-4 justify-between h-full">
      <article className="prose flex flex-col gap-2">
        <MDXRemote source={content} components={mdxComponents} />
      </article>

      <MoreInfo />

      <div className="pb-4"></div>
    </div>
  );
}
