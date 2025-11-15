"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";

import maplibregl, { GeoJSONSource } from "maplibre-gl";
import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";

import DefaultBase from "./baseStyle/default-base";
import {
  addOverlayToMap,
  getAddedOverlays,
  getChangedOverlays,
  getRemovedOverlays,
  removeOverlayFromMap,
} from "./layer-manager";
import { enablePmTiles } from "./pmtiles";
import { OverlayStyle } from "./style-specification-types";

const LOADING_DEBOUNCE_MS = 100;

interface MapProps {
  overlays: OverlayStyle[];
  center?: [number, number];
  zoom?: number;
  map: maplibregl.Map | null;
  setMap: React.Dispatch<React.SetStateAction<maplibregl.Map | null>>;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Map({
  overlays,
  center,
  zoom,
  map,
  setMap,
  setFocused,
  setLoading,
}: MapProps) {
  const isLoaded = useRef(false);
  const mapContainer = useRef(null);
  const [activeOverlays, setActiveOverlays] = useState<OverlayStyle[]>([]);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    for (const overlay of getRemovedOverlays(activeOverlays, overlays)) {
      removeOverlay(overlay);
    }

    for (const overlay of getAddedOverlays(activeOverlays, overlays)) {
      addOverlay(overlay);
    }

    for (const overlay of getChangedOverlays(activeOverlays, overlays)) {
      updateOverlay(overlay);
    }
  }, [overlays]);

  const createMap = useCallback(() => {
    const htmlElement: HTMLElement | null = mapContainer.current;
    if (!htmlElement) return;

    const map = new maplibregl.Map({
      container: htmlElement,
      style: DefaultBase,
      hash: true,
      center: center || [0, 0],
      zoom: zoom || 2,
    });

    const maplibreglCtrlBottomRight = document.querySelector(
      ".maplibregl-ctrl-bottom-right"
    );
    if (maplibreglCtrlBottomRight) {
      maplibreglCtrlBottomRight.remove();
    }

    map.setPitch(0);
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();
    map.touchPitch.disable();

    map.on("style.load", () => {
      setIsStyleLoaded(true);
    });

    map.on("error", (e) => {
      console.error("Map error:", e);
    });

    if (setLoading) {
      const debouncedSetLoading = (isLoading: boolean) => {
        // Clear any existing timeouts
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }

        loadingTimeoutRef.current = setTimeout(() => {
          setLoading(isLoading);
        }, LOADING_DEBOUNCE_MS);
      };

      map.on("dataloading", () => debouncedSetLoading(true));
      map.on("data", () => {
        const style = map.getStyle();
        if (style && style.sources) {
          const allLoaded = Object.keys(style.sources).every((sourceId) =>
            map.isSourceLoaded(sourceId)
          );
          if (allLoaded) debouncedSetLoading(false);
        }
      });
      map.on("idle", () => debouncedSetLoading(false));
    }

    setMap(map);
  }, []);

  useEffect(() => {
    if (!map || !isStyleLoaded) return;

    activeOverlays.forEach((overlay) => {
      if (overlay.sources) {
        Object.entries(overlay.sources).forEach(([, source]) => {
          if (
            "type" in source &&
            source.type === "vector" &&
            "vector" in source &&
            source.vector === "pmtiles"
          ) {
            enablePmTiles(map, source);
          }
        });
      }
    });
  }, [map, activeOverlays, isStyleLoaded]);

  useEffect(() => {
    if (!map || !isStyleLoaded) return;

    const sortedOverlays = [...activeOverlays].sort(
      (a, b) => a.order - b.order
    );

    sortedOverlays.forEach((overlay) => {
      addOverlayToMap(map, activeOverlays, overlay);
    });
  }, [map, isStyleLoaded, activeOverlays]);

  useEffect(() => {
    if (!map) return;

    const handleStyleData = () => {
      // setIsStyleLoaded(true);
    };

    map.on("styledata", handleStyleData);

    return () => {
      map.off("styledata", handleStyleData);
    };
  }, [map]);

  useEffect(() => {
    return () => {
      if (map) map.remove();

      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [map]);

  const addOverlay = (overlay: OverlayStyle) => {
    setActiveOverlays((prev) => [...prev, overlay]);
  };

  const removeOverlay = (overlay: OverlayStyle) => {
    if (!map) return;

    setActiveOverlays((prev) => prev.filter((o) => o.id !== overlay.id));

    try {
      removeOverlayFromMap(map, activeOverlays, overlay);
    } catch (err) {
      console.error(`Error directly removing overlay ${overlay.id}:`, err);
    }
  };

  const updateOverlay = (overlay: OverlayStyle) => {
    if (!map) return;

    const existingOverlay = activeOverlays.find((o) => o.id === overlay.id);
    if (!existingOverlay) {
      console.error(`Overlay ${overlay.id} not found in active overlays`);
      return;
    }

    if (existingOverlay.sources !== overlay.sources) {
      const removedSources = Object.keys(existingOverlay.sources).filter(
        (sourceId) => !(sourceId in overlay.sources)
      );
      const addedSources = Object.keys(overlay.sources).filter(
        (sourceId) => !(sourceId in existingOverlay.sources)
      );
      const changedSources = Object.keys(overlay.sources).filter(
        (sourceId) =>
          sourceId in existingOverlay.sources &&
          sourceId in overlay.sources &&
          existingOverlay.sources[sourceId] !== overlay.sources[sourceId]
      );
      removedSources.forEach((sourceId) => {
        if (map.getSource(sourceId)) {
          map.removeSource(sourceId);
        }
      });
      addedSources.forEach((sourceId) => {
        const source = overlay.sources[sourceId];
        if (source) {
          map.addSource(sourceId, source);
        }
      });
      changedSources.forEach((sourceId) => {
        const newSource = overlay.sources[sourceId];
        const oldSource = existingOverlay.sources[sourceId];

        if (!newSource) return;

        const mapSource = map.getSource(sourceId);

        if (
          newSource.type === "geojson" &&
          oldSource?.type === "geojson" &&
          mapSource
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (mapSource as GeoJSONSource).setData((newSource as any).data);
        }
      });
    }

    try {
      overlay.layers?.forEach((layer) => {
        if (map.getLayer(layer.id)) {
          map.removeLayer(layer.id);
        }
      });
      addOverlayToMap(map, activeOverlays, overlay);
    } catch (err) {
      console.error(`Error updating overlay ${overlay.id}:`, err);
    }

    setActiveOverlays((prev) =>
      prev.map((o) => (o.id === overlay.id ? overlay : o))
    );
  };

  useEffect(() => {
    if (isLoaded.current) return;
    isLoaded.current = true;
    createMap();
  }, [createMap]);

  return (
    <div className="map-wrap h-full w-full relative">
      <div
        ref={mapContainer}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="map h-full"
      />
    </div>
  );
}
