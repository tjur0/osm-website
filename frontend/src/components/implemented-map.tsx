"use client";
import { Map } from "@/components/map/map";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import maplibregl, {
  PointLike,
  QueryRenderedFeaturesOptions,
} from "maplibre-gl";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { useBBox } from "@/providers/bbox-provider";
import { getPoisOverlay } from "./map/overlayStyle/poi";
import ColorfulStyle from "./map/overlayStyle/colorful";
import { Loader2 } from "lucide-react";

export default function ImplemtedMap() {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });

  const [map, setMap] = useState<maplibregl.Map | null>(null);

  const [clicked, setClicked] = useState(false);

  const [poiSource, setPoiSource] = useState<"live" | "pmtiles">("pmtiles");

  const [loading, setLoading] = useState(false);

  if (typeof window !== "undefined") {
    document.addEventListener("keydown", (event) => {
      if (event.key === "p") {
        setPoiSource("pmtiles");
      } else if (event.key === "l") {
        setPoiSource("live");
      }
    });
  }

  const PoiStyle = useMemo(() => {
    const segments = pathname.split("/").map(decodeURIComponent);

    const country = segments[2];
    const state = segments[3];
    const city = segments[4];
    const street = segments[5];
    const type = segments[6];
    const id = segments[7];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: ["all" | "any" | "none", ...any[]] = ["all"];

    if (country && country !== "-") {
      filter.push(["==", ["get", "country"], country]);
    }

    if (state && state !== "-") {
      filter.push(["==", ["get", "state"], state]);
    }

    if (city && city !== "-") {
      filter.push(["==", ["get", "city"], city]);
    }

    if (street && street !== "-") {
      filter.push(["==", ["get", "street"], street]);
    }

    if (type && id) {
      filter.push(["==", ["get", "type"], type]);
      filter.push(["==", ["get", "id"], Number(id)]);
    }

    // lets only start showing the selection after state has been selected
    return getPoisOverlay(filter.length > 2 && filter, poiSource);
  }, [pathname, map, poiSource]);

  const overlays = useMemo(() => {
    const overlays = [ColorfulStyle];

    // const isPoiPath = pathname.startsWith("/poi");
    const isPoiPath = true;

    if (PoiStyle && isPoiPath) {
      overlays.push(PoiStyle);
    }

    return overlays;
  }, [PoiStyle]);

  const bbox = useBBox();

  const zoomToSelected = useCallback(
    async (animated: boolean) => {
      if (!map || !bbox) return;

      const sidebarwidth = isMobile ? 0 : 500;
      const drawerHeight = isMobile ? 400 : 0;
      const padding = isMobile ? 10 : 50;
      map.fitBounds(bbox, {
        padding: {
          top: padding,
          bottom: drawerHeight / 2 + padding,
          left: sidebarwidth / 2 + padding,
          right: padding,
        },
        duration: animated ? 500 : 0,
        maxZoom: 17,
      });
    },
    [map, pathname, bbox]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("skipZoom") === "true") {
      searchParams.delete("skipZoom");
      router.replace(`${pathname}?${searchParams.toString()}`, undefined);
      return;
    }
  }, [pathname]);

  useEffect(() => {
    if (clicked) return;
    zoomToSelected(false);
  }, [zoomToSelected, pathname]);

  useEffect(() => {
    if (!map) return;

    const handleMapClick = (e: {
      point:
        | PointLike
        | [PointLike, PointLike]
        | QueryRenderedFeaturesOptions
        | undefined;
    }) => {
      setClicked(true);

      const features = map.queryRenderedFeatures(e.point, {
        layers: ["points"],
      });

      if (features.length > 0) {
        const { country, state, city, street, type, id } =
          features[0].properties;

        router.push(
          `/poi/${country ?? "-"}/${state ?? "-"}/${city ?? "-"}/${
            street ?? "-"
          }/${type}/${id}?skipZoom=true`
        );
      } else {
        router.push("/poi/Nederland?skipZoom=true");
      }
    };

    const handleMapLeave = () => {
      setClicked(false);
    };

    const handleMouseEnter = () => {
      map.getCanvas().style.cursor = "pointer";
    };

    const handleMouseLeave = () => {
      map.getCanvas().style.cursor = "";
    };

    map.on("click", handleMapClick);
    map.on("mouseenter", "points", handleMouseEnter);
    map.on("mouseleave", "points", handleMouseLeave);
    map.getCanvas().addEventListener("mouseleave", handleMapLeave);

    return () => {
      if (map) {
        map.off("click", handleMapClick);
        map.off("mouseenter", "points", handleMouseEnter);
        map.off("mouseleave", "points", handleMouseLeave);
        map.getCanvas().removeEventListener("mouseleave", handleMapLeave);
      }
    };
  }, [map, router]);

  const [focused, setFocused] = useState(false);

  return (
    <>
      <Map
        overlays={overlays}
        map={map}
        setMap={setMap}
        setFocused={setFocused}
        setLoading={setLoading}
      />

      <div className="right-0 bottom-0 absolute z-10 m-2 flex flex-col gap-2">
        {loading && (
          <div className="p-1 pt-0 px-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
            <span className="text-white font-bold select-none text-xs inline-flex items-center gap-1.5">
              <Loader2 className="size-3 animate-spin stroke-[3]" />
              Laden...
            </span>
          </div>
        )}

        {focused && (
          <div className="p-1 pt-0 px-3 rounded-full bg-gradient-to-r from-red-500 to-purple-500">
            <span className="text-white font-bold select-none text-xs">
              Kaart geselecteerd
            </span>
          </div>
        )}

        <Link href="https://www.openstreetmap.org/copyright" target="_blank">
          <div className="z-10 p-1 pt-0 px-3 rounded-full bg-gradient-to-r from-green-500 to-orange-500">
            <span className="text-white font-bold select-none text-xs">
              Mogelijk gemaakt door OpenStreetMap data
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}
