/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { OverlayStyle } from "../style-specification-types";

const TILES_URL = process.env.NEXT_PUBLIC_TILES_URL;
const SOURCE_LAYER = "pois";

if (!TILES_URL) {
  throw new Error(
    "NEXT_PUBLIC_TILES_URL is not defined in environment variables",
  );
}

export function getPoisOverylay(filter): OverlayStyle {
  return {
    id: "design",
    order: 100,
    sources: {
      "osm-tiles-source": {
        type: "vector",
        url: `${TILES_URL}`,
        baseUrl: `${TILES_URL}`,
        attribution: "OpenStreetMap",
      },
    },
    layers: [
      {
        id: "points",
        type: "circle",
        source: "osm-tiles-source",
        "source-layer": SOURCE_LAYER,
        paint: {
          "circle-radius": 10,
          "circle-opacity": 0,
        },
        minzoom: 0,
        maxzoom: 22,
      },
      {
        id: "points-outline",
        type: "circle",
        source: "osm-tiles-source",
        "source-layer": SOURCE_LAYER,
        paint: {
          "circle-radius": 6,
          "circle-color": "#404040",
        },
        minzoom: 0,
        maxzoom: 22,
      },
      {
        id: "points-color",
        type: "circle",
        source: "osm-tiles-source",
        "source-layer": SOURCE_LAYER,
        paint: {
          "circle-radius": 4,
          "circle-color": ["get", "color"],
        },
        minzoom: 0,
        maxzoom: 22,
      },
      {
        id: "points-selection-outline",
        type: "circle",
        source: "osm-tiles-source",
        "source-layer": SOURCE_LAYER,
        paint: {
          "circle-radius": 9,
          "circle-color": "#000",
        },
        filter: filter,
        minzoom: 0,
        maxzoom: 22,
      },
      {
        id: "points-selection-outline-white",
        type: "circle",
        source: "osm-tiles-source",
        "source-layer": SOURCE_LAYER,
        paint: {
          "circle-radius": 7,
          "circle-color": "#fff",
        },
        filter: filter,
        minzoom: 0,
        maxzoom: 22,
      },
      {
        id: "points-selection-color",
        type: "circle",
        source: "osm-tiles-source",
        "source-layer": SOURCE_LAYER,
        paint: {
          "circle-radius": 4,
          "circle-color": ["get", "color"],
        },
        filter: filter,
        minzoom: 0,
        maxzoom: 22,
      },
      {
        id: "points-label",
        type: "symbol",
        source: "osm-tiles-source",
        "source-layer": SOURCE_LAYER,
        layout: {
          "text-field": [
            "case",
            [">", ["length", ["to-string", ["get", "name"]]], 14],
            ["concat", ["slice", ["to-string", ["get", "name"]], 0, 14], "..."],
            ["get", "name"],
          ],
          "text-font": ["noto_sans_regular"],
          "text-size": 11,
          "text-offset": [0, 0.8],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#0a0a0a",
          "text-opacity": 0.9,
        },
        minzoom: 14,
        maxzoom: 22,
      },
    ],
  } as OverlayStyle;
}
