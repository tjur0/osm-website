"use client";
import Map from "@/components/map/map";
import { useCallback, useEffect, useState } from "react";
import PoiStyle from "./map/overlayStyle/poi";
import { usePathname, useRouter } from "next/navigation";
import maplibregl, {
  PointLike,
  QueryRenderedFeaturesOptions,
} from "maplibre-gl";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import CartoStyle from "./map/overlayStyle/carto";
import { useBBox } from "@/providers/bbox-provider";

export default function ImplemtedMap() {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });

  const [map, setMap] = useState<maplibregl.Map | null>(null);

  const [overlays, setOverlays] = useState([CartoStyle, PoiStyle]);

  const bbox = useBBox();

  const zoomToSelected = useCallback(
    async (animated: boolean) => {
      if (!map) return;

      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("skipZoom") === "true") {
        searchParams.delete("skipZoom");
        router.replace(`${pathname}?${searchParams.toString()}`, undefined);
        return;
      }

      if (!bbox) return;

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
    [map, pathname, bbox],
  );

  useEffect(() => {
    const isPoiPath = pathname.startsWith("/poi");

    setOverlays((prev) => {
      const hasPoi = prev.includes(PoiStyle);
      if (isPoiPath && !hasPoi) {
        return [...prev, PoiStyle];
      } else if (!isPoiPath && hasPoi) {
        return prev.filter((style) => style !== PoiStyle);
      } else {
        return prev;
      }
    });

    if (map && map.getLayer("points-outline")) {
      if (isPoiPath) {
        zoomToSelected(true);

        const segments = pathname.split("/").map(decodeURIComponent);
        const state = segments[3];
        const city = segments[4];
        const street = segments[5];
        const type = segments[6];
        const id = segments[7];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter: ["all" | "any" | "none", ...any[]] = ["all"];

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

        if (filter.length > 1) {
          map.setFilter(
            "points-outline",
            filter as maplibregl.FilterSpecification,
          );
          map.setLayoutProperty("points-outline", "visibility", "visible");
        } else {
          map.setFilter("points-outline", null);
          map.setLayoutProperty("points-outline", "visibility", "none");
        }
      } else {
        map.setFilter("points-outline", null);
        map.setLayoutProperty("points-outline", "visibility", "none");
      }
    }
  }, [pathname, map, zoomToSelected]);

  useEffect(() => {
    const segments = pathname.split("/").map(decodeURIComponent);

    const type = segments[6];
    const id = segments[7];

    if (type && id) {
      zoomToSelected(false);
    }
  }, [map, zoomToSelected]);

  const handleIdle = useCallback(() => {
    if (!map) return;

    if (map.getZoom() < 14) {
      return;
    }

    const features = map.queryRenderedFeatures({
      layers: ["points"],
    });

    if (features.length > 50) {
      features.splice(50);
    }

    // features.forEach((feature) => {
    //   const poi = feature.properties;

    //   const encoded = {
    //     country: encodeURIComponent(poi.country),
    //     state: encodeURIComponent(poi.state),
    //     city: encodeURIComponent(poi.city),
    //     street: encodeURIComponent(poi.street),
    //   };

    //   const path = `/poi/${encoded.country}/${encoded.state}/${encoded.city}/${encoded.street}/${poi.type}/${poi.id}`;

    //   router.prefetch(path);
    // });
  }, [map]);

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

      const features = map.queryRenderedFeatures(e.point, {
        layers: ["points"],
      });

      if (features.length > 0) {
        const { country, state, city, street, type, id } =
          features[0].properties;

        router.push(
          `/poi/${country}/${state}/${city}/${street}/${type}/${id}?skipZoom=true`,
        );
      } else {
        router.push("/poi/Nederland?skipZoom=true");
      }
    };

    map.on("click", handleMapClick);

    const handleMouseEnter = () => {
      map.getCanvas().style.cursor = "pointer";
    };

    const handleMouseLeave = () => {
      map.getCanvas().style.cursor = "";
    };

    map.on("mouseenter", "points", handleMouseEnter);
    map.on("mouseleave", "points", handleMouseLeave);
    map.on("idle", handleIdle);

    return () => {
      if (map) {
        map.off("click", handleMapClick);
        map.off("mouseenter", "points", handleMouseEnter);
        map.off("mouseleave", "points", handleMouseLeave);
        map.off("idle", handleIdle);
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
