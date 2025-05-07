import LayoutSettingOverride from "@/components/elements/layout-setting-override";
import WindowWithDynamicRounding from "@/components/elements/window-with-dynamic-rounding";
import HideOnDesktop from "@/components/wrappers/hide-on-desktop";
import HideOnMobile from "@/components/wrappers/hide-on-mobile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenStreetMap Punten van Interesse",
  description:
    "Alle punten van interesse in Nederland. Dit zijn bedrijven, restaurants, musea en andere interessante locaties.",
  keywords: [
    "Punten van Interesse",
    "OpenStreetMap Nederland",
    "OSM",
    "Kaart",
    "Bedrijven",
    "Geografie",
  ],
};

export default function PoiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LayoutSettingOverride key="PoiLayout" rounded={false} />

      <HideOnDesktop>{children}</HideOnDesktop>

      <HideOnMobile>
        <WindowWithDynamicRounding
          className="w-96"
          dynamicRoundingClassName="rounded-l-none"
          padding={8}
        >
          {children}
        </WindowWithDynamicRounding>
      </HideOnMobile>
    </>
  );
}
