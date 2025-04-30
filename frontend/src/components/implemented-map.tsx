"use client";
import Map from "@/components/map/map";
import { useCallback, useEffect, useState } from "react";
import ColorfulStyle from "./map/overlayStyle/colorful";
import PoiStyle from "./map/overlayStyle/poi";
import { usePathname, useRouter } from "next/navigation";
import maplibregl, {
  PointLike,
  QueryRenderedFeaturesOptions,
} from "maplibre-gl";

export default function ImplemtedMap() {
  const pathname = usePathname();
  const router = useRouter();

  const [map, setMap] = useState<maplibregl.Map | null>(null);

  const [overlays, setOverlays] = useState([ColorfulStyle, PoiStyle]);

  const zoomToSelected = useCallback(async () => {
    if (!map) return;

    const segments = pathname.split("/").map(decodeURIComponent);
    const [state, city, street, type, id] = segments.slice(3, 8);

    const params = new URLSearchParams();
    if (state) params.set("state", state);
    if (city) params.set("city", city);
    if (street) params.set("street", street);
    if (type) params.set("type", type);
    if (id) params.set("id", id);

    const res = await fetch(`/api/bbox?${params.toString()}`);
    if (!res.ok) return;

    const { bbox } = await res.json();
    const sidebarwidth = 500;
    const padding = 50;
    map.fitBounds(bbox, {
      padding: {
        top: padding,
        bottom: padding,
        left: sidebarwidth / 2 + padding,
        right: padding,
      },
      duration: 800,
      maxZoom: 18,
    });
  }, [map, pathname]);

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
            filter as maplibregl.FilterSpecification
          );
          map.setLayoutProperty("points-outline", "visibility", "visible");

          zoomToSelected();
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

        router.push(`/poi/${country}/${state}/${city}/${street}/${type}/${id}`);
      } else {
        router.push("/poi/Nederland");
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

    return () => {
      if (map) {
        map.off("click", handleMapClick);
        map.off("mouseenter", "points", handleMouseEnter);
        map.off("mouseleave", "points", handleMouseLeave);
      }
    };
  }, [map, router]);

  return (
    <>
      <Map overlays={overlays} map={map} setMap={setMap} />
    </>
  );
}
