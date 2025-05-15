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
import CartoStyle from "./map/overlayStyle/carto";
import { useBBox } from "@/providers/bbox-provider";
import { getPoisOverylay } from "./map/overlayStyle/poi";

export default function ImplemtedMap() {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });

  const [map, setMap] = useState<maplibregl.Map | null>(null);

  const [clicked, setClicked] = useState(false);

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

    if (country) {
      filter.push(["==", ["get", "country"], country]);
    }

    if (state) {
      filter.push(["==", ["get", "state"], state]);
    }

    if (city) {
      filter.push(["==", ["get", "city"], city]);
    }

    if (street) {
      filter.push(["==", ["get", "street"], street]);
    }

    if (type && id) {
      filter.push(["==", ["get", "type"], type]);
      filter.push(["==", ["get", "id"], Number(id)]);
    }

    // lets only start showing the selection after state has been selected
    return getPoisOverylay(filter.length > 2 && filter);
  }, [pathname, map]);

  const overlays = useMemo(() => {
    const overlays = [CartoStyle];

    const isPoiPath = pathname.startsWith("/poi");

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
        maxZoom: 18,
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
    zoomToSelected(true);
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
      if (!map.isStyleLoaded()) return;
      if (!map.getLayer("points")) return;
      setClicked(true);

      const features = map.queryRenderedFeatures(e.point, {
        layers: ["points"],
      });

      if (features.length > 0) {
        const { country, state, city, street, type, id } =
          features[0].properties;

        router.push(
          `/poi/${country}/${state}/${city}/${street}/${type}/${id}?skipZoom=true`
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

  return (
    <>
      <Map overlays={overlays} map={map} setMap={setMap} />

      <Link href="https://www.openstreetmap.org/copyright" target="_blank">
        <div className="right-0 bottom-0 absolute z-10 m-2 p-1 pt-0 px-3 rounded-full bg-gradient-to-r from-green-500 to-orange-500">
          <span className="text-md text-white font-bold select-none text-xs">
            Mogelijk gemaakt door OpenStreetMap data
          </span>
        </div>
      </Link>
    </>
  );
}
