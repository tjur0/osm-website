"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import maplibregl from "maplibre-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import DefaultBase from "./baseStyle/default-base";
import { OverlayStyle } from "./style-specification-types";
import {
  addOverlayToMap,
  getAddedOverlays,
  getRemovedOverlays,
  removeOverlayFromMap,
} from "./layer-manager";
import { enablePmTiles } from "./pmtiles";

interface MapProps {
  overlays: OverlayStyle[];
  map: maplibregl.Map | null;
  setMap: React.Dispatch<React.SetStateAction<maplibregl.Map | null>>;
}

export default function Map({ overlays, map, setMap }: MapProps) {
  const isLoaded = useRef(false);
  const mapContainer = useRef(null);
  const [activeOverlays, setActiveOverlays] = useState<OverlayStyle[]>([]);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);

  const addOverlay = useCallback(
    (overlay: OverlayStyle) => {
      setActiveOverlays((prev) => [...prev, overlay]);
    },
    [setActiveOverlays],
  );

  const removeOverlay = useCallback(
    (overlay: OverlayStyle) => {
      if (!map) return;

      setActiveOverlays((prev) => prev.filter((o) => o.id !== overlay.id));

      try {
        removeOverlayFromMap(map, activeOverlays, overlay);
      } catch (err) {
        console.error(`Error directly removing overlay ${overlay.id}:`, err);
      }
    },
    [map, activeOverlays],
  );

  useEffect(() => {
    for (const overlay of getRemovedOverlays(activeOverlays, overlays)) {
      removeOverlay(overlay);
    }

    for (const overlay of getAddedOverlays(activeOverlays, overlays)) {
      addOverlay(overlay);
    }
  }, [overlays, activeOverlays, addOverlay, removeOverlay]);

  const createMap = useCallback(() => {
    const htmlElement: HTMLElement | null = mapContainer.current;
    if (!htmlElement) return;

    const map = new maplibregl.Map({
      container: htmlElement,
      style: DefaultBase,
      hash: true,
      zoom: 7.03,
      center: [4.619, 52.167],
    });

    map.on("style.load", () => {
      setIsStyleLoaded(true);
    });

    map.on("error", (e) => {
      console.error("Map error:", e);
    });

    setMap(map);
  }, [setMap]);

  useEffect(() => {
    if (!map || !isStyleLoaded) return;

    activeOverlays.forEach((overlay) => {
      if (overlay.sources) {
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        Object.entries(overlay.sources).forEach(([_id, source]) => {
          if (source.vector === "pmtiles") {
            enablePmTiles(map, source);
          }
        });
      }
    });
  }, [map, activeOverlays, isStyleLoaded]);

  useEffect(() => {
    if (!map || !isStyleLoaded) return;

    const sortedOverlays = [...activeOverlays].sort(
      (a, b) => a.order - b.order,
    );

    sortedOverlays.forEach((overlay) => {
      addOverlayToMap(map, activeOverlays, overlay);
    });
  }, [map, activeOverlays, isStyleLoaded]);

  useEffect(() => {
    if (!map) return;

    const handleStyleData = () => {
      setIsStyleLoaded(true);
    };

    map.on("styledata", handleStyleData);

    return () => {
      map.off("styledata", handleStyleData);
    };
  }, [map]);

  useEffect(() => {
    return () => {
      if (map) map.remove();
    };
  }, [map]);

  useEffect(() => {
    if (isLoaded.current) return;
    isLoaded.current = true;
    createMap();
  }, [createMap]);

  return (
    <div className="map-wrap h-full w-full">
      <div ref={mapContainer} className="map h-full"></div>
    </div>
  );
}
