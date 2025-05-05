import MoreInfo from "@/components/cta/more-info";
import LayoutSettingOverride from "@/components/elements/layout-setting-override";
import { Title } from "@/components/elements/title";
import WindowWithDynamicRounding from "@/components/elements/window-with-dynamic-rounding";
import HideOnDesktop from "@/components/wrappers/hide-on-desktop";
import HideOnMobile from "@/components/wrappers/hide-on-mobile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenStreetMap Nederland",
  description:
    "OpenStreetMap Nederland is een project dat zich richt op het verzamelen, bewerken en beschikbaar stellen van vrije geografische gegevens.",
  keywords: ["OpenStreetMap Nederland", "OSM", "Kaart", "Geografie"],
};

export default function Home() {
  return (
    <>
      <LayoutSettingOverride key="Home" rounded={false} />

      <HideOnDesktop>
        <Content />
      </HideOnDesktop>

      <HideOnMobile>
        <WindowWithDynamicRounding
          className="w-96"
          dynamicRoundingClassName="rounded-l-none xl:p-8"
        >
          <Content />
        </WindowWithDynamicRounding>
      </HideOnMobile>
    </>
  );
}

function Content() {
  return (
    <div className="flex flex-col gap-4 justify-between h-full">
      <div className="flex flex-col gap-4">
        <Title size="h1" title="OpenStreetMap Nederland" />
        <p>
          OpenStreetMap Nederland bestaat uit vrijwilligers die zich inzetten
          voor het verzamelen, bewerken en beschikbaar stellen van vrije
          geografische gegevens.
        </p>

        <Title size="h2" title="Wat is OpenStreetMap?" />

        <p>
          Iedereen kan meehelpen aan OpenStreetMap. Een goede manier om te
          beginnen is om in een gebied te bekijken waar je bekend mee bent. Klop
          er iets niet? Pas het aan! Je kan zelf iets aanpassen door op Bewerken
          te klikken.
        </p>
        <p>
          Wees niet bang om iets fout te doen. De eerste paar edits worden door
          een ervaren mapper gecontroleerd. Deze kan je dan tips geven om je
          edits te verbeteren. Mocht je er niet uitkomen, dan kan je altijd een
          vraag stellen op het forum van OpenStreetMap.
        </p>
      </div>

      <MoreInfo />
    </div>
  );
}
