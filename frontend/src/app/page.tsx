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
    "OpenStreetMap Nederland is een project dat zich richt op het verzamelen, bewerken en beschikbaar stellen van vrije geografische gegevens. Zie op deze site alle punten van interesse in Nederland.",
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
          dynamicRoundingClassName="rounded-l-none"
          padding={8}
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
      <Title size="h1" title="OpenStreetMap Nederland" />
      <p>
        OpenStreetMap Nederland bestaat uit vrijwilligers die zich inzetten voor
        het verzamelen, bewerken en beschikbaar stellen van vrije geografische
        gegevens.
      </p>

      <Title size="h2" title="Wat is OpenStreetMap?" />

      <p>
        OpenStreetMap is een wereldwijde database van geografische informatie.
        Deze informatie wordt verzameld en bijgehouden door vrijwilligers.
        Iedereen kan deze informatie gebruiken, bewerken en delen.
      </p>

      <Title size="h2" title="Hoe is OpenStreetMap ontstaan?" />

      <p>
        OpenStreetMap is ontstaan in 2004 als een reactie op de beperkte
        beschikbaarheid van geografische gegevens. Het project is gestart door
        Steve Coast, die het idee had om een open-source kaart te maken die door
        iedereen kon worden bewerkt.
      </p>

      <Title size="h2" title="Kaartlagen" />

      <p>
        De kaartlagen zijn verschillende weergaven van de gegevens in
        OpenStreetMap. Verschillende kaartlagen hebben vaak andere doelen, zoals
        een focus op fietsen of om geschikt te zijn als achtergrond voor een
        app. Hoewel de OpenStreetMap data vrij toegankelijk is, zijn de
        kaartlagen dat niet altijd. Vaak hebben kaartlagen een aangegeven limit.
      </p>

      <MoreInfo />

      <div className="pb-4"></div>
    </div>
  );
}
